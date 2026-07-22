export const buildAgentWitchInstallScriptWatchdog = (input: {
  readonly installDirName: string;
  readonly watchdogScriptUrl: string;
}): string => `
WATCHDOG_SCRIPT_URL="${input.watchdogScriptUrl}"
WATCHDOG_LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}-watchdog"
WATCHDOG_PLIST_PATH="\${HOME}/Library/LaunchAgents/\${WATCHDOG_LAUNCH_AGENT_LABEL}.plist"

agent_witch_install_step
"\${CURL_BIN}" -fsSL "\${WATCHDOG_SCRIPT_URL}" -o "\${INSTALL_DIR}/agent-witch-watchdog.ts"

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

agent_witch_retire_auxiliary_launch_agents
`;
