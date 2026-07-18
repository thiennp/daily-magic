import { AGENT_WITCH_LAUNCH_AGENT_PATH_VALUE } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterPath";
import { AGENT_WITCH_UPDATER_INTERVAL_SEC } from "@/lib/agentWitch/agentWitchUpdater.constants";

export const buildAgentWitchInstallScriptUpdater = (input: {
  readonly installDirName: string;
  readonly selfUpdateScriptUrl: string;
  readonly selfUpdateCoreScriptUrl: string;
  readonly installVersionScriptUrl: string;
  readonly resolveAppOriginScriptUrl: string;
  readonly selfUpdateLogScriptUrl: string;
  readonly launchAgentLabelsScriptUrl: string;
  readonly listTargetsScriptUrl: string;
  readonly kickstartScriptUrl: string;
  readonly localLayoutScriptUrl: string;
}): string => `
UPDATER_SCRIPT_URL="${input.selfUpdateScriptUrl}"
SELF_UPDATE_CORE_SCRIPT_URL="${input.selfUpdateCoreScriptUrl}"
INSTALL_VERSION_SCRIPT_URL="${input.installVersionScriptUrl}"
RESOLVE_APP_ORIGIN_SCRIPT_URL="${input.resolveAppOriginScriptUrl}"
SELF_UPDATE_LOG_SCRIPT_URL="${input.selfUpdateLogScriptUrl}"
LAUNCH_AGENT_LABELS_SCRIPT_URL="${input.launchAgentLabelsScriptUrl}"
UPDATER_LIST_TARGETS_SCRIPT_URL="${input.listTargetsScriptUrl}"
UPDATER_KICKSTART_SCRIPT_URL="${input.kickstartScriptUrl}"
UPDATER_LOCAL_LAYOUT_SCRIPT_URL="${input.localLayoutScriptUrl}"
UPDATER_LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}-updater"
UPDATER_PLIST_PATH="\${HOME}/Library/LaunchAgents/\${UPDATER_LAUNCH_AGENT_LABEL}.plist"

echo "Downloading Agent Witch self-update scripts…"
"\${CURL_BIN}" -fsSL "\${UPDATER_SCRIPT_URL}" -o "\${INSTALL_DIR}/agent-witch-self-update.ts"
"\${CURL_BIN}" -fsSL "\${SELF_UPDATE_CORE_SCRIPT_URL}" -o "\${INSTALL_DIR}/agentWitchSelfUpdate.ts"
"\${CURL_BIN}" -fsSL "\${INSTALL_VERSION_SCRIPT_URL}" -o "\${INSTALL_DIR}/agentWitchInstallVersion.ts"
"\${CURL_BIN}" -fsSL "\${RESOLVE_APP_ORIGIN_SCRIPT_URL}" -o "\${INSTALL_DIR}/resolveAgentWitchAppOriginFromWsUrl.ts"
"\${CURL_BIN}" -fsSL "\${SELF_UPDATE_LOG_SCRIPT_URL}" -o "\${INSTALL_DIR}/agentWitchSelfUpdateLog.ts"
"\${CURL_BIN}" -fsSL "\${LAUNCH_AGENT_LABELS_SCRIPT_URL}" -o "\${INSTALL_DIR}/agentWitchServiceLaunchAgentLabels.constants.ts"
"\${CURL_BIN}" -fsSL "\${UPDATER_LIST_TARGETS_SCRIPT_URL}" -o "\${INSTALL_DIR}/listAgentWitchLaunchTargets.ts"
"\${CURL_BIN}" -fsSL "\${UPDATER_KICKSTART_SCRIPT_URL}" -o "\${INSTALL_DIR}/kickstartAgentWitchLaunchAgent.ts"
"\${CURL_BIN}" -fsSL "\${UPDATER_LOCAL_LAYOUT_SCRIPT_URL}" -o "\${INSTALL_DIR}/resolveAgentWitchLocalLayout.ts"

cat > "\${INSTALL_DIR}/self-update.sh" <<'UPDATER_EOF'
#!/usr/bin/env bash
set -euo pipefail
INSTALL_DIR="\${AGENT_WITCH_HOME:-\${HOME}/${input.installDirName}}"
NODE_BIN="\$(command -v node)"
TSX_CLI="\${INSTALL_DIR}/node_modules/tsx/dist/cli.mjs"
SELF_UPDATE_CLI="\${INSTALL_DIR}/agent-witch-self-update.ts"

if [[ -z "\${NODE_BIN}" || ! -f "\${TSX_CLI}" || ! -f "\${SELF_UPDATE_CLI}" ]]; then
  exit 0
fi

cd "\${INSTALL_DIR}"
export AGENT_WITCH_HOME="\${INSTALL_DIR}"
exec "\${NODE_BIN}" "\${TSX_CLI}" "\${SELF_UPDATE_CLI}"
UPDATER_EOF
chmod +x "\${INSTALL_DIR}/self-update.sh"

if [[ "\$(uname -s)" == "Darwin" ]]; then
  cat > "\${UPDATER_PLIST_PATH}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>\${UPDATER_LAUNCH_AGENT_LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>\${INSTALL_DIR}/self-update.sh</string>
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
  <integer>${AGENT_WITCH_UPDATER_INTERVAL_SEC}</integer>
  <key>RunAtLoad</key>
  <true/>
  <key>StandardOutPath</key>
  <string>\${INSTALL_DIR}/agent-witch-self-update.log</string>
  <key>StandardErrorPath</key>
  <string>\${INSTALL_DIR}/agent-witch-self-update.error.log</string>
</dict>
</plist>
EOF

  register_agent_witch_launch_agent "\${UPDATER_LAUNCH_AGENT_LABEL}" "\${UPDATER_PLIST_PATH}" || true
  echo "Agent Witch updater: checks every ${AGENT_WITCH_UPDATER_INTERVAL_SEC}s for install bundle updates."
  echo "Manual run: \${INSTALL_DIR}/self-update.sh"
else
  echo "Linux cron example (hourly):"
  echo "  0 * * * * \${INSTALL_DIR}/self-update.sh >> \${INSTALL_DIR}/agent-witch-self-update.log 2>&1"
fi
`;
