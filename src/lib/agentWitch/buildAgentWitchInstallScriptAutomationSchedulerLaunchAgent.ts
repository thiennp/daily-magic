import { AGENT_WITCH_LAUNCH_AGENT_PATH_VALUE } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";

export const buildAgentWitchInstallScriptAutomationSchedulerLaunchAgent =
  (input: { readonly installDirName: string }): string => `
AUTOMATION_SCHEDULER_LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}-automation-scheduler"
AUTOMATION_SCHEDULER_PLIST_PATH="\${HOME}/Library/LaunchAgents/\${AUTOMATION_SCHEDULER_LAUNCH_AGENT_LABEL}.plist"

cat > "\${INSTALL_DIR}/automation-scheduler.sh" <<'AUTOMATION_SCHEDULER_EOF'
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
exec "\${NODE_BIN}" "\${TSX_CLI}" "\${SCHEDULER_CLI}"
AUTOMATION_SCHEDULER_EOF
chmod +x "\${INSTALL_DIR}/automation-scheduler.sh"

if [[ "\$(uname -s)" == "Darwin" ]]; then
  cat > "\${AUTOMATION_SCHEDULER_PLIST_PATH}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>\${AUTOMATION_SCHEDULER_LAUNCH_AGENT_LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>\${INSTALL_DIR}/automation-scheduler.sh</string>
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
  <string>\${INSTALL_DIR}/agent-witch-automation-scheduler.log</string>
  <key>StandardErrorPath</key>
  <string>\${INSTALL_DIR}/agent-witch-automation-scheduler.error.log</string>
</dict>
</plist>
EOF

  register_agent_witch_launch_agent "\${AUTOMATION_SCHEDULER_LAUNCH_AGENT_LABEL}" "\${AUTOMATION_SCHEDULER_PLIST_PATH}" || true
  echo "Agent Witch automation scheduler: checks every 60s and runs due scheduled automations on this Mac."
  echo "Manual run: \${INSTALL_DIR}/automation-scheduler.sh"
else
  echo "Linux cron example (every minute):"
  echo "  * * * * * \${INSTALL_DIR}/automation-scheduler.sh >> \${INSTALL_DIR}/agent-witch-automation-scheduler.log 2>&1"
fi
`;
