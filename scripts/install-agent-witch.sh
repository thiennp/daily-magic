#!/usr/bin/env bash
set -euo pipefail

if [[ -f ".env.local" ]]; then
  # shellcheck disable=SC1091
  source ".env.local" 2>/dev/null || true
fi

DAILY_MAGIC_URL="${DAILY_MAGIC_URL:-http://localhost:3000}"
INSTALL_URL="${DAILY_MAGIC_URL%/}/install/agent-witch.sh"

echo "Fetching install script from ${INSTALL_URL}…"
exec bash <(curl -fsSL "${INSTALL_URL}")
