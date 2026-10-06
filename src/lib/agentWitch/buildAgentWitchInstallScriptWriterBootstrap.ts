import { AGENT_WITCH_INSTALL_ENSURE_WRITER_CODEX } from "@/lib/agentWitch/buildAgentWitchInstallScriptEnsureWriterCodex.constant";

import { AGENT_WITCH_COMMAND_DIR_NAME } from "@/lib/agentWitch/agentWitchInstallApp.constant";

export const buildAgentWitchInstallScriptWriterBootstrap = (): string => `
cat > "\${APP_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/ensure-writer.sh" <<'ENSURE_WRITER_EOF'
#!/usr/bin/env bash
set -euo pipefail
NODE_BIN="$(command -v node)"
CURL_BIN="$(command -v curl)"

if [[ -z "\${NODE_BIN}" ]]; then
  echo "Node.js is required." >&2
  exit 1
fi

if [[ -z "\${CURL_BIN}" ]]; then
  echo "curl is required." >&2
  exit 1
fi

agent_witch_has_command() {
  command -v "$1" >/dev/null 2>&1
}

agent_witch_ensure_claude_cli() {
  echo "→ Claude CLI"
  if ! agent_witch_has_command claude; then
    "\${CURL_BIN}" -fsSL https://claude.ai/install.sh | bash
  fi
  if claude auth status 2>/dev/null | "\${NODE_BIN}" -e "const input=require('fs').readFileSync(0,'utf8'); const parsed=JSON.parse(input); process.exit(parsed.loggedIn===true?0:1);"; then
    echo "  Claude CLI authenticated."
  else
    echo "  Claude CLI needs sign-in. Complete browser login if prompted…" >&2
    claude auth login || true
  fi
}

${AGENT_WITCH_INSTALL_ENSURE_WRITER_CODEX}

agent_witch_ensure_cursor_cli() {
  echo "→ Cursor CLI"
  if ! agent_witch_has_command cursor; then
    "\${CURL_BIN}" -fsSL https://cursor.com/install -fsS | bash
  fi
  cursor agent sandbox disable >/dev/null 2>&1 || true
  if cursor agent status --format json 2>/dev/null | "\${NODE_BIN}" -e "const input=require('fs').readFileSync(0,'utf8'); const parsed=JSON.parse(input); process.exit(parsed.isAuthenticated===true?0:1);"; then
    echo "  Cursor CLI authenticated."
  else
    echo "  Cursor CLI needs sign-in. Complete browser login if prompted…" >&2
    cursor agent login || true
  fi
}

agent_witch_ensure_antigravity_cli() {
  echo "→ Antigravity CLI"
  if ! agent_witch_has_command agy; then
    "\${CURL_BIN}" -fsSL https://antigravity.google/cli/install.sh | bash
  fi
  if [[ -f "\${HOME}/.config/agy/credentials.json" ]]; then
    echo "  Antigravity CLI authenticated."
  else
    echo "  Antigravity CLI needs Google sign-in. Complete browser login if prompted…" >&2
    SSH_CONNECTION="127.0.0.1 0 127.0.0.1 0" agy auth login 2>/dev/null || true
  fi
}

case "\${1:-}" in
  claude-cli)
    agent_witch_ensure_claude_cli
    ;;
  codex)
    agent_witch_ensure_codex_cli
    ;;
  cursor)
    agent_witch_ensure_cursor_cli
    ;;
  antigravity)
    agent_witch_ensure_antigravity_cli
    ;;
  *)
    echo "Unknown writer agent: \${1:-}" >&2
    exit 1
    ;;
esac
ENSURE_WRITER_EOF
chmod +x "\${APP_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/ensure-writer.sh"
`;
