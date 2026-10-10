import type { useAgentWitchSocket } from "@/features/agent/hooks/public-api/types";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/public-api/types";
import { isLiveAgentLiveTerminalStatus } from "@/features/agent/utils/isLiveAgentLiveTerminalStatus";
import { resolveAgentSessionTargets } from "@/features/agent/utils/resolveAgentSessionTargets";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/** ed42d8ce: the panel's computer / coding tool, locked only while live. */
export const resolveWsTestPanelSessionTargets = (input: {
  readonly socket: ReturnType<typeof useAgentWitchSocket>;
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly writerAgent: HarnessWriterAgent;
}) => {
  const isSessionLive = isLiveAgentLiveTerminalStatus(
    input.socket.liveTerminalStatus,
  );
  return {
    isSessionLive,
    sessionTargets: resolveAgentSessionTargets({
      sessionWriterAgent: input.socket.sessionWriterAgent,
      writerAgent: input.writerAgent,
      sessionDeviceId: input.socket.sessionDeviceId,
      selectedDeviceId: input.composer.selectedDeviceId,
      availableDeviceIds: input.composer.macDevices.map((device) => device.id),
      isSessionLive,
    }),
  };
};
