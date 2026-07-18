import { AGENT_WITCH_LAUNCH_AGENT_PATH_VALUE } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";

export const buildAgentWitchInstallScriptLaunchAgent = (input: {
  readonly wsUrl: string;
  readonly appOrigin: string;
}): string => `
if [[ "\$(uname -s)" == "Darwin" ]]; then
  mkdir -p "\${HOME}/Library/LaunchAgents"
  cat > "\${PLIST_PATH}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>\${LAUNCH_AGENT_LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>\${NODE_BIN}</string>
    <string>\${TSX_CLI}</string>
    <string>\${INSTALL_DIR}/agent-witch.ts</string>
  </array>
  <key>WorkingDirectory</key>
  <string>\${INSTALL_DIR}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>\${HOME}</string>
    <key>PATH</key>
    <string>${AGENT_WITCH_LAUNCH_AGENT_PATH_VALUE}</string>
    <key>AGENT_WITCH_PROFILE</key>
    <string>\${PROFILE_EMAIL}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>\${INSTALL_DIR}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>\${AGENT_WITCH_WAKE_PORT}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
  <key>StandardOutPath</key>
  <string>\${INSTALL_DIR}/\${LOG_BASENAME}.log</string>
  <key>StandardErrorPath</key>
  <string>\${INSTALL_DIR}/\${LOG_BASENAME}.error.log</string>
</dict>
</plist>
EOF

  register_agent_witch_launch_agent "\${LAUNCH_AGENT_LABEL}" "\${PLIST_PATH}" || true
  sleep 2

  if launchctl print "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}" 2>/dev/null | grep -q 'state = running'; then
    echo "Agent Witch is running and will auto-reconnect to ${input.wsUrl}"
  else
    echo "Agent Witch LaunchAgent installed. Check logs if it is not running yet." >&2
  fi

  if ! launchctl print "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}" 2>/dev/null | grep -q 'state = running'; then
    echo "Starting Agent Witch directly because launchctl is unavailable." >&2
    nohup "\${RUN_PATH}" >> "\${INSTALL_DIR}/\${LOG_BASENAME}.log" 2>> "\${INSTALL_DIR}/\${LOG_BASENAME}.error.log" &
    sleep 1
  fi
else
  echo "Installed Agent Witch to \${INSTALL_DIR}."
  echo "Linux autostart is not configured automatically. Run: \${RUN_PATH}"
fi

echo "Installed Agent Witch to \${INSTALL_DIR}"
if [[ -n "\${PROFILE_EMAIL}" ]]; then
  echo "Profile email: \${PROFILE_EMAIL}"
  echo "Harness directory: \${INSTALL_DIR}/profiles/\${PROFILE_EMAIL}/harness"
fi
echo "Config: \${CONFIG_PATH}"
echo "Local link API: http://127.0.0.1:\${AGENT_WITCH_WAKE_PORT}/link-account"
echo "Pairing token: \${PAIRING_TOKEN}"
echo "Logs (macOS): \${INSTALL_DIR}/\${LOG_BASENAME}.log"
echo "The client starts immediately and relaunches if it stops while your Mac is awake."
echo "Run another account on this computer with: AGENT_WITCH_PROFILE=other@example.com curl -fsSL <install-url> | bash"

if [[ "\$(uname -s)" == "Darwin" && -z "\${AGENT_WITCH_SKIP_OPEN_HOME:-}" ]]; then
  echo "Open Home on this Mac while signed in to link it to your account:"
  echo "  ${input.appOrigin}/"
  if command -v open >/dev/null 2>&1; then
    open "${input.appOrigin}/" 2>/dev/null || true
  fi
fi
`;
