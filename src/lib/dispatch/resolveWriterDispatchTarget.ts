import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import isClaudeDispatchPayload from "@/lib/agentWitch/isWriterDispatchPayload";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { usersShareGroup } from "@/lib/dispatch/usersShareGroup";

export const resolveClaudeDispatchTarget = async (
  sender: AgentWitchHubClient,
  payload: Readonly<Record<string, unknown>> & { readonly prompt: string },
): Promise<
  | {
      readonly ok: true;
      readonly executorUserId: string;
      readonly groupId: string | null;
    }
  | {
      readonly ok: false;
      readonly error: ReturnType<typeof buildDispatchError>;
    }
> => {
  const executorUserId =
    typeof payload.targetUserId === "string" && payload.targetUserId.length > 0
      ? payload.targetUserId
      : (sender.userId ?? "");

  const requestedGroupId =
    typeof payload.groupId === "string" && payload.groupId.length > 0
      ? payload.groupId
      : null;

  if (!isNonEmptyString(sender.userId)) {
    return {
      ok: false,
      error: buildDispatchError(
        "Only authenticated dashboard clients can dispatch Claude commands.",
      ),
    };
  }

  const membership =
    executorUserId !== sender.userId
      ? await usersShareGroup(sender.userId, executorUserId, requestedGroupId)
      : { shared: true, groupId: requestedGroupId };

  if (!membership.shared) {
    return {
      ok: false,
      error: buildDispatchError(
        "You can only dispatch to colleagues in a shared group.",
      ),
    };
  }

  return {
    ok: true,
    executorUserId,
    groupId: membership.groupId,
  };
};

export const validateClaudeDispatchPayload = (
  payload: Readonly<Record<string, unknown>> | undefined,
  requestId?: string,
):
  | {
      readonly ok: true;
      readonly payload: { readonly prompt: string } & Readonly<
        Record<string, unknown>
      >;
    }
  | {
      readonly ok: false;
      readonly error: ReturnType<typeof buildDispatchError>;
    } => {
  if (!isClaudeDispatchPayload(payload)) {
    return {
      ok: false,
      error: buildDispatchError(
        "command.claude.run requires payload.prompt.",
        requestId,
      ),
    };
  }

  return { ok: true, payload };
};
