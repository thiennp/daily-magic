import { AGENT_WITCH_LAUNCH_AGENT_PATH_VALUE } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";

export const buildAgentWitchInstallScriptWatchdog = (input: {
  readonly installDirName: string;
  readonly watchdogScriptUrl: string;
  readonly reviveScriptUrl: string;
  readonly connectionHealthScriptUrl: string;
  readonly connectionHealthConstantsScriptUrl: string;
  readonly launchAgentRunningScriptUrl: string;
  readonly listTargetsScriptUrl: string;
  readonly kickstartScriptUrl: string;
  readonly spawnClientScriptUrl: string;
  readonly localLayoutScriptUrl: string;
  readonly watchdogLogScriptUrl: string;
  readonly watchdogStatusScriptUrl: string;
}): string => `
WATCHDOG_SCRIPT_URL="${input.watchdogScriptUrl}"
REVIVE_SCRIPT_URL="${input.reviveScriptUrl}"
CONNECTION_HEALTH_SCRIPT_URL="${input.connectionHealthScriptUrl}"
CONNECTION_HEALTH_CONSTANTS_SCRIPT_URL="${input.connectionHealthConstantsScriptUrl}"
LAUNCH_AGENT_RUNNING_SCRIPT_URL="${input.launchAgentRunningScriptUrl}"
WATCHDOG_LIST_TARGETS_SCRIPT_URL="${input.listTargetsScriptUrl}"
WATCHDOG_KICKSTART_SCRIPT_URL="${input.kickstartScriptUrl}"
WATCHDOG_SPAWN_CLIENT_SCRIPT_URL="${input.spawnClientScriptUrl}"
WATCHDOG_LOCAL_LAYOUT_SCRIPT_URL="${input.localLayoutScriptUrl}"
WATCHDOG_LOG_SCRIPT_URL="${input.watchdogLogScriptUrl}"
WATCHDOG_STATUS_SCRIPT_URL="${input.watchdogStatusScriptUrl}"
WATCHDOG_LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}-watchdog"
WATCHDOG_PLIST_PATH="\${HOME}/Library/LaunchAgents/\${WATCHDOG_LAUNCH_AGENT_LABEL}.plist"

agent_witch_install_step
"\${CURL_BIN}" -fsSL "\${WATCHDOG_SCRIPT_URL}" -o "\${INSTALL_DIR}/agent-witch-watchdog.ts"
"\${CURL_BIN}" -fsSL "\${REVIVE_SCRIPT_URL}" -o "\${INSTALL_DIR}/reviveAgentWitchWebSocket.ts"
"\${CURL_BIN}" -fsSL "\${CONNECTION_HEALTH_SCRIPT_URL}" -o "\${INSTALL_DIR}/agentWitchConnectionHealth.ts"
"\${CURL_BIN}" -fsSL "\${CONNECTION_HEALTH_CONSTANTS_SCRIPT_URL}" -o "\${INSTALL_DIR}/agentWitchConnectionHealth.constants.ts"
"\${CURL_BIN}" -fsSL "\${LAUNCH_AGENT_RUNNING_SCRIPT_URL}" -o "\${INSTALL_DIR}/isAgentWitchLaunchAgentRunning.ts"
"\${CURL_BIN}" -fsSL "\${WATCHDOG_LIST_TARGETS_SCRIPT_URL}" -o "\${INSTALL_DIR}/listAgentWitchLaunchTargets.ts"
"\${CURL_BIN}" -fsSL "\${WATCHDOG_KICKSTART_SCRIPT_URL}" -o "\${INSTALL_DIR}/kickstartAgentWitchLaunchAgent.ts"
"\${CURL_BIN}" -fsSL "\${WATCHDOG_SPAWN_CLIENT_SCRIPT_URL}" -o "\${INSTALL_DIR}/spawnAgentWitchClient.ts"
"\${CURL_BIN}" -fsSL "\${WATCHDOG_LOCAL_LAYOUT_SCRIPT_URL}" -o "\${INSTALL_DIR}/resolveAgentWitchLocalLayout.ts"
"\${CURL_BIN}" -fsSL "\${WATCHDOG_LOG_SCRIPT_URL}" -o "\${INSTALL_DIR}/agentWitchWatchdogLog.ts"
"\${CURL_BIN}" -fsSL "\${WATCHDOG_STATUS_SCRIPT_URL}" -o "\${INSTALL_DIR}/buildAgentWitchWatchdogStatus.ts"

cat > "\${INSTALL_DIR}/watchdog.sh" <<'WATCHDOG_EOF'
#!/usr/bin/env bash
set -euo pipefail
INSTALL_DIR="\${AGENT_WITCH_HOME:-\${HOME}/${input.installDirName}}"
NODE_BIN="\$(command -v node)"
TSX_CLI="\${INSTALL_DIR}/node_modules/tsx/dist/cli.mjs"
WATCHDOG_CLI="\${INSTALL_DIR}/agent-witch-watchdog.ts"

if [[ -z "\${NODE_BIN}" || ! -f "\${TSX_CLI}" || ! -f "\${WATCHDOG_CLI}" ]]; then
  exit 0
fi

cd "\${INSTALL_DIR}"
export AGENT_WITCH_HOME="\${INSTALL_DIR}"
agent_witch_skip_unless_active_console_user
exec "\${NODE_BIN}" "\${TSX_CLI}" "\${WATCHDOG_CLI}"
WATCHDOG_EOF
chmod +x "\${INSTALL_DIR}/watchdog.sh"

if [[ "\$(uname -s)" == "Darwin" ]]; then
  cat > "\${WATCHDOG_PLIST_PATH}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>\${WATCHDOG_LAUNCH_AGENT_LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>\${INSTALL_DIR}/watchdog.sh</string>
  </array>
  <key>WorkingDirectory</key>
  <string>\${INSTALL_DIR}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>\${HOME}</string>
    <key>PATH</key>
    <string>${AGENT_WITCH_LAUNCH_AGENT_PATH_VALUE}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>\${INSTALL_DIR}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>\${AGENT_WITCH_WAKE_PORT}</string>
  </dict>
  <key>StartInterval</key>
  <integer>60</integer>
  <key>RunAtLoad</key>
  <true/>
  <key>StandardOutPath</key>
  <string>\${INSTALL_DIR}/agent-witch-watchdog.log</string>
  <key>StandardErrorPath</key>
  <string>\${INSTALL_DIR}/agent-witch-watchdog.error.log</string>
</dict>
</plist>
EOF

  register_agent_witch_launch_agent "\${WATCHDOG_LAUNCH_AGENT_LABEL}" "\${WATCHDOG_PLIST_PATH}" || true
else
  :
fi
`;
