import { AGENT_WITCH_COMMAND_DIR_NAME } from "@/lib/agentWitch/agentWitchInstallApp.constant";

export const buildAgentWitchInstallScriptAutomationSchedulerLaunchAgent =
  (): string => `
AUTOMATION_SCHEDULER_LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}-automation-scheduler"

cat > "\${INSTALL_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/automation-scheduler.sh" <<'AUTOMATION_SCHEDULER_EOF'
#!/usr/bin/env bash
set -euo pipefail
# Scheduled automations run in-process inside the main Agent Witch client.
exit 0
AUTOMATION_SCHEDULER_EOF
chmod +x "\${INSTALL_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/automation-scheduler.sh"

agent_witch_retire_auxiliary_launch_agents
`;
