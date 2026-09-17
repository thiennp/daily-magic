import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "../agentWitchDeviceAuth.constant";
import type { AgentWitchCloudApiConfig } from "../agentWitchCloudApi";

const syncProjectKnowledgeCandidateToCloud = async (
  config: AgentWitchCloudApiConfig,
  projectId: string,
  input: {
    readonly sourceRunId?: string;
    readonly lesson: string;
  },
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${config.appOrigin}/api/agent-witch/projects/${encodeURIComponent(projectId)}/knowledge`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [AGENT_WITCH_PAIRING_TOKEN_HEADER]: config.pairingToken,
        },
        body: JSON.stringify({
          sourceRunId: input.sourceRunId,
          lesson: input.lesson,
        }),
        signal: AbortSignal.timeout(15_000),
      },
    );

    if (!response.ok) {
      return false;
    }

    const body: unknown = await response.json();
    return (
      typeof body === "object" &&
      body !== null &&
      (body as { ok?: unknown }).ok === true
    );
  } catch {
    return false;
  }
};

export default syncProjectKnowledgeCandidateToCloud;
