import { resolveDispatchTargetAgentClient } from "@/lib/agentWitch/resolveDispatchTargetAgentClient";
import type { DispatchTargetAgentClient } from "@/lib/agentWitch/resolveDispatchTargetAgentClient";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";

export const resolveLiveWriterAgentForRun = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly executorUserId: string;
  readonly targetDeviceId: string | undefined;
}): Promise<DispatchTargetAgentClient | undefined> =>
  resolveDispatchTargetAgentClient({
    runtime: input.runtime,
    userId: input.executorUserId,
    deviceId: input.targetDeviceId,
  });
