import { AGENT_WITCH_LOCAL_TOO_OLD_REFUSAL_COPY } from "@/lib/agentWitch/agentWitchLocalTooOldRefusalCopy.constant";
import { AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant";
import {
  AGENT_WITCH_LOCAL_DOWNLOAD_URL,
  AGENT_WITCH_LOCAL_TOO_OLD_ERROR,
  AGENT_WITCH_LOCAL_TOO_OLD_HTTP_STATUS,
} from "@/lib/agentWitch/agentWitchLocalTooOld.constant";
import type { AgentWitchLocalTooOldRefusal } from "@/lib/agentWitch/types/AgentWitchLocalTooOldRefusal.type";

/** Server helper for the HTTP 409 AWL too-old Connect refuse. */
export const buildAgentWitchLocalTooOldRefusalResponse = (
  installBundleVersion: string | null,
): Response => {
  const body: AgentWitchLocalTooOldRefusal = {
    error: AGENT_WITCH_LOCAL_TOO_OLD_ERROR,
    installBundleVersion,
    minBundleVersion: AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION,
    downloadUrl: AGENT_WITCH_LOCAL_DOWNLOAD_URL,
    message: AGENT_WITCH_LOCAL_TOO_OLD_REFUSAL_COPY.connectRefusedMessage,
  };

  return Response.json(body, { status: AGENT_WITCH_LOCAL_TOO_OLD_HTTP_STATUS });
};
