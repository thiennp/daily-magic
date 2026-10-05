import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";
import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "../../../projects/internal/core/agentWitchDeviceAuth.constant";

/**
 * POST computerAck to cloud after a durable local history write.
 * Uses the existing AWL authenticated device client (pairing token).
 */
export const postProjectMessageComputerAck = async (input: {
  readonly cloudApi: AgentWitchCloudApiConfig;
  readonly projectId: string;
  readonly messageId: string;
}): Promise<{ readonly ok: boolean; readonly status: number }> => {
  const response = await fetch(
    `${input.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(input.projectId)}/computer-history/acks`,
    {
      method: "POST",
      headers: {
        [AGENT_WITCH_PAIRING_TOKEN_HEADER]: input.cloudApi.pairingToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageId: input.messageId }),
      signal: AbortSignal.timeout(30_000),
    },
  );
  return { ok: response.ok, status: response.status };
};
