"use client";

import AgentPairingPanel from "@/features/harness/AgentPairingPanel";
import HarnessManagerPanel from "@/features/harness/HarnessManagerPanel";
import HarnessSharingPanel from "@/features/harness/HarnessSharingPanel";
import PairedDevicesPanel from "@/features/harness/PairedDevicesPanel";
import { useAgentWitchHarnessSocket } from "@/features/harness/hooks/useAgentWitchHarnessSocket";

export default function HarnessWorkspace() {
  const harnessSocket = useAgentWitchHarnessSocket();

  return (
    <>
      <AgentPairingPanel harnessSocket={harnessSocket} />
      <PairedDevicesPanel key={harnessSocket.pairingStatus} />
      <HarnessSharingPanel />
      <HarnessManagerPanel harnessSocket={harnessSocket} />
    </>
  );
}
