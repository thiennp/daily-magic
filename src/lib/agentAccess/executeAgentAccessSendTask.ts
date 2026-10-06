import { isNonEmptyString, isType, isUndefinedOr } from "guardz";

import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { dispatchClaudeRunForDashboardUser } from "@/lib/dispatch/dispatchWriterRunForDashboardUser";
import { parseAgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";

import { AGENT_ACCESS_PROMPT_MAX_LENGTH } from "@/lib/agentAccess/agentAccess.constant";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

const sendTaskArgs = isType<{
  readonly prompt: string;
  readonly targetDeviceId?: string;
}>({
  prompt: isNonEmptyString,
  targetDeviceId: isUndefinedOr(isNonEmptyString),
});

export const executeAgentAccessSendTask = async (
  actor: AgentAccessActor,
  args: unknown,
): Promise<AgentAccessToolCallResult> => {
  if (
    !sendTaskArgs(args) ||
    args.prompt.length > AGENT_ACCESS_PROMPT_MAX_LENGTH
  ) {
    return agentAccessTextResult(
      { ok: false, error: "prompt is required.", code: "invalid_arguments" },
      true,
    );
  }

  const parsed = parseAgentRunDispatchBody({
    prompt: args.prompt,
    ...(args.targetDeviceId !== undefined
      ? { targetDeviceId: args.targetDeviceId }
      : {}),
  });

  if (parsed === null) {
    return agentAccessTextResult(
      { ok: false, error: "prompt is required.", code: "invalid_arguments" },
      true,
    );
  }

  const result = await dispatchClaudeRunForDashboardUser({
    runtime: getAgentWitchHub(),
    requesterUserId: actor.id,
    requesterEmail: actor.email,
    body: parsed,
  });

  if (!result.ok) {
    const errorMessage = result.message.payload?.errorMessage;

    return agentAccessTextResult(
      {
        ok: false,
        error:
          typeof errorMessage === "string"
            ? errorMessage
            : "Task was not started.",
        code: "dispatch_failed",
      },
      true,
    );
  }

  return agentAccessTextResult({ ok: true, run: result.run });
};
