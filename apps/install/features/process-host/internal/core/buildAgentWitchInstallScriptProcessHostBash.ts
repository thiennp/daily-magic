import {
  AGENT_WITCH_EXTERNAL_BRIDGE_ENV,
  AGENT_WITCH_EXTERNAL_LIVE_ENV,
} from "../../public-api/types";

/**
 * Bash helpers embedded in the generated install script for split-process hosting.
 */
export const buildAgentWitchInstallScriptTruthyEnvFunction = (): string => `
agent_witch_is_truthy_env() {
  local value="\${1:-}"
  value="\$(printf '%s' "\${value}" | tr '[:upper:]' '[:lower:]' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  case "\${value}" in
    1|true|yes|on) return 0 ;;
    *) return 1 ;;
  esac
}
`;

export const buildAgentWitchInstallScriptProcessHostEnvCapture = (): string => `
AGENT_WITCH_INSTALL_EXTERNAL_BRIDGE="\${${AGENT_WITCH_EXTERNAL_BRIDGE_ENV}:-}"
AGENT_WITCH_INSTALL_EXTERNAL_LIVE="\${${AGENT_WITCH_EXTERNAL_LIVE_ENV}:-}"
`;

export const buildAgentWitchInstallScriptProcessHostLaunchAgentEnvEntries =
  (): string => `
if agent_witch_is_truthy_env "\${AGENT_WITCH_INSTALL_EXTERNAL_BRIDGE}"; then
  cat >> "\${PLIST_PATH}" <<'AWI_PROCESS_HOST_ENV'
    <key>${AGENT_WITCH_EXTERNAL_BRIDGE_ENV}</key>
    <string>1</string>
AWI_PROCESS_HOST_ENV
fi
if agent_witch_is_truthy_env "\${AGENT_WITCH_INSTALL_EXTERNAL_LIVE}"; then
  cat >> "\${PLIST_PATH}" <<'AWI_PROCESS_HOST_ENV'
    <key>${AGENT_WITCH_EXTERNAL_LIVE_ENV}</key>
    <string>1</string>
AWI_PROCESS_HOST_ENV
fi
`;
