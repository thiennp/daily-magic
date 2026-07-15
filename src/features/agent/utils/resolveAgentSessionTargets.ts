import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const resolveAgentSessionTargets = (input: {
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly writerAgent: HarnessWriterAgent;
  readonly sessionDeviceId: string | null;
  readonly selectedDeviceId: string;
}): {
  readonly activeWriterAgent: HarnessWriterAgent;
  readonly activeDeviceId: string;
  readonly isWriterAgentLocked: boolean;
  readonly isMacDeviceLocked: boolean;
} => {
  const activeDeviceId = input.sessionDeviceId ?? input.selectedDeviceId;

  return {
    activeWriterAgent: input.sessionWriterAgent ?? input.writerAgent,
    activeDeviceId,
    isWriterAgentLocked: input.sessionWriterAgent !== null,
    isMacDeviceLocked: input.sessionDeviceId !== null,
  };
};
