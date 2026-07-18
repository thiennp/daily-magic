import { buildAgentWitchInstallScriptWakeServerDependencies } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakeServerDependencies";
import { buildAgentWitchInstallScriptWakeServerPlist } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakeServerPlist";

export const buildAgentWitchInstallScriptWakeServer = (input: {
  readonly installDirName: string;
  readonly wakeServerScriptUrl: string;
  readonly wakeConstantsScriptUrl: string;
  readonly wakeListTargetsScriptUrl: string;
  readonly wakeKickstartScriptUrl: string;
  readonly wakeHandlersScriptUrl: string;
  readonly wakeAllowedOriginsScriptUrl: string;
  readonly wakeEnsureProfileScriptUrl: string;
  readonly wakeLinkAccountScriptUrl: string;
  readonly wakeSpawnClientScriptUrl: string;
  readonly wakeCliScriptUrl: string;
  readonly reviveScriptUrl: string;
  readonly connectionHealthScriptUrl: string;
  readonly connectionHealthConstantsScriptUrl: string;
  readonly launchAgentRunningScriptUrl: string;
  readonly watchdogLogScriptUrl: string;
  readonly watchdogStatusScriptUrl: string;
  readonly localLayoutScriptUrl: string;
}): string => `
WAKE_SERVER_SCRIPT_URL="${input.wakeServerScriptUrl}"
WAKE_CONSTANTS_SCRIPT_URL="${input.wakeConstantsScriptUrl}"
WAKE_LIST_TARGETS_SCRIPT_URL="${input.wakeListTargetsScriptUrl}"
WAKE_KICKSTART_SCRIPT_URL="${input.wakeKickstartScriptUrl}"
WAKE_HANDLERS_SCRIPT_URL="${input.wakeHandlersScriptUrl}"
WAKE_ALLOWED_ORIGINS_SCRIPT_URL="${input.wakeAllowedOriginsScriptUrl}"
WAKE_ENSURE_PROFILE_SCRIPT_URL="${input.wakeEnsureProfileScriptUrl}"
WAKE_LINK_ACCOUNT_SCRIPT_URL="${input.wakeLinkAccountScriptUrl}"
WAKE_SPAWN_CLIENT_SCRIPT_URL="${input.wakeSpawnClientScriptUrl}"
WAKE_CLI_SCRIPT_URL="${input.wakeCliScriptUrl}"
WAKE_LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}-wake"
WAKE_PLIST_PATH="\${HOME}/Library/LaunchAgents/\${WAKE_LAUNCH_AGENT_LABEL}.plist"

echo "Downloading Agent Witch wake server from \${WAKE_SERVER_SCRIPT_URL}…"
"\${CURL_BIN}" -fsSL "\${WAKE_SERVER_SCRIPT_URL}" -o "\${INSTALL_DIR}/agent-witch-wake-server.ts"
"\${CURL_BIN}" -fsSL "\${WAKE_CONSTANTS_SCRIPT_URL}" -o "\${INSTALL_DIR}/agentWitchWakeConstants.ts"
"\${CURL_BIN}" -fsSL "\${WAKE_LIST_TARGETS_SCRIPT_URL}" -o "\${INSTALL_DIR}/listAgentWitchLaunchTargets.ts"
"\${CURL_BIN}" -fsSL "\${WAKE_KICKSTART_SCRIPT_URL}" -o "\${INSTALL_DIR}/kickstartAgentWitchLaunchAgent.ts"
"\${CURL_BIN}" -fsSL "\${WAKE_HANDLERS_SCRIPT_URL}" -o "\${INSTALL_DIR}/agentWitchWakeHandlers.ts"
"\${CURL_BIN}" -fsSL "\${WAKE_ALLOWED_ORIGINS_SCRIPT_URL}" -o "\${INSTALL_DIR}/agentWitchWakeAllowedOrigins.ts"
"\${CURL_BIN}" -fsSL "\${WAKE_ENSURE_PROFILE_SCRIPT_URL}" -o "\${INSTALL_DIR}/ensureAgentWitchProfile.ts"
"\${CURL_BIN}" -fsSL "\${WAKE_LINK_ACCOUNT_SCRIPT_URL}" -o "\${INSTALL_DIR}/linkAgentWitchAccountLocally.ts"
"\${CURL_BIN}" -fsSL "\${WAKE_SPAWN_CLIENT_SCRIPT_URL}" -o "\${INSTALL_DIR}/spawnAgentWitchClient.ts"
"\${CURL_BIN}" -fsSL "\${WAKE_CLI_SCRIPT_URL}" -o "\${INSTALL_DIR}/agent-witch-wake-cli.ts"
${buildAgentWitchInstallScriptWakeServerDependencies({
  reviveScriptUrl: input.reviveScriptUrl,
  connectionHealthScriptUrl: input.connectionHealthScriptUrl,
  connectionHealthConstantsScriptUrl: input.connectionHealthConstantsScriptUrl,
  launchAgentRunningScriptUrl: input.launchAgentRunningScriptUrl,
  watchdogLogScriptUrl: input.watchdogLogScriptUrl,
  watchdogStatusScriptUrl: input.watchdogStatusScriptUrl,
  localLayoutScriptUrl: input.localLayoutScriptUrl,
})}

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
echo "Wake script: \${INSTALL_DIR}/wake.sh"
${buildAgentWitchInstallScriptWakeServerPlist()}
`;
