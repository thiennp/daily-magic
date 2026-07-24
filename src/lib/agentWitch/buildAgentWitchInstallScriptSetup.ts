import type { AgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";
import { resolveAgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";
import { AGENT_WITCH_COMMAND_DIR_NAME } from "@/lib/agentWitch/agentWitchInstallApp.constant";
import {
  AGENT_WITCH_LOGS_DIR_NAME,
  AGENT_WITCH_PROJECTS_DIR_NAME,
} from "@/lib/projects/constants";
import type { AgentWitchInstallScriptPreset } from "@/lib/agentWitch/AgentWitchInstallScriptPreset.type";
import { buildAgentWitchInstallScriptClientBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptClientBlock";
import { buildAgentWitchInstallScriptConfigBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigBlock";
import { buildAgentWitchInstallScriptMacOsConsoleUserGuard } from "@/lib/agentWitch/buildAgentWitchInstallScriptMacOsConsoleUserGuard";
import { buildAgentWitchInstallScriptRetireAuxiliaryLaunchAgents } from "@/lib/agentWitch/buildAgentWitchInstallScriptRetireAuxiliaryLaunchAgents";
import { buildAgentWitchInstallScriptPresetBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptPresetBlock";
import { buildAgentWitchInstallScriptProgress } from "@/lib/agentWitch/buildAgentWitchInstallScriptProgress";
import { buildAgentWitchInstallScriptRegisterLaunchAgentFn } from "@/lib/agentWitch/buildAgentWitchInstallScriptRegisterLaunchAgent";
import { buildAgentWitchInstallScriptWakePortAllocation } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakePortAllocation";
import { buildAgentWitchInstallScriptWriterBootstrap } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterBootstrap";

export const buildAgentWitchInstallScriptSetup = (
  input: {
    readonly appOrigin: string;
    readonly wsUrl: string;
    readonly websocketSupportWarning: string;
    readonly appHome?: AgentWitchAppHome;
  } & AgentWitchInstallScriptPreset,
): string => {
  const appHome = input.appHome ?? resolveAgentWitchAppHome(input.appOrigin);
  const updateExistingInstall = input.updateExistingInstall === true;

  return `#!/usr/bin/env bash
set -euo pipefail
${input.websocketSupportWarning}
${buildAgentWitchInstallScriptPresetBlock(input)}
${updateExistingInstall ? "AGENT_WITCH_SKIP_OPEN_HOME=1\n" : ""}
INSTALL_DIR="\${HOME}/${appHome.installDirName}"
AGENT_WITCH_HOME="\${INSTALL_DIR}"
LAUNCH_AGENT_PREFIX="${appHome.launchAgentPrefix}"
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
APP_DIR="\${INSTALL_DIR}/app"
COMMAND_DIR="\${INSTALL_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}"
RUN_PATH="\${COMMAND_DIR}/run.sh"
LOG_BASENAME="agent-witch"
LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}"

mkdir -p "\${INSTALL_DIR}" "\${COMMAND_DIR}"
${buildAgentWitchInstallScriptWakePortAllocation()}
export AGENT_WITCH_WAKE_PORT

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
  LOG_DIR="\${PROFILE_DIR}/${AGENT_WITCH_LOGS_DIR_NAME}"
  mkdir -p "\${PROFILE_DIR}/harness/sets" "\${PROFILE_DIR}/${AGENT_WITCH_PROJECTS_DIR_NAME}" "\${LOG_DIR}"
  # One LaunchAgent per install home; multi-account shares this process.
  LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}"
  LOG_BASENAME="agent-witch"
else
  CONFIG_PATH="\${INSTALL_DIR}/config.json"
  LOG_DIR="\${INSTALL_DIR}/${AGENT_WITCH_LOGS_DIR_NAME}"
  mkdir -p "\${LOG_DIR}"
fi

PLIST_PATH="\${HOME}/Library/LaunchAgents/\${LAUNCH_AGENT_LABEL}.plist"
export AGENT_WITCH_HOME AGENT_WITCH_WAKE_PORT
${buildAgentWitchInstallScriptMacOsConsoleUserGuard()}
${buildAgentWitchInstallScriptRetireAuxiliaryLaunchAgents()}
${buildAgentWitchInstallScriptProgress({ updateExistingInstall })}
agent_witch_install_begin

agent_witch_install_step
${buildAgentWitchInstallScriptConfigBlock({
  wsUrl: input.wsUrl,
  updateExistingInstall: input.updateExistingInstall,
})}${buildAgentWitchInstallScriptWriterBootstrap()}${buildAgentWitchInstallScriptClientBlock({ appOrigin: input.appOrigin })}${buildAgentWitchInstallScriptRegisterLaunchAgentFn()}
`;
};
