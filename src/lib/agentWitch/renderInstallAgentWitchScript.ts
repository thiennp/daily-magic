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
  const buildWriterCliScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "buildWriterCliInvocation.ts",
  );
  const wakeServerScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agent-witch-wake-server.ts",
  );
  const wakeConstantsScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchWakeConstants.ts",
  );
  const wakeListTargetsScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "listAgentWitchLaunchTargets.ts",
  );
  const wakeKickstartScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "kickstartAgentWitchLaunchAgent.ts",
  );
  const wakeHandlersScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchWakeHandlers.ts",
  );
  const wakeAllowedOriginsScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchWakeAllowedOrigins.ts",
  );
  const wakeEnsureProfileScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "ensureAgentWitchProfile.ts",
  );
  const wakeLinkAccountScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "linkAgentWitchAccountLocally.ts",
  );
  const wakeSpawnClientScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "spawnAgentWitchClient.ts",
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
    buildWriterCliScriptUrl,
    wakeServerScriptUrl,
    wakeConstantsScriptUrl,
    wakeListTargetsScriptUrl,
    wakeKickstartScriptUrl,
    wakeHandlersScriptUrl,
    wakeAllowedOriginsScriptUrl,
    wakeEnsureProfileScriptUrl,
    wakeLinkAccountScriptUrl,
    wakeSpawnClientScriptUrl,
    websocketSupportWarning,
  });
};
