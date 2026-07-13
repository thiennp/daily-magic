"use client";

import HarnessManagerPanel from "@/features/harness/HarnessManagerPanel";
import HarnessSharingPanel from "@/features/harness/HarnessSharingPanel";
import PairedDevicesPanel from "@/features/harness/PairedDevicesPanel";
import type { UseAgentWitchHarnessSocketResult } from "@/features/harness/hooks/useAgentWitchHarnessSocket";

interface HarnessWorkspaceProps {
  readonly harnessSocket: UseAgentWitchHarnessSocketResult;
}

export default function HarnessWorkspace({
  harnessSocket,
}: HarnessWorkspaceProps) {
  return (
    <>
      <PairedDevicesPanel key={harnessSocket.pairingStatus} />
      <HarnessSharingPanel />
      <HarnessManagerPanel harnessSocket={harnessSocket} />
    </>
  );
}
