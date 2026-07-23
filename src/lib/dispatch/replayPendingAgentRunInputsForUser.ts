import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { dispatchAgentRunInputRegistry } from "@/lib/dispatch/dispatchAgentRunInputRegistry";
import { notifyDashboardUser } from "@/lib/dispatch/dispatchWriterRunToAgent";

export function replayPendingAgentRunInputsForUser(
  hub: AgentWitchHub,
  userId: string,
): void {
  const pendingInputs =
    dispatchAgentRunInputRegistry.listForParticipant(userId);

  for (const pending of pendingInputs) {
    const inputMessage = {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_REQUIRED,
      payload: {
        agentRunId: pending.agentRunId,
        question: pending.question,
        partialOutput: pending.partialOutput,
      },
      requestId: pending.requestId,
    };

    notifyDashboardUser(hub, pending.requesterUserId, inputMessage);
    if (pending.executorUserId !== pending.requesterUserId) {
      notifyDashboardUser(hub, pending.executorUserId, inputMessage);
    }
  }
}
