export const buildAgentWitchInstallScriptLaunchAgent = (
  wsUrl: string,
): string => `
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
    <string>\${NODE_DIR}:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <dict>
    <key>SuccessfulExit</key>
    <false/>
    <key>Crashed</key>
    <true/>
  </dict>
  <key>ThrottleInterval</key>
  <integer>10</integer>
  <key>StandardOutPath</key>
  <string>\${INSTALL_DIR}/agent-witch.log</string>
  <key>StandardErrorPath</key>
  <string>\${INSTALL_DIR}/agent-witch.error.log</string>
</dict>
</plist>
EOF

  if launchctl print "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}" >/dev/null 2>&1; then
    launchctl bootout "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}" || true
    sleep 1
  fi

  launchctl bootstrap "gui/\$(id -u)" "\${PLIST_PATH}"
  launchctl enable "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}"
  launchctl kickstart -k "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}"
  sleep 2

  if launchctl print "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}" | grep -q 'state = running'; then
    echo "Agent Witch is running and will auto-reconnect to ${wsUrl}"
  else
    echo "Agent Witch LaunchAgent installed. Check logs if it is not running yet." >&2
  fi
else
  echo "Installed Agent Witch to \${INSTALL_DIR}."
  echo "Linux autostart is not configured automatically. Run: \${RUN_PATH}"
fi

echo "Installed Agent Witch to \${INSTALL_DIR}"
echo "Config: \${INSTALL_DIR}/config.json"
echo "Pairing token: \${PAIRING_TOKEN}"
echo "Paste this token into the app under Local agent pairing."
echo "Logs (macOS): \${INSTALL_DIR}/agent-witch.log"
echo "The client starts immediately and revives after crashes or disconnects."
`;
