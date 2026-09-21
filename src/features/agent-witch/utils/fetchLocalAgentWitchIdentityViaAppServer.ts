import { parseLocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";
import type { LocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";
import { shouldFetchWakeIdentityViaAppServer } from "@/lib/agentWitch/shouldFetchWakeIdentityViaAppServer";

export const fetchLocalAgentWitchIdentityViaAppServer = async (
  wakePorts: readonly number[],
): Promise<LocalAgentWitchIdentity | null> => {
  if (wakePorts.length === 0) {
    return null;
  }

  try {
    const response = await fetch(
      `/api/agent-witch/local-identity?wakePorts=${encodeURIComponent(wakePorts.join(","))}`,
      {
        method: "GET",
        signal: AbortSignal.timeout(4_000),
      },
    );

    if (response.status === 503) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const payload: unknown = await response.json();
    return parseLocalAgentWitchIdentity(payload);
  } catch {
    return null;
  }
};

export const shouldUseAppServerWakeIdentityProbe = (): boolean =>
  shouldFetchWakeIdentityViaAppServer();
