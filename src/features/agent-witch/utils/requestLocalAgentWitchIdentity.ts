import { collectUniqueWakePorts } from "@/features/agent-witch/utils/collectUniqueWakePorts";
import { fetchLocalAgentWitchIdentityAtWakePort } from "@/features/agent-witch/utils/fetchLocalAgentWitchIdentityAtWakePort";
import type { LocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";
import { resolveAgentWitchWakePortForPage } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrl";

export type { LocalAgentWitchIdentity };

export const requestLocalAgentWitchIdentity = async (input?: {
  readonly extraWakePorts?: readonly (number | null | undefined)[];
}): Promise<LocalAgentWitchIdentity | null> => {
  if (typeof window === "undefined") {
    return null;
  }

  const portsToTry = collectUniqueWakePorts([
    resolveAgentWitchWakePortForPage(),
    ...(input?.extraWakePorts ?? []),
  ]);

  for (const wakePort of portsToTry) {
    const identity = await fetchLocalAgentWitchIdentityAtWakePort(wakePort);
    if (identity !== null) {
      return identity;
    }
  }

  return null;
};
