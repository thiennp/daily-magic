import { collectUniqueWakePorts } from "@/features/agent-witch/utils/collectUniqueWakePorts";
import { fetchLocalAgentWitchIdentityAtWakePort } from "@/features/agent-witch/utils/fetchLocalAgentWitchIdentityAtWakePort";
import {
  fetchLocalAgentWitchIdentityViaAppServer,
  shouldUseAppServerWakeIdentityProbe,
} from "@/features/agent-witch/utils/fetchLocalAgentWitchIdentityViaAppServer";
import type { LocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";
import {
  AGENT_WITCH_LOCAL_WAKE_PORT,
  AGENT_WITCH_PROD_WAKE_PORT,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";
import { resolveAgentWitchWakePortForPage } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrl";
import detectMobileClient from "@/lib/mobile/detectMobileClient";

export const buildAllWakePortsForPage = (
  extraWakePorts: readonly number[],
): readonly number[] =>
  collectUniqueWakePorts([
    resolveAgentWitchWakePortForPage(),
    AGENT_WITCH_PROD_WAKE_PORT,
    AGENT_WITCH_LOCAL_WAKE_PORT,
    ...extraWakePorts,
  ]);

export const probeLocalAgentWitchWakePorts = async (input: {
  readonly portsToProbe: readonly number[];
  readonly onPortAttempted: (wakePort: number) => void;
}): Promise<LocalAgentWitchIdentity | null> => {
  // Mobile browsers never talk to Agent Witch Local (no loopback probes).
  if (detectMobileClient()) {
    return null;
  }

  if (shouldUseAppServerWakeIdentityProbe()) {
    input.portsToProbe.forEach((wakePort) => {
      input.onPortAttempted(wakePort);
    });
    return fetchLocalAgentWitchIdentityViaAppServer(input.portsToProbe);
  }

  for (const wakePort of input.portsToProbe) {
    input.onPortAttempted(wakePort);
    const identity = await fetchLocalAgentWitchIdentityAtWakePort(wakePort);
    if (identity !== null) {
      return identity;
    }
  }

  return null;
};
