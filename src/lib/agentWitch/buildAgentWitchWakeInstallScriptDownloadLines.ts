import { AGENT_WITCH_WAKE_INSTALL_SCRIPT_NAMES } from "@/lib/agentWitch/agentWitchWakeInstallScripts.constant";
import { buildAgentWitchInstallAuxiliaryScriptUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export const buildAgentWitchWakeInstallScriptDownloadLines = (
  appOrigin: string,
): string =>
  AGENT_WITCH_WAKE_INSTALL_SCRIPT_NAMES.map(
    (scriptName) =>
      `"\${CURL_BIN}" -fsSL "${buildAgentWitchInstallAuxiliaryScriptUrl(appOrigin, scriptName)}" -o "\${INSTALL_DIR}/${scriptName}"`,
  ).join("\n");
