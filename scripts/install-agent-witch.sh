#!/usr/bin/env bash
set -euo pipefail

DAILY_MAGIC_URL="${DAILY_MAGIC_URL:-http://localhost:3000}"
INSTALL_URL="${DAILY_MAGIC_URL%/}/install/agent-witch.sh"

echo "Fetching install script from ${INSTALL_URL}…"
exec bash <(curl -fsSL "${INSTALL_URL}")
