/** Yes/no prompt that never blocks when no terminal is attached (Mac app, CI, cron). */
export const buildAgentWitchInstallScriptNodeRuntimePrompt = (): string => `
agent_witch_install_is_noninteractive() {
  if [[ -n "\${CI:-}" || -n "\${AGENT_WITCH_INSTALL_NONINTERACTIVE:-}" ]]; then
    return 0
  fi
  # No TTY on stdin and no controlling terminal (e.g. launched by the Mac app): never block on a prompt.
  if [[ ! -t 0 ]] && ! { : </dev/tty; } 2>/dev/null; then
    return 0
  fi
  return 1
}

agent_witch_read_yes_no() {
  local prompt="\$1"
  local answer=""
  if agent_witch_install_is_noninteractive; then
    echo "\${prompt} — skipped: no interactive terminal to answer." >&2
    return 1
  fi
  if [[ -t 0 ]]; then
    read -r -p "\${prompt} [y/N] " answer || true
  else
    read -r -p "\${prompt} [y/N] " answer </dev/tty || true
  fi
  case "\${answer}" in
    y|Y|yes|YES) return 0 ;;
    *) return 1 ;;
  esac
}
`;
