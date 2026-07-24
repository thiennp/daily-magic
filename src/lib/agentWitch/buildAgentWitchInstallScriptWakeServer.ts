import { AGENT_WITCH_COMMAND_DIR_NAME } from "@/lib/agentWitch/agentWitchInstallApp.constant";
import { buildAgentWitchInstallScriptWakeServerPlist } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakeServerPlist";
import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";

export const buildAgentWitchInstallScriptWakeServer = (input: {
  readonly installDirName: string;
}): string => `
WAKE_LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}-wake"
WAKE_PLIST_PATH="\${HOME}/Library/LaunchAgents/\${WAKE_LAUNCH_AGENT_LABEL}.plist"

agent_witch_install_step
cat > "\${APP_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/wake.sh" <<'WAKE_EOF'
#!/usr/bin/env bash
set -euo pipefail
INSTALL_DIR="\${AGENT_WITCH_HOME:-\${HOME}/${input.installDirName}}"
APP_DIR="\${INSTALL_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.appDirName}"
NODE_BIN="\$(command -v node)"
APP_BUNDLE="\${APP_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.fileName}"

if [[ -z "\${NODE_BIN}" || ! -f "\${APP_BUNDLE}" ]]; then
  echo "Agent Witch is not installed. Run the install command from Home first." >&2
  exit 1
fi

cd "\${INSTALL_DIR}"
export AGENT_WITCH_HOME="\${INSTALL_DIR}"
exec "\${NODE_BIN}" "\${APP_BUNDLE}" wake
WAKE_EOF
chmod +x "\${APP_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/wake.sh"
${buildAgentWitchInstallScriptWakeServerPlist()}
`;
