import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";

export const buildAgentWitchInstallScriptWatchdog = (input: {
  readonly installDirName: string;
}): string => `
WATCHDOG_LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}-watchdog"
WATCHDOG_PLIST_PATH="\${HOME}/Library/LaunchAgents/\${WATCHDOG_LAUNCH_AGENT_LABEL}.plist"

agent_witch_install_step
cat > "\${INSTALL_DIR}/watchdog.sh" <<'WATCHDOG_EOF'
#!/usr/bin/env bash
set -euo pipefail
INSTALL_DIR="\${AGENT_WITCH_HOME:-\${HOME}/${input.installDirName}}"
APP_DIR="\${INSTALL_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.appDirName}"
NODE_BIN="\$(command -v node)"
APP_BUNDLE="\${APP_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.fileName}"

if [[ -z "\${NODE_BIN}" || ! -f "\${APP_BUNDLE}" ]]; then
  exit 0
fi

cd "\${INSTALL_DIR}"
export AGENT_WITCH_HOME="\${INSTALL_DIR}"
agent_witch_skip_unless_active_console_user
exec "\${NODE_BIN}" "\${APP_BUNDLE}"
WATCHDOG_EOF
chmod +x "\${INSTALL_DIR}/watchdog.sh"

agent_witch_retire_auxiliary_launch_agents
`;
