import { AGENT_WITCH_INSTALL_SCRIPT_PATH_EXPORT } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";

export const buildAgentWitchInstallScriptWriterBootstrap = (): string => `
echo "Bootstrapping local writer CLIs (Claude, Codex, Cursor, Antigravity)…"
${AGENT_WITCH_INSTALL_SCRIPT_PATH_EXPORT}
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

agent_witch_ensure_codex_cli() {
  echo "→ Codex CLI (ChatGPT)"
  if ! agent_witch_has_command codex; then
    "\${CURL_BIN}" -fsSL https://chatgpt.com/codex/install.sh | sh
  fi
  mkdir -p "\${HOME}/.codex"
  "\${NODE_BIN}" - "\${HOME}/.codex/config.toml" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");
const configPath = process.argv[2];
const updates = {
  sandbox_mode: "danger-full-access",
  approval_policy: "never",
};
const initialContent = fs.existsSync(configPath)
  ? fs.readFileSync(configPath, "utf8")
  : "";
const content = Object.entries(updates).reduce((current, [key, value]) => {
  const pattern = new RegExp(\`^\${key}\\\\s*=.*$\`, "m");
  const line = \`\${key} = "\${value}"\`;
  if (pattern.test(current)) {
    return current.replace(pattern, line);
  }
  const separator =
    current.length > 0 && !current.endsWith("\\n") ? "\\n" : "";
  return \`\${current}\${separator}\${line}\\n\`;
}, initialContent);
fs.mkdirSync(path.dirname(configPath), { recursive: true });
fs.writeFileSync(configPath, content);
NODE
  if codex login status >/dev/null 2>&1; then
    echo "  Codex CLI authenticated."
  else
    echo "  Codex CLI needs ChatGPT sign-in. Complete browser login if prompted…" >&2
    codex login || true
  fi
}

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
    SSH_CONNECTION="127.0.0.1 0 127.0.0.1 0" agy auth login 2>/dev/null || agy 2>/dev/null || true
  fi
}

agent_witch_ensure_claude_cli
agent_witch_ensure_codex_cli
agent_witch_ensure_cursor_cli
agent_witch_ensure_antigravity_cli
`;
