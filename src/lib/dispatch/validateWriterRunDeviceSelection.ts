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
  if (
    input.targetDeviceId !== undefined &&
    input.executorUserId === input.senderUserId &&
    !(await isAgentWitchDeviceOrSuccessorOwnedByUser(
      input.targetDeviceId,
      input.senderUserId,
    ))
  ) {
    return {
      ok: false,
      error: buildDispatchError(
        "The selected Mac is not connected to your account.",
        input.requestId,
      ),
    };
  }

  return undefined;
};
