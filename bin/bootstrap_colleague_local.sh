#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
CONFIG_FILE=${LOCAL_SERVICE_CONFIG:-$REPO_ROOT/.local-service.env}
DEFAULT_CONFIG_FILE=$REPO_ROOT/.local-service.env.example

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

SECRETS_REPO_NAME=${SECRETS_REPO_NAME:-hof-services-secrets}
SECRETS_REPO_URL=${SECRETS_REPO_URL:-keybase://team/hoforms/hof-services-secrets}
SECRETS_SYNC_TIMEOUT_SECONDS=${SECRETS_SYNC_TIMEOUT_SECONDS:-20}
INSTALL_COMMAND=${INSTALL_COMMAND:-yarn install}
KEYBASE_BIN=${KEYBASE_BIN:-/Applications/Keybase.app/Contents/SharedSupport/bin}
DEFAULT_SECRETS_DIR=$REPO_ROOT/../$SECRETS_REPO_NAME
SECRETS_DIR=${HOF_SERVICES_SECRETS_DIR:-$DEFAULT_SECRETS_DIR}

usage() {
  cat <<'EOF'
Usage:
  sh bin/bootstrap_colleague_local.sh
  sh bin/bootstrap_colleague_local.sh --check

Optional overrides:
  HOF_SERVICES_SECRETS_DIR=/path/to/hof-services-secrets
  LOCAL_SERVICE_CONFIG=/path/to/.local-service.env

The script clones or updates the secrets repository next to this service, installs
dependencies when node_modules is missing, then runs yarn local:up.
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
}

ensure_keybase_path() {
  if [ -d "$KEYBASE_BIN" ]; then
    PATH="$KEYBASE_BIN:$PATH"
    export PATH
  fi
}

check_tools() {
  missing=""

  for tool in git yarn docker; do
    if ! command -v "$tool" >/dev/null 2>&1; then
      missing="$missing $tool"
    fi
  done

  ensure_keybase_path

  if ! command -v git-remote-keybase >/dev/null 2>&1; then
    missing="$missing git-remote-keybase"
  fi

  if [ -n "$missing" ]; then
    printf 'Missing required tools:%s\n' "$missing" >&2
    printf 'Install the missing tools and try again. On macOS, Keybase usually provides git-remote-keybase from %s.\n' "$KEYBASE_BIN" >&2
    exit 1
  fi
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

sync_secrets_repo() {
  if [ -d "$SECRETS_DIR/.git" ]; then
    if ! run_with_timeout "$SECRETS_SYNC_TIMEOUT_SECONDS" git -C "$SECRETS_DIR" pull --ff-only; then
      printf 'Warning: could not update secrets repo within %s seconds; using existing local copy at %s.\n' "$SECRETS_SYNC_TIMEOUT_SECONDS" "$SECRETS_DIR" >&2
    fi
    return
  fi

  if [ -e "$SECRETS_DIR" ]; then
    printf 'Secrets path exists but is not a git repository: %s\n' "$SECRETS_DIR" >&2
    exit 1
  fi

  mkdir -p "$(dirname "$SECRETS_DIR")"
  run_with_timeout "$SECRETS_SYNC_TIMEOUT_SECONDS" git clone "$SECRETS_REPO_URL" "$SECRETS_DIR"
}

if [ "${1:-}" = "--help" ]; then
  usage
  exit 0
fi

if [ "${1:-}" != "" ] && [ "${1:-}" != "--check" ]; then
  usage >&2
  exit 1
fi

cd "$REPO_ROOT"

ensure_gitignore
ensure_secret_paths_outside_repo
check_tools
sync_secrets_repo

if [ ! -d node_modules ]; then
  sh -c "$INSTALL_COMMAND"
fi

if [ "${1:-}" = "--check" ]; then
  yarn local:check-env
  printf 'Local bootstrap checks passed. Run sh bin/bootstrap_colleague_local.sh to start the app.\n'
  exit 0
fi

yarn local:up