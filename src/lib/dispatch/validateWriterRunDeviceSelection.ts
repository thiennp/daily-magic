import { isAgentWitchDeviceOrSuccessorOwnedByUser } from "@/lib/agentWitch/isAgentWitchDeviceOrSuccessorOwnedByUser";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import type { ClaudeRunAgentResolution } from "@/lib/dispatch/resolveWriterRunAgentClient";

export const validateWriterRunDeviceSelection = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly senderUserId: string;
  readonly executorUserId: string;
  readonly targetDeviceId: string | undefined;
  readonly requestId?: string;
}): Promise<ClaudeRunAgentResolution | undefined> => {
  // The computer must belong to whoever will run the task: you, or the colleague you target.
  if (
    input.targetDeviceId !== undefined &&
    !(await isAgentWitchDeviceOrSuccessorOwnedByUser(
      input.targetDeviceId,
      input.executorUserId,
    ))
  ) {
    return {
      ok: false,
      error: buildDispatchError(
        input.executorUserId === input.senderUserId
          ? "The selected computer is not connected to your account."
          : "The selected computer does not belong to that colleague.",
        input.requestId,
      ),
    };
  }

  return undefined;
};
