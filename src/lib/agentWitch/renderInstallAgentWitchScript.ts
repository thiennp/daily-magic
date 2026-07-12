import {
  buildAgentWitchClientScriptUrl,
  buildAgentWitchInstallAuxiliaryScriptUrl,
  buildAgentWitchWsUrl,
} from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { buildAgentWitchInstallBashScript } from "@/lib/agentWitch/buildAgentWitchInstallBashScript";
import { buildAgentWitchWebSocketSupportWarning } from "@/lib/agentWitch/buildAgentWitchWebSocketSupportWarning";

export const renderInstallAgentWitchScript = (origin: string): string => {
  const wsUrl = buildAgentWitchWsUrl(origin);
  const clientScriptUrl = buildAgentWitchClientScriptUrl(origin);
  const resolveLayoutScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "resolveAgentWitchLocalLayout.ts",
  );
  const readHarnessExportSetsScriptUrl =
    buildAgentWitchInstallAuxiliaryScriptUrl(
      origin,
      "readHarnessExportSets.ts",
    );
  const websocketSupportWarning = buildAgentWitchWebSocketSupportWarning(
    origin,
    wsUrl,
  );

  return buildAgentWitchInstallBashScript({
    wsUrl,
    clientScriptUrl,
    resolveLayoutScriptUrl,
    readHarnessExportSetsScriptUrl,
    websocketSupportWarning,
  });
};
