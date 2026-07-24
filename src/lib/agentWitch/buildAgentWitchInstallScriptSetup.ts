import type { AgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";
import { resolveAgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";
import { AGENT_WITCH_COMMAND_DIR_NAME } from "@/lib/agentWitch/agentWitchInstallApp.constant";
import type { AgentWitchInstallScriptPreset } from "@/lib/agentWitch/AgentWitchInstallScriptPreset.type";
import { buildAgentWitchInstallScriptClientBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptClientBlock";
import { buildAgentWitchInstallScriptConfigBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigBlock";
import { buildAgentWitchInstallScriptMacOsConsoleUserGuard } from "@/lib/agentWitch/buildAgentWitchInstallScriptMacOsConsoleUserGuard";
import { buildAgentWitchInstallScriptRetireAuxiliaryLaunchAgents } from "@/lib/agentWitch/buildAgentWitchInstallScriptRetireAuxiliaryLaunchAgents";
import { buildAgentWitchInstallScriptPresetBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptPresetBlock";
import { buildAgentWitchInstallScriptProgress } from "@/lib/agentWitch/buildAgentWitchInstallScriptProgress";
import {
  buildAgentWitchInstallScriptEnsureProfileDirectoriesBlock,
  buildAgentWitchInstallScriptResolveProfilePathsBlock,
} from "@/lib/agentWitch/buildAgentWitchInstallScriptResolveProfilePaths";
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
COMMAND_DIR="\${APP_DIR}/${AGENT_WITCH_COMMAND_DIR_NAME}"
RUN_PATH="\${COMMAND_DIR}/run.sh"
LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}"

mkdir -p "\${INSTALL_DIR}" "\${APP_DIR}" "\${COMMAND_DIR}"
${buildAgentWitchInstallScriptResolveProfilePathsBlock()}${buildAgentWitchInstallScriptEnsureProfileDirectoriesBlock()}
${buildAgentWitchInstallScriptWakePortAllocation()}
export AGENT_WITCH_HOME AGENT_WITCH_WAKE_PORT

resolve_agent_witch_profile_paths
ensure_agent_witch_profile_directories

if [[ -n "\${PROFILE_EMAIL}" ]]; then
  # One LaunchAgent per install home; multi-account shares this process.
  LAUNCH_AGENT_LABEL="\${LAUNCH_AGENT_PREFIX}"
fi

PLIST_PATH="\${HOME}/Library/LaunchAgents/\${LAUNCH_AGENT_LABEL}.plist"
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
