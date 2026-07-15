"use client";

import AgentDispatchPolicyPanel from "@/features/dispatch/AgentDispatchPolicyPanel";
import { HomeSetupEmbeddedProvider } from "@/features/home/HomeSetupEmbeddedContext";
import HarnessWorkspace from "@/features/harness/HarnessWorkspace";
import { useAgentWitchHarnessSocket } from "@/features/harness/hooks/useAgentWitchHarnessSocket";

export default function HomeSetupSectionContent() {
  const harnessSocket = useAgentWitchHarnessSocket();

  return (
    <HomeSetupEmbeddedProvider>
      <div className="mt-6 space-y-6">
        <HarnessWorkspace harnessSocket={harnessSocket} />
        <AgentDispatchPolicyPanel />
      </div>
    </HomeSetupEmbeddedProvider>
  );
}
