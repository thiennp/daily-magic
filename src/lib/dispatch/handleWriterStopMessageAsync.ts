import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { deliverAgentRunStop } from "@/lib/dispatch/deliverAgentRunStop";
import { isAgentRunStopAllowed } from "@/lib/dispatch/isAgentRunStopAllowed";
import { requestAgentRunStop } from "@/lib/dispatch/requestAgentRunStop";

const NOT_ACTIVE = "This run is not active anymore.";

const errorReply = (
  requestId: string | undefined,
  errorMessage: string,
): AgentWitchMessage => ({
  type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
  payload: { errorMessage },
  requestId,
});

/**
 * S0-7 per-run stop. Device owner, requester or project owner may stop.
 * The request is stored first (`stop_requested_at`, CAS on active status), so
 * it works from any instance: socket here → sent now; socket on another
 * instance → hub relay; otherwise applied at the computer's next heartbeat.
 */
export const handleWriterStopMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  const { requestId } = message;
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return errorReply(
      requestId,
      "Only authenticated dashboard clients can stop agent runs.",
    );
  }

  const agentRunId =
    typeof message.payload?.agentRunId === "string"
      ? message.payload.agentRunId
      : "";
  if (agentRunId.length === 0) {
    return errorReply(
      requestId,
      "command.claude.stop requires payload.agentRunId.",
    );
  }

  const run = await getAgentRunById(agentRunId);
  if (run === null) {
    return errorReply(requestId, "Run not found.");
  }
  if (!(await isAgentRunStopAllowed(run, sender.userId))) {
    return errorReply(requestId, "You are not allowed to stop this run.");
  }
  if (
    run.status !== AgentRunStatus.RUNNING &&
    run.status !== AgentRunStatus.PENDING_APPROVAL
  ) {
    return errorReply(requestId, NOT_ACTIVE);
  }

  const stop = await requestAgentRunStop({
    runId: agentRunId,
    requestedByUserId: sender.userId,
  });
  if (!stop.ok) {
    return errorReply(requestId, NOT_ACTIVE);
  }

  const delivery = stop.endedBeforeStart
    ? "ended"
    : await deliverAgentRunStop({
        runtime,
        run: stop.run,
        requestedByUserId: sender.userId,
        requestId,
      });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      agentRunId,
      stopped: delivery === "sent" || delivery === "ended",
      stopRequested: true,
      delivery,
    },
    requestId,
  };
};
