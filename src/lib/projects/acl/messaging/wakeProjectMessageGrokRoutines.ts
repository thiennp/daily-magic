import {
  wakeProjectGrokRoutineWebhooks,
  type ProjectGrokRoutineWakeResult,
} from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

export type WakeProjectMessageGrokRoutinesInput = {
  readonly projectId: string;
  readonly messageId: string;
  readonly summary: string;
  readonly senderMembershipId: string | null;
  readonly senderProjectDisplayName?: string | null;
  readonly recipientMembershipIds: readonly string[];
};

/**
 * Grok routine wake step for a stored project message.
 * Await it after the message and delivery rows exist.
 * Never throws: a failed wake is logged and yields no results.
 */
export const wakeProjectMessageGrokRoutines = async (
  input: WakeProjectMessageGrokRoutinesInput,
): Promise<readonly ProjectGrokRoutineWakeResult[]> => {
  try {
    return await wakeProjectGrokRoutineWebhooks({
      projectId: input.projectId,
      messageId: input.messageId,
      summary: input.summary,
      fromMembershipId: input.senderMembershipId,
      fromProjectDisplayName:
        input.senderMembershipId === null
          ? "Owner"
          : (input.senderProjectDisplayName ?? null),
      recipientMembershipIds: input.recipientMembershipIds,
    });
  } catch (error: unknown) {
    console.error("project grok routine webhook wake failed", {
      messageId: input.messageId,
      error: error instanceof Error ? error.message : "wake_failed",
    });
    return [];
  }
};
