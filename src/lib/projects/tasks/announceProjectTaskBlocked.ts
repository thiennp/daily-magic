import { orchestrateProjectMessengerBotReply } from "@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerBotReply";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

/** Why the task is blocked, from the tool args (null when missing / blank). */
export const readBlockedReason = (args: unknown): string | null => {
  const raw =
    args !== null && typeof args === "object"
      ? (args as Record<string, unknown>).blockedReason
      : undefined;
  return typeof raw === "string" && raw.trim().length > 0 ? raw.trim() : null;
};

/** "Blocked: {title} — {reason}", clipped to the chat summary cap. */
export const composeBlockedChatSummary = (
  title: string,
  reason: string,
): string => {
  const text = `Blocked: ${title} — ${reason}`;
  return text.length <= PROJECT_MESSAGE_SUMMARY_MAX_CHARS
    ? text
    : `${text.slice(0, PROJECT_MESSAGE_SUMMARY_MAX_CHARS - 1).trimEnd()}…`;
};

/**
 * A bot that blocks a task tells the project chat (task.blocked bubble), so
 * the owner sees it without opening the Tasks tab. Best effort: a failed post
 * never undoes the status change.
 */
export const announceProjectTaskBlocked = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly title: string;
  readonly reason: string;
}): Promise<void> => {
  try {
    await orchestrateProjectMessengerBotReply({
      actorUserId: input.actorUserId,
      args: {
        projectId: input.projectId,
        kind: "task.blocked",
        summary: composeBlockedChatSummary(input.title, input.reason),
      },
    });
  } catch (error: unknown) {
    console.error("blocked task chat post failed", {
      error: error instanceof Error ? error.message : "post_failed",
    });
  }
};
