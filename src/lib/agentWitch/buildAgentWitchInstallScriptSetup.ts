import type { AgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";
import { resolveAgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";
import type { AgentWitchInstallScriptPreset } from "@/lib/agentWitch/AgentWitchInstallScriptPreset.type";
import { buildAgentWitchInstallScriptClientBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptClientBlock";
import { buildAgentWitchInstallScriptConfigBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigBlock";
import { buildAgentWitchInstallScriptMacOsConsoleUserGuard } from "@/lib/agentWitch/buildAgentWitchInstallScriptMacOsConsoleUserGuard";
import { buildAgentWitchInstallScriptRetireAuxiliaryLaunchAgents } from "@/lib/agentWitch/buildAgentWitchInstallScriptRetireAuxiliaryLaunchAgents";
import { buildAgentWitchInstallScriptPresetBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptPresetBlock";
import { buildAgentWitchInstallScriptProgress } from "@/lib/agentWitch/buildAgentWitchInstallScriptProgress";
import { buildAgentWitchInstallScriptRegisterLaunchAgentFn } from "@/lib/agentWitch/buildAgentWitchInstallScriptRegisterLaunchAgent";
import { buildAgentWitchInstallScriptWriterBootstrap } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterBootstrap";

export const buildAgentWitchInstallScriptSetup = (
  input: {
    readonly appOrigin: string;
    readonly wsUrl: string;
    readonly clientScriptUrl: string;
    readonly websocketSupportWarning: string;
    readonly appHome?: AgentWitchAppHome;
  } & AgentWitchInstallScriptPreset,
): string => {
  const appHome = input.appHome ?? resolveAgentWitchAppHome(input.appOrigin);
  const repairExistingInstall = input.repairExistingInstall === true;

  return `#!/usr/bin/env bash
set -euo pipefail
${input.websocketSupportWarning}
${buildAgentWitchInstallScriptPresetBlock(input)}
${repairExistingInstall ? "AGENT_WITCH_SKIP_OPEN_HOME=1\n" : ""}
INSTALL_DIR="\${HOME}/${appHome.installDirName}"
AGENT_WITCH_HOME="\${INSTALL_DIR}"
AGENT_WITCH_WAKE_PORT="${appHome.wakePort}"
LAUNCH_AGENT_PREFIX="${appHome.launchAgentPrefix}"
CLIENT_SCRIPT_URL="${input.clientScriptUrl}"
NODE_BIN="\$(command -v node)"
CURL_BIN="\$(command -v curl)"

if [[ -z "\${NODE_BIN}" ]]; then
  echo "Node.js is required." >&2
  exit 1
fi

if [[ -z "\${CURL_BIN}" ]]; then
  echo "curl is required." >&2
  exit 1
fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    --email)
      shift
      PROFILE_EMAIL="\${1:-}"
      shift
      ;;
    --email=*)
      PROFILE_EMAIL="\${1#*=}"
      shift
      ;;
    *)
      shift
      ;;
  esac
done

PROFILE_EMAIL="\${PROFILE_EMAIL:-\${AGENT_WITCH_PROFILE:-\${AGENT_WITCH_EMAIL:-}}}"
PROFILE_EMAIL="\$(printf '%s' "\${PROFILE_EMAIL}" | tr '[:upper:]' '[:lower:]' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"

if [[ -z "\${PROFILE_EMAIL}" && -n "\${PRESET_PROFILE_EMAIL:-}" ]]; then
  PROFILE_EMAIL="\${PRESET_PROFILE_EMAIL}"
fi

NODE_DIR="\$(dirname "\${NODE_BIN}")"
RUN_PATH="\${INSTALL_DIR}/run.sh"
TSX_CLI="\${INSTALL_DIR}/node_modules/tsx/dist/cli.mjs"
LOG_BASENAME="agent-witch"
LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}"

mkdir -p "\${INSTALL_DIR}"

if [[ -z "\${PROFILE_EMAIL}" && -f "\${INSTALL_DIR}/active-profile.json" ]]; then
  PROFILE_EMAIL="\$( "\${NODE_BIN}" -e "
const fs = require('node:fs');
try {
  const parsed = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
  if (typeof parsed.email === 'string' && parsed.email.trim().length > 0) {
    process.stdout.write(parsed.email.trim().toLowerCase());
  }
} catch {}
" "\${INSTALL_DIR}/active-profile.json" )"
  PROFILE_EMAIL="\$(printf '%s' "\${PROFILE_EMAIL}" | tr '[:upper:]' '[:lower:]' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
fi

if [[ -n "\${PROFILE_EMAIL}" ]]; then
  PROFILE_DIR="\${INSTALL_DIR}/profiles/\${PROFILE_EMAIL}"
  CONFIG_PATH="\${PROFILE_DIR}/config.json"
  mkdir -p "\${PROFILE_DIR}/harness/sets"
  LABEL_SUFFIX="\$(printf '%s' "\${PROFILE_EMAIL}" | sed 's/@/-at-/g' | sed 's/[^a-z0-9-]/-/g' | sed 's/^-*//;s/-*$//')"
  LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}.\${LABEL_SUFFIX}"
  LOG_BASENAME="agent-witch-\${LABEL_SUFFIX}"
else
  CONFIG_PATH="\${INSTALL_DIR}/config.json"
fi

PLIST_PATH="\${HOME}/Library/LaunchAgents/\${LAUNCH_AGENT_LABEL}.plist"
export AGENT_WITCH_HOME AGENT_WITCH_WAKE_PORT
${buildAgentWitchInstallScriptMacOsConsoleUserGuard()}
${buildAgentWitchInstallScriptRetireAuxiliaryLaunchAgents()}
${buildAgentWitchInstallScriptProgress()}
agent_witch_install_begin

agent_witch_install_step
${buildAgentWitchInstallScriptConfigBlock({
  wsUrl: input.wsUrl,
  repairExistingInstall: input.repairExistingInstall,
})}${buildAgentWitchInstallScriptWriterBootstrap()}${buildAgentWitchInstallScriptClientBlock({ appOrigin: input.appOrigin, clientScriptUrl: input.clientScriptUrl })}${buildAgentWitchInstallScriptRegisterLaunchAgentFn()}
`;
};
