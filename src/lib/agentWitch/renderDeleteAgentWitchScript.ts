import {
  AGENT_WITCH_APP_DIR_NAME,
  AGENT_WITCH_COMMAND_DIR_NAME,
} from "@/lib/agentWitch/agentWitchInstallApp.constant";
import { resolveAgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";

export const renderDeleteAgentWitchScript = (origin: string): string => {
  const appHome = resolveAgentWitchAppHome(origin);

  return `#!/usr/bin/env bash
set -euo pipefail

INSTALL_DIR="\${HOME}/${appHome.installDirName}"
LAUNCH_AGENT_PREFIX="${appHome.launchAgentPrefix}"
LAUNCH_AGENTS_DIR="\${HOME}/Library/LaunchAgents"
UID_NUM="\$(id -u)"

if [[ "\$(uname -s)" != "Darwin" ]]; then
  echo "Agent Witch local uninstall is only supported on macOS." >&2
  exit 1
fi

echo "Stopping Agent Witch processes…"
pkill -f "\${INSTALL_DIR}/${AGENT_WITCH_APP_DIR_NAME}/agent-witch.js" 2>/dev/null || true
pkill -f "\${INSTALL_DIR}/agent-witch.ts" 2>/dev/null || true
pkill -f "\${INSTALL_DIR}/${AGENT_WITCH_APP_DIR_NAME}/${AGENT_WITCH_COMMAND_DIR_NAME}/run.sh" 2>/dev/null || true
pkill -f "\${INSTALL_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/run.sh" 2>/dev/null || true
pkill -f "\${INSTALL_DIR}/run.sh" 2>/dev/null || true
pkill -f "\${INSTALL_DIR}/${AGENT_WITCH_APP_DIR_NAME}/${AGENT_WITCH_COMMAND_DIR_NAME}/wake.sh" 2>/dev/null || true
pkill -f "\${INSTALL_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/wake.sh" 2>/dev/null || true
pkill -f "\${INSTALL_DIR}/wake.sh" 2>/dev/null || true
pkill -f "\${INSTALL_DIR}/${AGENT_WITCH_APP_DIR_NAME}/${AGENT_WITCH_COMMAND_DIR_NAME}/watchdog.sh" 2>/dev/null || true
pkill -f "\${INSTALL_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/watchdog.sh" 2>/dev/null || true
pkill -f "\${INSTALL_DIR}/watchdog.sh" 2>/dev/null || true

echo "Removing LaunchAgents…"
if [[ -d "\${LAUNCH_AGENTS_DIR}" ]]; then
  for plist in "\${LAUNCH_AGENTS_DIR}/\${LAUNCH_AGENT_PREFIX}"*.plist "\${LAUNCH_AGENTS_DIR}/\${LAUNCH_AGENT_PREFIX}."*.plist; do
    [[ -e "\${plist}" ]] || continue
    label="\$(basename "\${plist}" .plist)"
    launchctl bootout "gui/\${UID_NUM}/\${label}" 2>/dev/null || true
    rm -f "\${plist}"
  done
fi

if [[ -d "\${INSTALL_DIR}" ]]; then
  echo "Removing install files…"
  rm -rf "\${INSTALL_DIR}"
else
  echo "No install directory found at \${INSTALL_DIR}."
fi

echo "Agent Witch local install removed."
`;
};
