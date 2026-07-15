"use client";

import HomeSetupDivider from "@/features/home/HomeSetupDivider";
import HarnessManagerPanel from "@/features/harness/HarnessManagerPanel";
import HarnessSharingPanel from "@/features/harness/HarnessSharingPanel";
import type { UseAgentWitchHarnessSocketResult } from "@/features/harness/hooks/useAgentWitchHarnessSocket";

interface HarnessWorkspaceProps {
  readonly harnessSocket: UseAgentWitchHarnessSocketResult;
}

export default function HarnessWorkspace({
  harnessSocket,
}: HarnessWorkspaceProps) {
  return (
    <>
      <HarnessSharingPanel />
      <HomeSetupDivider />
      <HarnessManagerPanel harnessSocket={harnessSocket} />
    </>
  );
}
