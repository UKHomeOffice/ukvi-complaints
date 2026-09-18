#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
CONFIG_FILE=${LOCAL_SERVICE_CONFIG:-$REPO_ROOT/.local-service.env}
DEFAULT_CONFIG_FILE=$REPO_ROOT/.local-service.env.example

cd "$REPO_ROOT"

if [ ! -f "$CONFIG_FILE" ]; then
  if [ -z "${LOCAL_SERVICE_CONFIG:-}" ] && [ -f "$DEFAULT_CONFIG_FILE" ]; then
    CONFIG_FILE=$DEFAULT_CONFIG_FILE
  else
    printf 'Local service config not found: %s\n' "$CONFIG_FILE" >&2
    exit 1
  fi
fi

# shellcheck disable=SC1090
. "$CONFIG_FILE"

ROOT_ENV=${ROOT_ENV:-.env}
COMPOSE_ENV=${COMPOSE_ENV:-.devcontainer/devcontainer.env}
COMPOSE_FILE=${COMPOSE_FILE:-.devcontainer/docker-compose.dev.yml}
DEPENDENCY_SERVICES=${DEPENDENCY_SERVICES:-}
SECRETS_REPO_NAME=${SECRETS_REPO_NAME:-hof-services-secrets}
SECRETS_REPO_URL=${SECRETS_REPO_URL:-keybase://team/hoforms/hof-services-secrets}
SECRETS_SYNC_TIMEOUT_SECONDS=${SECRETS_SYNC_TIMEOUT_SECONDS:-20}
APP_SECRETS_FILE_NAME=${APP_SECRETS_FILE_NAME:-}
SIDECAR_SECRETS_FILE_NAME=${SIDECAR_SECRETS_FILE_NAME:-}
START_COMMAND=${START_COMMAND:-yarn start:dev}
REQUIRED_ENV_KEYS=${REQUIRED_ENV_KEYS:-}
LOCAL_ENV_OVERRIDES=${LOCAL_ENV_OVERRIDES:-}
GENERATE_SESSION_SECRET=${GENERATE_SESSION_SECRET:-true}
APP_PORT_ENV_KEY=${APP_PORT_ENV_KEY:-PORT}
DEFAULT_APP_PORT=${DEFAULT_APP_PORT:-8080}
STOP_STALE_NODE_APP=${STOP_STALE_NODE_APP:-true}
RECREATE_DEPENDENCIES=${RECREATE_DEPENDENCIES:-true}
KEYBASE_BIN=${KEYBASE_BIN:-/Applications/Keybase.app/Contents/SharedSupport/bin}
DEFAULT_SECRETS_DIR=$REPO_ROOT/../$SECRETS_REPO_NAME
SECRETS_DIR=${HOF_SERVICES_SECRETS_DIR:-$DEFAULT_SECRETS_DIR}
APP_SECRETS_FILE=${KEYBASE_ENV_SOURCE:-$SECRETS_DIR/$APP_SECRETS_FILE_NAME}
SIDECAR_SECRETS_FILE=$SECRETS_DIR/$SIDECAR_SECRETS_FILE_NAME

usage() {
  cat <<'EOF'
Usage:
  yarn local:up
  HOF_SERVICES_SECRETS_DIR=/path/to/secrets-repo yarn local:up
  KEYBASE_ENV_SOURCE=/path/to/env-file yarn local:up
  yarn local:check-env

By default, secrets are loaded from:
  ../<SECRETS_REPO_NAME>/<APP_SECRETS_FILE_NAME>

KEYBASE_ENV_SOURCE can point at a specific env file to copy into .env.
Service-specific defaults live in .local-service.env.example.
Use .local-service.env only for local overrides.
Secret values are never printed by this script.
EOF
}

ensure_gitignore() {
  gitignore_file=$REPO_ROOT/.gitignore
  touch "$gitignore_file"

  for pattern in .env '.env.*' '!.env.sample' .local-service.env .npmrc '*.pem' '*.key' 'id_rsa*' hof-services-secrets/ '.devcontainer/*.env' instructions.md; do
    if ! grep -Fxq "$pattern" "$gitignore_file"; then
      printf '%s\n' "$pattern" >> "$gitignore_file"
    fi
  done
}

canonical_path() {
  target="$1"

  case "$target" in
    /*) absolute_target=$target ;;
    *) absolute_target=$REPO_ROOT/$target ;;
  esac

  if [ -d "$absolute_target" ]; then
    CDPATH= cd -- "$absolute_target" && pwd -P
    return
  fi

  parent_dir=$(dirname "$absolute_target")
  base_name=$(basename "$absolute_target")

  if [ -d "$parent_dir" ]; then
    parent_real=$(CDPATH= cd -- "$parent_dir" && pwd -P)
    printf '%s/%s\n' "$parent_real" "$base_name"
    return
  fi

  printf '%s\n' "$absolute_target"
}

ensure_secret_paths_outside_repo() {
  repo_root_real=$(CDPATH= cd -- "$REPO_ROOT" && pwd -P)
  secrets_dir_real=$(canonical_path "$SECRETS_DIR")

  case "$secrets_dir_real/" in
    "$repo_root_real"/*)
      printf 'Refusing to use secrets repository inside this application repository: %s\n' "$SECRETS_DIR" >&2
      printf 'Place hof-services-secrets next to this repository or set HOF_SERVICES_SECRETS_DIR to an external path.\n' >&2
      exit 1
      ;;
  esac

  if [ -n "${KEYBASE_ENV_SOURCE:-}" ]; then
    keybase_env_source_real=$(canonical_path "$KEYBASE_ENV_SOURCE")

    case "$keybase_env_source_real/" in
      "$repo_root_real"/*)
        printf 'Refusing to copy a Keybase env source from inside this application repository: %s\n' "$KEYBASE_ENV_SOURCE" >&2
        printf 'Keep secret env files outside the repository and try again.\n' >&2
        exit 1
        ;;
    esac
  fi
}

has_env_key() {
  key="$1"
  file="$2"

  grep -Eq "^[[:space:]]*${key}[[:space:]]*=" "$file"
}

get_env_value() {
  key="$1"
  file="$2"

  awk -F= -v key="$key" '
    $1 ~ "^[[:space:]]*" key "[[:space:]]*$" {
      value = $0
      sub(/^[^=]*=/, "", value)
      gsub(/^[[:space:]"'\'' ]+|[[:space:]"'\'' ]+$/, "", value)
      print value
      exit
    }
  ' "$file"
}

set_local() {
  key="$1"
  value="$2"
  tmp_file=$(mktemp "${ROOT_ENV}.XXXXXX")

  awk -v key="$key" -v value="$value" '
    $0 ~ "^[[:space:]]*" key "[[:space:]]*=" { print key "=" value; found = 1; next }
    { print }
    END { if (!found) print key "=" value }
  ' "$ROOT_ENV" > "$tmp_file"
  chmod 600 "$tmp_file"
  mv "$tmp_file" "$ROOT_ENV"
}

run_with_timeout() {
  timeout_seconds="$1"
  shift

  if command -v perl >/dev/null 2>&1; then
    perl -e 'alarm shift; exec @ARGV or die $!' "$timeout_seconds" "$@"
  else
    "$@"
  fi
}

refresh_secrets_repo() {
  if [ -d "$SECRETS_DIR/.git" ]; then
    if [ -d "$KEYBASE_BIN" ]; then
      PATH="$KEYBASE_BIN:$PATH"
      export PATH
    fi

    if ! run_with_timeout "$SECRETS_SYNC_TIMEOUT_SECONDS" git -C "$SECRETS_DIR" pull --ff-only; then
      printf 'Warning: could not update secrets repo within %s seconds; using existing local copy at %s.\n' "$SECRETS_SYNC_TIMEOUT_SECONDS" "$SECRETS_DIR" >&2
    fi
    return
  fi

  if [ -e "$SECRETS_DIR" ]; then
    printf 'Secrets path exists but is not a git repository: %s\n' "$SECRETS_DIR" >&2
    exit 1
  fi

  if [ -z "$SECRETS_REPO_URL" ]; then
    printf 'Secrets repository is missing and SECRETS_REPO_URL is not configured.\n' >&2
    exit 1
  fi

  if [ -d "$KEYBASE_BIN" ]; then
    PATH="$KEYBASE_BIN:$PATH"
    export PATH
  fi

  mkdir -p "$(dirname "$SECRETS_DIR")"
  run_with_timeout "$SECRETS_SYNC_TIMEOUT_SECONDS" git clone "$SECRETS_REPO_URL" "$SECRETS_DIR"
}

copy_secrets() {
  if [ -z "$APP_SECRETS_FILE_NAME" ] && [ -z "${KEYBASE_ENV_SOURCE:-}" ]; then
    printf 'APP_SECRETS_FILE_NAME is not configured. Set it in .local-service.env.\n' >&2
    exit 1
  fi

  if [ ! -f "$APP_SECRETS_FILE" ]; then
    printf 'Cannot find app secrets file: %s\n' "$APP_SECRETS_FILE" >&2
    printf 'Set HOF_SERVICES_SECRETS_DIR or KEYBASE_ENV_SOURCE and try again.\n' >&2
    exit 1
  fi

  install -m 600 "$APP_SECRETS_FILE" "$ROOT_ENV"
  printf 'Copied app secrets from %s into %s\n' "$APP_SECRETS_FILE" "$ROOT_ENV"
}

copy_sidecar_secrets() {
  if [ -n "$SIDECAR_SECRETS_FILE_NAME" ] && [ -f "$SIDECAR_SECRETS_FILE" ]; then
    install -m 600 "$SIDECAR_SECRETS_FILE" "$COMPOSE_ENV"
    printf 'Copied sidecar secrets from %s into %s\n' "$SIDECAR_SECRETS_FILE" "$COMPOSE_ENV"
  else
    cp "$ROOT_ENV" "$COMPOSE_ENV"
    chmod 600 "$COMPOSE_ENV"
    printf 'Copied %s into %s for sidecar env configuration\n' "$ROOT_ENV" "$COMPOSE_ENV"
  fi
}

stop_existing_app() {
  if [ "$STOP_STALE_NODE_APP" != "true" ]; then
    return
  fi

  app_port=$(get_env_value "$APP_PORT_ENV_KEY" "$ROOT_ENV")
  app_port=${app_port:-8080}
  pids=$(lsof -tiTCP:"$app_port" -sTCP:LISTEN 2>/dev/null || true)

  if [ -z "$pids" ]; then
    return
  fi

  for pid in $pids; do
    command=$(ps -p "$pid" -o comm= 2>/dev/null || true)

    case "$command" in
      *node*)
        printf 'Stopping existing Node process on port %s: %s\n' "$app_port" "$pid"
        kill "$pid" 2>/dev/null || true
        ;;
      *)
        printf 'Port %s is already in use by process %s (%s). Stop it before running yarn local:up.\n' "$app_port" "$pid" "$command" >&2
        exit 1
        ;;
    esac
  done
}

check_env() {
  missing=""

  for key in $REQUIRED_ENV_KEYS; do
    if ! has_env_key "$key" "$ROOT_ENV"; then
      missing="${missing} ${key}"
    fi
  done

  if [ -n "$missing" ]; then
    printf 'Missing required .env keys:%s\n' "$missing" >&2
    printf 'Set KEYBASE_ENV_SOURCE to the Keybase env file, or update .env manually.\n' >&2
    return 1
  fi
}

if [ "${1:-}" = "--help" ]; then
  usage
  exit 0
fi

ensure_gitignore
ensure_secret_paths_outside_repo
refresh_secrets_repo
copy_secrets

for override in $LOCAL_ENV_OVERRIDES; do
  key=${override%%=*}
  value=${override#*=}
  set_local "$key" "$value"
done

if [ "$GENERATE_SESSION_SECRET" = "true" ] && ! has_env_key SESSION_SECRET "$ROOT_ENV"; then
  session_secret=$(node -e "process.stdout.write(require('crypto').randomBytes(32).toString('hex'))")
  printf '\nSESSION_SECRET=%s\n' "$session_secret" >> "$ROOT_ENV"
fi

check_env
copy_sidecar_secrets

if [ "${1:-}" = "--check-env" ]; then
  printf '.env contains the required local keys.\n'
  exit 0
fi

if ! command -v docker >/dev/null 2>&1; then
  printf 'Docker is required to start local sidecar services. Install Docker and try again.\n' >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  printf 'Docker is installed, but the Docker daemon is not running. Start Docker Desktop and try again.\n' >&2
  exit 1
fi

stop_existing_app

compose_args=""
if [ "$RECREATE_DEPENDENCIES" = "true" ]; then
  compose_args="--force-recreate"
fi

docker compose -f "$COMPOSE_FILE" up -d $compose_args $DEPENDENCY_SERVICES

sh -c "$START_COMMAND"