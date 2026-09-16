import { parseLocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";
import type { LocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";
import { resolveAgentWitchWakeBaseUrlForPort } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrlForPort";

export const fetchLocalAgentWitchIdentityAtWakePort = async (
  wakePort: number,
): Promise<LocalAgentWitchIdentity | null> => {
  try {
    const response = await fetch(
      `${resolveAgentWitchWakeBaseUrlForPort(wakePort)}/identity`,
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
