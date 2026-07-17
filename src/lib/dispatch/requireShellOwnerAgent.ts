import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { unauthorizedAgentOnlyError } from "@/lib/agentWitch/agentWitchHubClientOperations";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { getShellSession } from "@/lib/dispatch/shellSessionRegistry";
import type ShellSessionRecord from "@/lib/dispatch/types/ShellSessionRecord.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export type RequireShellOwnerAgentResult =
  | { readonly ok: true; readonly session: ShellSessionRecord }
  | { readonly ok: false; readonly error: AgentWitchMessage };

export const requireShellOwnerAgent = (
  sender: AgentWitchHubClient | undefined,
  shellSessionId: string,
  requestId: string | undefined,
): RequireShellOwnerAgentResult => {
  if (sender?.role !== "agent" || !isNonEmptyString(sender.userId)) {
    return { ok: false, error: unauthorizedAgentOnlyError(requestId) };
  }
  const session = getShellSession(shellSessionId);
  if (session === undefined || session.ownerUserId !== sender.userId) {
    return {
      ok: false,
      error: buildDispatchError("Unknown shell session.", requestId),
    };
  }
  if (
    session.deviceId !== null &&
    sender.deviceId !== undefined &&
    sender.deviceId !== session.deviceId
  ) {
    return {
      ok: false,
      error: buildDispatchError(
        "Agent device does not match the shell session.",
        requestId,
      ),
    };
  }
  return { ok: true, session };
};
