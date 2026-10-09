import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "../agentWitchDeviceAuth.constant";
import type { AgentWitchCloudApiConfig } from "../agentWitchCloudApi";
import redactTextForProjectKnowledge from "./redactTextForProjectKnowledge";

export type SyncProjectKnowledgeCandidateToCloudResult =
  | { readonly ok: true; readonly id: string }
  | { readonly ok: false; readonly httpStatus?: number };

const syncProjectKnowledgeCandidateToCloud = async (
  config: AgentWitchCloudApiConfig,
  projectId: string,
  input: {
    readonly sourceRunId?: string;
    readonly lesson: string;
  },
): Promise<SyncProjectKnowledgeCandidateToCloudResult> => {
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
          // S0-8: never post a secret-shaped lesson to the cloud.
          lesson: redactTextForProjectKnowledge(input.lesson),
        }),
        signal: AbortSignal.timeout(15_000),
      },
    );

    if (!response.ok) {
      return { ok: false, httpStatus: response.status };
    }

    const body: unknown = await response.json();
    if (
      typeof body === "object" &&
      body !== null &&
      (body as { ok?: unknown }).ok === true &&
      typeof (body as { id?: unknown }).id === "string"
    ) {
      return { ok: true, id: (body as { id: string }).id };
    }
    return { ok: false, httpStatus: response.status };
  } catch {
    return { ok: false };
  }
};

export default syncProjectKnowledgeCandidateToCloud;
