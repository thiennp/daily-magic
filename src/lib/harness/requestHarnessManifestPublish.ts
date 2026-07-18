import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const requestHarnessManifestPublish = (
  userId: string,
):
  | { readonly ok: true }
  | { readonly ok: false; readonly errorMessage: string } => {
  const hub = getAgentWitchHub();
  const agentClient = hub.findAgentClientForUser(userId);

  if (agentClient === undefined) {
    return {
      ok: false,
      errorMessage: MAC_OFFLINE_FOR_ACCOUNT_ERROR,
    };
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_MANIFEST_REQUEST,
  });

  return { ok: true };
};
