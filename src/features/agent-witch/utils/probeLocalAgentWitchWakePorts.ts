import { collectUniqueWakePorts } from "@/features/agent-witch/utils/collectUniqueWakePorts";
import { fetchLocalAgentWitchIdentityAtWakePort } from "@/features/agent-witch/utils/fetchLocalAgentWitchIdentityAtWakePort";
import type { LocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";
import { resolveAgentWitchWakePortForPage } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrl";

export const buildAllWakePortsForPage = (
  extraWakePorts: readonly number[],
): readonly number[] =>
  collectUniqueWakePorts([
    resolveAgentWitchWakePortForPage(),
    ...extraWakePorts,
  ]);

export const probeLocalAgentWitchWakePorts = async (input: {
  readonly portsToProbe: readonly number[];
  readonly onPortAttempted: (wakePort: number) => void;
}): Promise<LocalAgentWitchIdentity | null> => {
  for (const wakePort of input.portsToProbe) {
    input.onPortAttempted(wakePort);
    const identity = await fetchLocalAgentWitchIdentityAtWakePort(wakePort);
    if (identity !== null) {
      return identity;
    }
  }

  return null;
};
