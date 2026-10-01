#!/bin/sh

set -eu

blocked_files=$(git ls-files | grep -E '(^|/)(\.env($|\.)|\.local-service\.env$|devcontainer\.env$|instructions\.md$|hof-services-secrets/|\.npmrc$|id_rsa[^/]*$|[^/]+\.(pem|key)$)' || true)

if [ -n "$blocked_files" ]; then
  printf 'Security check failed. These local secret or instruction files are tracked by git:\n' >&2
  printf '%s\n' "$blocked_files" >&2
  printf 'Remove them from git tracking before opening a PR. Do not print or paste secret values.\n' >&2
  exit 1
fi

printf 'Security check passed. No blocked local secret or instruction files are tracked by git.\n'