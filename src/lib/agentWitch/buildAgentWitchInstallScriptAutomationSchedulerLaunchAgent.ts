import { AGENT_WITCH_COMMAND_DIR_NAME } from "@/lib/agentWitch/agentWitchInstallApp.constant";

export const buildAgentWitchInstallScriptAutomationSchedulerLaunchAgent =
  (input: { readonly installDirName: string }): string => `
AUTOMATION_SCHEDULER_LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}-automation-scheduler"

cat > "\${INSTALL_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/automation-scheduler.sh" <<'AUTOMATION_SCHEDULER_EOF'
#!/usr/bin/env bash
set -euo pipefail
INSTALL_DIR="\${AGENT_WITCH_HOME:-\${HOME}/${input.installDirName}}"
NODE_BIN="\$(command -v node)"
TSX_CLI="\${INSTALL_DIR}/node_modules/tsx/dist/cli.mjs"
SCHEDULER_CLI="\${INSTALL_DIR}/agent-witch-automation-scheduler.ts"

if [[ -z "\${NODE_BIN}" || ! -f "\${TSX_CLI}" || ! -f "\${SCHEDULER_CLI}" ]]; then
  exit 0
fi

cd "\${INSTALL_DIR}"
export AGENT_WITCH_HOME="\${INSTALL_DIR}"
agent_witch_skip_unless_active_console_user
exec "\${NODE_BIN}" "\${TSX_CLI}" "\${SCHEDULER_CLI}"
AUTOMATION_SCHEDULER_EOF
chmod +x "\${INSTALL_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/automation-scheduler.sh"

agent_witch_retire_auxiliary_launch_agents
`;
