/** User-facing install progress (no technical paths or URLs). */
export const AGENT_WITCH_INSTALL_PROGRESS_TOTAL = 9;

const INSTALL_FAILED_HINT =
  "AgentWitch setup stopped before it finished, so this computer may be left half set up. Run the same connect command again; it is safe to re-run and finishes the setup.";

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
  # 2331ef53: more steps than the total printed "99%" twice.
  if [[ "\${percent}" == "\${AGENT_WITCH_INSTALL_LAST_PERCENT:-}" ]]; then
    return 0
  fi
  AGENT_WITCH_INSTALL_LAST_PERCENT="\${percent}"
  printf '\\r${progressLabel}… %d%%' "\${percent}"
}

agent_witch_install_finish_progress() {
  printf '\\r${progressLabel}… 100%%\\n'
}

# 2331ef53: a failed connect stopped mid-way with no hint.
agent_witch_install_on_exit() {
  local code=$?
  if (( code != 0 && AGENT_WITCH_INSTALL_STEP > 0 )); then
    printf '\\n%s\\n' "${INSTALL_FAILED_HINT}" >&2
  fi
}
trap agent_witch_install_on_exit EXIT
`;
};
