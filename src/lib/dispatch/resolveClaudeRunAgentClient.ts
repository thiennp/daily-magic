import isAgentWitchDeviceOwnedByUser from "@/lib/agentWitch/isAgentWitchDeviceOwnedByUser";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";

export const resolveTargetDeviceId = (
  payload: Readonly<Record<string, unknown>>,
): string | undefined =>
  typeof payload.targetDeviceId === "string" &&
  payload.targetDeviceId.length > 0
    ? payload.targetDeviceId
    : undefined;

export const resolveClaudeRunAgentClient = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly senderUserId: string;
  readonly executorUserId: string;
  readonly targetDeviceId: string | undefined;
  readonly requestId?: string;
}): Promise<
  | { readonly ok: true; readonly agentClient: AgentWitchHubClient }
  | { readonly ok: false; readonly error: ReturnType<typeof buildDispatchError> }
> => {
  if (
    input.targetDeviceId !== undefined &&
    input.executorUserId === input.senderUserId &&
    !(await isAgentWitchDeviceOwnedByUser(
      input.targetDeviceId,
      input.senderUserId,
    ))
  ) {
    return {
      ok: false,
      error: buildDispatchError(
        "The selected Mac is not paired to your account.",
        input.requestId,
      ),
    };
  }

  const agentClient = input.runtime.findAgentClientForUser(
    input.executorUserId,
    input.targetDeviceId,
  );

  if (agentClient === undefined) {
    return {
      ok: false,
      error: buildDispatchError(
        input.executorUserId === input.senderUserId
          ? input.targetDeviceId !== undefined
            ? "The selected Mac is not online right now."
            : "No paired local agent is connected for your account."
          : "The target user has no paired local agent connected.",
        input.requestId,
      ),
    };
  }

  return { ok: true, agentClient };
};
