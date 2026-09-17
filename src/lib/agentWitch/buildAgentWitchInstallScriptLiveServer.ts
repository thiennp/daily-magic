import { AGENT_WITCH_COMMAND_DIR_NAME } from "@/lib/agentWitch/agentWitchInstallApp.constant";
import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";
import { AGENT_WITCH_LAUNCH_AGENT_PATH_VALUE } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";

export const buildAgentWitchInstallScriptLiveServer = (input: {
  readonly installDirName: string;
}): string => `
LIVE_LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}-live"
LIVE_PLIST_PATH="\${HOME}/Library/LaunchAgents/\${LIVE_LAUNCH_AGENT_LABEL}.plist"

agent_witch_install_step
cat > "\${APP_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/live.sh" <<'LIVE_EOF'
#!/usr/bin/env bash
set -euo pipefail
INSTALL_DIR="\${AGENT_WITCH_HOME:-\${HOME}/${input.installDirName}}"
APP_DIR="\${INSTALL_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.appDirName}"
NODE_BIN="\$(command -v node)"
APP_BUNDLE="\${APP_DIR}/${AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.fileName}"

if [[ -z "\${NODE_BIN}" || ! -f "\${APP_BUNDLE}" ]]; then
  echo "Agent Witch is not installed. Run the install command from Home first." >&2
  exit 1
fi

cd "\${INSTALL_DIR}"
export AGENT_WITCH_HOME="\${INSTALL_DIR}"
exec "\${NODE_BIN}" "\${APP_BUNDLE}" local-app
LIVE_EOF
chmod +x "\${APP_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}/live.sh"

if [[ "\$(uname -s)" == "Darwin" ]]; then
  if agent_witch_is_truthy_env "\${AGENT_WITCH_INSTALL_EXTERNAL_LIVE}"; then
    cat > "\${LIVE_PLIST_PATH}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>\${LIVE_LAUNCH_AGENT_LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>\${APP_DIR}/command/live.sh</string>
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
    <key>AGENT_WITCH_EXTERNAL_LIVE</key>
    <string>1</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>\${INSTALL_DIR}/agent-witch-live.log</string>
  <key>StandardErrorPath</key>
  <string>\${INSTALL_DIR}/agent-witch-live.error.log</string>
</dict>
</plist>
EOF

    register_agent_witch_launch_agent "\${LIVE_LAUNCH_AGENT_LABEL}" "\${LIVE_PLIST_PATH}" || true
  else
    launchctl bootout "gui/\$(id -u)/\${LIVE_LAUNCH_AGENT_LABEL}" 2>/dev/null || true
    rm -f "\${LIVE_PLIST_PATH}"
  fi
fi
`;
