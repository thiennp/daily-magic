import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { dispatchClaudeRunForDashboardUser } from "@/lib/dispatch/dispatchWriterRunForDashboardUser";
import { parseAgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import {
  resolveClaudeDispatchTarget,
  validateClaudeDispatchPayload,
} from "@/lib/dispatch/resolveWriterDispatchTarget";

export const handleClaudeRunMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return buildDispatchError(
      "Only authenticated dashboard clients can dispatch Claude commands.",
      message.requestId,
    );
  }

  const validatedPayload = validateClaudeDispatchPayload(
    message.payload,
    message.requestId,
  );
  if (!validatedPayload.ok) {
    return validatedPayload.error;
  }

  const target = await resolveClaudeDispatchTarget(
    sender,
    validatedPayload.payload,
  );
  if (!target.ok) {
    return target.error;
  }

  const body = parseAgentRunDispatchBody(validatedPayload.payload);
  if (body === null) {
    return buildDispatchError(
      "command.claude.run requires payload.prompt.",
      message.requestId,
    );
  }

  const result = await dispatchClaudeRunForDashboardUser({
    runtime,
    requesterUserId: sender.userId,
    requesterEmail: sender.email,
    body,
    requestId: message.requestId,
  });

  return result.message;
};
