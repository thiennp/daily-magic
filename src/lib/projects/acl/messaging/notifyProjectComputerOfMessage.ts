import { deliverOrQueueAgentWitchDispatchMessage } from "@/lib/agentWitch/deliverOrQueueAgentWitchDispatchMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { applyProjectComputerHistoryEvent } from "@/lib/projects/acl/messaging/applyProjectComputerHistoryEvent";
import { PROJECT_COMPUTER_HISTORY_NOTIFY_KEY_PREFIX } from "@/lib/projects/acl/messaging/projectComputerHistory.constants";
import { PROJECT_COMPUTER_HISTORY_ON_STATES } from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";
import type { ProjectMessageLogEntry } from "@/lib/projects/acl/messaging/projectMessageLog.types";
import { readProjectComputerHistoryState } from "@/lib/projects/acl/messaging/readProjectComputerHistoryState";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type NotifyProjectComputerOfMessageResult =
  "skipped" | "delivered" | "queued" | "unavailable";

/**
 * History on: push the stored message to the owner's project computer over
 * the existing Mac path (live hub socket, else the durable dispatch outbox).
 * Offline in on_ready moves to degraded; the computer catches up from the
 * backlog. Best effort: never throws into the message insert.
 * Callers may pass idempotencyKey (e.g. overdue unsaved wake) to avoid
 * collapsing with the original per-message notify.
 */
export const notifyProjectComputerOfMessage = async (input: {
  readonly projectId: string;
  readonly message: ProjectMessageLogEntry;
  readonly idempotencyKey?: string;
}): Promise<NotifyProjectComputerOfMessageResult> => {
  try {
    const state = await readProjectComputerHistoryState(input.projectId);
    if (!PROJECT_COMPUTER_HISTORY_ON_STATES.includes(state)) {
      return "skipped";
    }
    const project = await getUserProjectById(input.projectId);
    if (project === null || project.deviceId === null) {
      return "skipped";
    }
    const result = await deliverOrQueueAgentWitchDispatchMessage({
      userId: project.ownerUserId,
      deviceId: project.deviceId,
      idempotencyKey:
        input.idempotencyKey ??
        `${PROJECT_COMPUTER_HISTORY_NOTIFY_KEY_PREFIX}${input.message.messageId}`,
      message: {
        type: AGENT_WITCH_MESSAGE_TYPES.PROJECT_MESSAGE_HISTORY,
        payload: { projectId: input.projectId, message: input.message },
      },
    });
    if (result.kind === "delivered" || result.kind === "queued") {
      return result.kind;
    }
    if (result.kind === "offline" && state === "on_ready") {
      await applyProjectComputerHistoryEvent({
        projectId: input.projectId,
        event: "computer_offline",
      });
    }
    return "unavailable";
  } catch (error: unknown) {
    console.error("project computer history notify failed", {
      messageId: input.message.messageId,
      error: error instanceof Error ? error.message : "notify_failed",
    });
    return "unavailable";
  }
};
