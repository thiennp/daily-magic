export const AGENT_WITCH_INSTALL_ENSURE_WRITER_CODEX = `
agent_witch_ensure_codex_cli() {
  echo "→ Codex CLI (ChatGPT)"
  if ! agent_witch_has_command codex; then
    # 77e29f7a: this put ~/.local/bin/codex on the box with no trace; say so.
    echo "  Installing Codex CLI on this computer (not found on PATH)." >&2
    "\${CURL_BIN}" -fsSL https://chatgpt.com/codex/install.sh | sh
  fi
  # S0-4: never write sandbox_mode / approval_policy into ~/.codex/config.toml.
  # AgentWitch Local passes "exec -s workspace-write" per run instead.
  if codex login status >/dev/null 2>&1; then
    echo "  Codex CLI authenticated."
  else
    # 5ca01f06: never run an interactive login here; the host has no terminal.
    echo "  Codex CLI needs ChatGPT sign-in. Run codex login in a terminal (ensure-writer does not open interactive login)." >&2
    exit 3
  fi
}
`;
