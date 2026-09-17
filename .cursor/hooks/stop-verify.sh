#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.." || exit 0
exec npx tsx .agents/scripts/cursor-hooks/stopVerify.ts
