/**
 * Last installer lines: honest running state (Linux without a systemd user
 * session is installed but not started) plus the computer name and device id
 * the web app shows, so duplicate names can be told apart.
 */
export const buildAgentWitchInstallScriptFinishSummary = (): string => `
if [[ "\$(uname -s)" == "Linux" && "\${AGENT_WITCH_LINUX_START_NEEDED:-}" == "1" ]]; then
  echo "AgentWitch is installed but not running yet. This computer has no systemd user session, so it can't start AgentWitch on its own."
  echo "Start it now, and again after each restart, with:"
  echo "  nohup \\"\${RUN_PATH}\\" >/dev/null 2>&1 &"
else
  echo "AgentWitch is ready."
fi
if [[ -n "\${REGISTERED_DEVICE_ID:-}" ]]; then
  AGENT_WITCH_FINISH_NAME="\${DEVICE_HOSTNAME:-this computer}"
  if [[ "\$(uname -s)" == "Linux" ]]; then
    AGENT_WITCH_FINISH_NAME="Linux device"
  fi
  AGENT_WITCH_FINISH_SUFFIX="\$(printf '%s' "\${REGISTERED_DEVICE_ID}" | tail -c 4 | tr '[:lower:]' '[:upper:]')"
  echo "In AgentWitch this computer is \\"\${AGENT_WITCH_FINISH_NAME}\\" (shown as \\"\${AGENT_WITCH_FINISH_NAME} · \${AGENT_WITCH_FINISH_SUFFIX}\\" when another computer has the same name)."
  echo "Device id: \${REGISTERED_DEVICE_ID}"
fi
`;
