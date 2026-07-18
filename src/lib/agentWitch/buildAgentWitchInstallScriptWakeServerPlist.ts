import { AGENT_WITCH_LAUNCH_AGENT_PATH_VALUE } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";

export const buildAgentWitchInstallScriptWakeServerPlist = (): string => `
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
    <key>AGENT_WITCH_HOME</key>
    <string>\${INSTALL_DIR}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>\${AGENT_WITCH_WAKE_PORT}</string>
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

  register_agent_witch_launch_agent "\${WAKE_LAUNCH_AGENT_LABEL}" "\${WAKE_PLIST_PATH}" || true
  echo "Agent Witch local API: http://127.0.0.1:\${AGENT_WITCH_WAKE_PORT}/link-account"
  echo "Restart API: http://127.0.0.1:\${AGENT_WITCH_WAKE_PORT}/restart"
  echo "Watchdog status API: http://127.0.0.1:\${AGENT_WITCH_WAKE_PORT}/watchdog/status"
  echo "Watchdog logs API: http://127.0.0.1:\${AGENT_WITCH_WAKE_PORT}/watchdog/logs"
fi
`;
