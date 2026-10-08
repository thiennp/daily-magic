/** User-facing install progress (no technical paths or URLs). */
export const AGENT_WITCH_INSTALL_PROGRESS_TOTAL = 9;

export const buildAgentWitchInstallScriptProgress = (input?: {
  readonly updateExistingInstall?: boolean;
}): string => {
  const progressLabel =
    input?.updateExistingInstall === true ? "Updating" : "Installing";

  return `
AGENT_WITCH_INSTALL_STEP=0
AGENT_WITCH_INSTALL_TOTAL=${AGENT_WITCH_INSTALL_PROGRESS_TOTAL}

agent_witch_install_begin() {
  echo "${progressLabel} AgentWitch…"
}

agent_witch_install_step() {
  AGENT_WITCH_INSTALL_STEP=$((AGENT_WITCH_INSTALL_STEP + 1))
  local percent=$((AGENT_WITCH_INSTALL_STEP * 100 / AGENT_WITCH_INSTALL_TOTAL))
  if (( percent > 99 )); then
    percent=99
  fi
  printf '\\r${progressLabel}… %d%%' "\${percent}"
}

agent_witch_install_finish_progress() {
  printf '\\r${progressLabel}… 100%%\\n'
}
`;
};
