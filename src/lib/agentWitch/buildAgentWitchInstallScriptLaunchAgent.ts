import { AGENT_WITCH_LAUNCH_AGENT_PATH_VALUE } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";
import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";

export const buildAgentWitchInstallScriptLaunchAgent = (): string => `
agent_witch_install_step
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
    <string>\${APP_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.fileName}</string>
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
  agent_witch_retire_auxiliary_launch_agents
  sleep 2

  if ! launchctl print "gui/\$(id -u)/\${LAUNCH_AGENT_LABEL}" 2>/dev/null | grep -q 'state = running'; then
    nohup "\${RUN_PATH}" >> "\${INSTALL_DIR}/\${LOG_BASENAME}.log" 2>> "\${INSTALL_DIR}/\${LOG_BASENAME}.error.log" &
    sleep 1
  fi
else
  echo "Agent Witch installed. Run: \${RUN_PATH}" >&2
fi
`;
