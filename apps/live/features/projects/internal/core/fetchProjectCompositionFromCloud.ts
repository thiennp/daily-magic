import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "./agentWitchDeviceAuth.constant";
import type { AgentWitchCloudApiConfig } from "./agentWitchCloudApi";

export type CloudProjectCompositionItem = {
  readonly id: string;
  readonly componentId: string;
  readonly kind: "harness" | "workflow" | "agent";
  readonly name: string;
  readonly versionLabel: string | null;
};

export type CloudProjectComposition = {
  readonly counts: {
    readonly harness: number;
    readonly workflow: number;
    readonly agent: number;
  };
  readonly items: readonly CloudProjectCompositionItem[];
};

const fetchProjectCompositionFromCloud = async (
  config: AgentWitchCloudApiConfig,
  projectId: string,
): Promise<CloudProjectComposition | null> => {
  try {
    const response = await fetch(
      `${config.appOrigin}/api/agent-witch/projects/${encodeURIComponent(projectId)}/composition`,
      {
        method: "GET",
        headers: {
          [AGENT_WITCH_PAIRING_TOKEN_HEADER]: config.pairingToken,
        },
        signal: AbortSignal.timeout(15_000),
      },
    );

    if (!response.ok) {
      return null;
    }

    const body: unknown = await response.json();
    if (
      typeof body !== "object" ||
      body === null ||
      (body as { ok?: unknown }).ok !== true
    ) {
      return null;
    }

    const record = body as {
      counts?: { harness?: number; workflow?: number; agent?: number };
      items?: CloudProjectCompositionItem[];
    };

    return {
      counts: {
        harness: Number(record.counts?.harness ?? 0),
        workflow: Number(record.counts?.workflow ?? 0),
        agent: Number(record.counts?.agent ?? 0),
      },
      items: Array.isArray(record.items) ? record.items : [],
    };
  } catch {
    return null;
  }
};

export default fetchProjectCompositionFromCloud;
