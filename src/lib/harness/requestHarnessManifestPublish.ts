import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
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
      errorMessage: "No Mac is connected to publish your rules.",
    };
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_MANIFEST_REQUEST,
  });

  return { ok: true };
};
