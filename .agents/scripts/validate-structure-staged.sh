#!/bin/sh
set -e

FILES=$(
  git diff --cached --name-only --diff-filter=ACM |
    grep -E '^src/|^db/' || true
)

if [ -z "$FILES" ]; then
  echo "validate:staged — no staged src/ or db/ files."
  exit 0
fi

echo "$FILES" | xargs npx structure-validation --files --verify-root --skip-error
