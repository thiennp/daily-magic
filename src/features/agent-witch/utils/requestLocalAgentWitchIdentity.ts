import { parseLocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";
import type { LocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";
import { resolveAgentWitchWakeBaseUrlForPage } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrl";

export type { LocalAgentWitchIdentity };

export const requestLocalAgentWitchIdentity =
  async (): Promise<LocalAgentWitchIdentity | null> => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const response = await fetch(
        `${resolveAgentWitchWakeBaseUrlForPage()}/identity`,
        {
          method: "GET",
          mode: "cors",
          signal: AbortSignal.timeout(2_000),
        },
      );

      if (!response.ok) {
        return null;
      }

      const payload: unknown = await response.json();
      return parseLocalAgentWitchIdentity(payload);
    } catch {
      return null;
    }
  };
