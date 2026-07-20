import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export const validateSessionContinuationRequiresTargetDevice = (input: {
  readonly body: AgentRunDispatchBody;
  readonly requestId?: string;
}): AgentWitchMessage | null => {
  if (input.body.sessionContinuation !== true) {
    return null;
  }

  if (
    typeof input.body.targetDeviceId === "string" &&
    input.body.targetDeviceId.length > 0
  ) {
    return null;
  }

  return buildDispatchError(
    "Continue requires the same Mac that ran the original task. Select it from job history and try again.",
    input.requestId,
  );
};
