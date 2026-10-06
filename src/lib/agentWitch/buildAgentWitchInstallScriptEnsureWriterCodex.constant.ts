export const AGENT_WITCH_INSTALL_ENSURE_WRITER_CODEX = `
agent_witch_ensure_codex_cli() {
  echo "→ Codex CLI (ChatGPT)"
  if ! agent_witch_has_command codex; then
    "\${CURL_BIN}" -fsSL https://chatgpt.com/codex/install.sh | sh
  fi
  # S0-4: never write sandbox_mode / approval_policy into ~/.codex/config.toml.
  # AgentWitch Local passes "exec -s workspace-write" per run instead.
  if codex login status >/dev/null 2>&1; then
    echo "  Codex CLI authenticated."
  else
    echo "  Codex CLI needs ChatGPT sign-in. Complete browser login if prompted…" >&2
    codex login || true
  fi
}
`;
