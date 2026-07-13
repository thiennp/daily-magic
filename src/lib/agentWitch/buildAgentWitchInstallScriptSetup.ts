import { buildAgentWitchInstallScriptClientBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptClientBlock";
import { buildAgentWitchInstallScriptConfigBlock } from "@/lib/agentWitch/buildAgentWitchInstallScriptConfigBlock";
import { buildAgentWitchInstallScriptWriterBootstrap } from "@/lib/agentWitch/buildAgentWitchInstallScriptWriterBootstrap";

export const buildAgentWitchInstallScriptSetup = (input: {
  readonly wsUrl: string;
  readonly clientScriptUrl: string;
  readonly resolveLayoutScriptUrl: string;
  readonly readHarnessExportSetsScriptUrl: string;
  readonly buildWriterCliScriptUrl: string;
  readonly websocketSupportWarning: string;
}): string => `#!/usr/bin/env bash
set -euo pipefail
${input.websocketSupportWarning}

INSTALL_DIR="\${HOME}/.agent-witch"
CLIENT_SCRIPT_URL="${input.clientScriptUrl}"
RESOLVE_LAYOUT_SCRIPT_URL="${input.resolveLayoutScriptUrl}"
READ_HARNESS_EXPORT_SCRIPT_URL="${input.readHarnessExportSetsScriptUrl}"
BUILD_WRITER_CLI_SCRIPT_URL="${input.buildWriterCliScriptUrl}"
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

NODE_DIR="\$(dirname "\${NODE_BIN}")"
RUN_PATH="\${INSTALL_DIR}/run.sh"
TSX_CLI="\${INSTALL_DIR}/node_modules/tsx/dist/cli.mjs"
LOG_BASENAME="agent-witch"
LAUNCH_AGENT_LABEL="com.daily-magic.agent-witch"

mkdir -p "\${INSTALL_DIR}"

if [[ -n "\${PROFILE_EMAIL}" ]]; then
  PROFILE_DIR="\${INSTALL_DIR}/profiles/\${PROFILE_EMAIL}"
  CONFIG_PATH="\${PROFILE_DIR}/config.json"
  mkdir -p "\${PROFILE_DIR}/harness/sets"
  LABEL_SUFFIX="\$(printf '%s' "\${PROFILE_EMAIL}" | sed 's/@/-at-/g' | sed 's/[^a-z0-9-]/-/g' | sed 's/^-*//;s/-*$//')"
  LAUNCH_AGENT_LABEL="com.daily-magic.agent-witch.\${LABEL_SUFFIX}"
  LOG_BASENAME="agent-witch-\${LABEL_SUFFIX}"
else
  CONFIG_PATH="\${INSTALL_DIR}/config.json"
fi

PLIST_PATH="\${HOME}/Library/LaunchAgents/\${LAUNCH_AGENT_LABEL}.plist"
${buildAgentWitchInstallScriptConfigBlock(input)}${buildAgentWitchInstallScriptWriterBootstrap()}${buildAgentWitchInstallScriptClientBlock()}
`;
