export const AGENT_WITCH_INSTALL_ENSURE_WRITER_CODEX = `
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
`;
