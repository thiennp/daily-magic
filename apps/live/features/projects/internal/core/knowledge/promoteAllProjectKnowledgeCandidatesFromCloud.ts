import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "../agentWitchDeviceAuth.constant";
import type { AgentWitchCloudApiConfig } from "../agentWitchCloudApi";

const promoteAllProjectKnowledgeCandidatesFromCloud = async (
  config: AgentWitchCloudApiConfig,
  projectId: string,
): Promise<{ readonly ok: boolean; readonly promotedCount: number }> => {
  try {
    const response = await fetch(
      `${config.appOrigin}/api/agent-witch/projects/${encodeURIComponent(projectId)}/knowledge/promote-all`,
      {
        method: "POST",
        headers: {
          [AGENT_WITCH_PAIRING_TOKEN_HEADER]: config.pairingToken,
        },
        signal: AbortSignal.timeout(15_000),
      },
    );

    if (!response.ok) {
      return { ok: false, promotedCount: 0 };
    }

    const body: unknown = await response.json();
    if (
      typeof body !== "object" ||
      body === null ||
      (body as { ok?: unknown }).ok !== true
    ) {
      return { ok: false, promotedCount: 0 };
    }

    const promotedCount =
      typeof (body as { promotedCount?: unknown }).promotedCount === "number"
        ? (body as { promotedCount: number }).promotedCount
        : 0;

    return { ok: true, promotedCount };
  } catch {
    return { ok: false, promotedCount: 0 };
  }
};

export default promoteAllProjectKnowledgeCandidatesFromCloud;
