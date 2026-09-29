#!/usr/bin/env bash
set -euo pipefail

cd /workspace

npm ci

if ! command -v agent >/dev/null 2>&1; then
  curl -fsSL https://cursor.com/install | bash
fi

path_line='export PATH="$HOME/.local/bin:$PATH"'
if ! grep -qF '.local/bin' "${HOME}/.bashrc" 2>/dev/null; then
  printf '\n# Cursor Agent CLI (Prompt SDLC writer)\n%s\n' "$path_line" >>"${HOME}/.bashrc"
fi
