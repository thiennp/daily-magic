import {
  buildAgentWitchClientScriptUrl,
  buildAgentWitchInstallAuxiliaryScriptUrl,
} from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { buildAgentWitchInstallBashScript } from "@/lib/agentWitch/buildAgentWitchInstallBashScript";
import { buildAgentWitchWebSocketSupportWarning } from "@/lib/agentWitch/buildAgentWitchWebSocketSupportWarning";
import { resolveAgentWitchWsUrl } from "@/lib/agentWitch/resolveAgentWitchWsUrl";

export const renderInstallAgentWitchScript = (origin: string): string => {
  const wsUrl = resolveAgentWitchWsUrl(origin);
  const clientScriptUrl = buildAgentWitchClientScriptUrl(origin);
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
  const wakeCliScriptUrl = buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agent-witch-wake-cli.ts",
  );
  const websocketSupportWarning = buildAgentWitchWebSocketSupportWarning(
    origin,
    wsUrl,
  );

  return buildAgentWitchInstallBashScript({
    appOrigin: origin,
    wsUrl,
    clientScriptUrl,
    wakeServerScriptUrl,
    wakeConstantsScriptUrl,
    wakeListTargetsScriptUrl,
    wakeKickstartScriptUrl,
    wakeHandlersScriptUrl,
    wakeAllowedOriginsScriptUrl,
    wakeEnsureProfileScriptUrl,
    wakeLinkAccountScriptUrl,
    wakeSpawnClientScriptUrl,
    wakeCliScriptUrl,
    websocketSupportWarning,
  });
};
