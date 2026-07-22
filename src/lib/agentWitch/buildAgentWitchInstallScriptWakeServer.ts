import { buildAgentWitchInstallScriptWakeServerPlist } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakeServerPlist";
import { buildAgentWitchWakeInstallScriptDownloadLines } from "@/lib/agentWitch/buildAgentWitchWakeInstallScriptDownloadLines";

export const buildAgentWitchInstallScriptWakeServer = (input: {
  readonly installDirName: string;
  readonly appOrigin: string;
}): string => `
WAKE_LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}-wake"
WAKE_PLIST_PATH="\${HOME}/Library/LaunchAgents/\${WAKE_LAUNCH_AGENT_LABEL}.plist"

agent_witch_install_step
${buildAgentWitchWakeInstallScriptDownloadLines(input.appOrigin)}

cat > "\${INSTALL_DIR}/wake.sh" <<'WAKE_EOF'
#!/usr/bin/env bash
set -euo pipefail
INSTALL_DIR="\${AGENT_WITCH_HOME:-\${HOME}/${input.installDirName}}"
NODE_BIN="\$(command -v node)"
TSX_CLI="\${INSTALL_DIR}/node_modules/tsx/dist/cli.mjs"
WAKE_CLI="\${INSTALL_DIR}/agent-witch-wake-cli.ts"

if [[ -z "\${NODE_BIN}" || ! -f "\${TSX_CLI}" || ! -f "\${WAKE_CLI}" ]]; then
  echo "Agent Witch is not installed. Run the install command from Home first." >&2
  exit 1
fi

cd "\${INSTALL_DIR}"
export AGENT_WITCH_HOME="\${INSTALL_DIR}"
exec "\${NODE_BIN}" "\${TSX_CLI}" "\${WAKE_CLI}"
WAKE_EOF
chmod +x "\${INSTALL_DIR}/wake.sh"
${buildAgentWitchInstallScriptWakeServerPlist()}
`;
