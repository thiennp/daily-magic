import { AGENT_WITCH_LAUNCH_AGENT_PATH_VALUE } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";

export const buildAgentWitchInstallScriptWakeServer = (input: {
  readonly wakeServerScriptUrl: string;
  readonly wakeConstantsScriptUrl: string;
  readonly wakeListTargetsScriptUrl: string;
  readonly wakeKickstartScriptUrl: string;
  readonly wakeHandlersScriptUrl: string;
  readonly wakeAllowedOriginsScriptUrl: string;
  readonly wakeEnsureProfileScriptUrl: string;
  readonly wakeLinkAccountScriptUrl: string;
  readonly wakeSpawnClientScriptUrl: string;
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
WAKE_LAUNCH_AGENT_LABEL="com.daily-magic.agent-witch-wake"
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

if [[ "\$(uname -s)" == "Darwin" ]]; then
  cat > "\${WAKE_PLIST_PATH}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>\${WAKE_LAUNCH_AGENT_LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>\${NODE_BIN}</string>
    <string>\${TSX_CLI}</string>
    <string>\${INSTALL_DIR}/agent-witch-wake-server.ts</string>
  </array>
  <key>WorkingDirectory</key>
  <string>\${INSTALL_DIR}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>\${HOME}</string>
    <key>PATH</key>
    <string>${AGENT_WITCH_LAUNCH_AGENT_PATH_VALUE}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>\${INSTALL_DIR}/agent-witch-wake.log</string>
  <key>StandardErrorPath</key>
  <string>\${INSTALL_DIR}/agent-witch-wake.error.log</string>
</dict>
</plist>
EOF

  if launchctl print "gui/\$(id -u)/\${WAKE_LAUNCH_AGENT_LABEL}" >/dev/null 2>&1; then
    launchctl bootout "gui/\$(id -u)/\${WAKE_LAUNCH_AGENT_LABEL}" || true
    sleep 1
  fi

  launchctl bootstrap "gui/\$(id -u)" "\${WAKE_PLIST_PATH}"
  launchctl enable "gui/\$(id -u)/\${WAKE_LAUNCH_AGENT_LABEL}"
  launchctl kickstart -k "gui/\$(id -u)/\${WAKE_LAUNCH_AGENT_LABEL}"
  echo "Agent Witch local API: http://127.0.0.1:47892/link-account"
fi
`;
