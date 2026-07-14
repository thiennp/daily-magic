"use client";

import AgentDispatchPolicyPanel from "@/features/dispatch/AgentDispatchPolicyPanel";
import HarnessWorkspace from "@/features/harness/HarnessWorkspace";
import { useAgentWitchHarnessSocket } from "@/features/harness/hooks/useAgentWitchHarnessSocket";
import HomeSetupNextSteps from "@/features/home/HomeSetupNextSteps";

export default function HomeSetupSectionContent() {
  const harnessSocket = useAgentWitchHarnessSocket();

  return (
    <div className="mt-6 space-y-6">
      <HomeSetupNextSteps />
      <HarnessWorkspace harnessSocket={harnessSocket} />
      <AgentDispatchPolicyPanel />
    </div>
  );
}
