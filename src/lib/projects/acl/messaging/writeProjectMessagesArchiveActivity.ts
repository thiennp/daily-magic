import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";

/**
 * One Access log row per Clear all / Restore (count only, no ids or bodies).
 * Owner-only actions, so the actor is always the owner. Never throws.
 */
export const writeProjectMessagesArchiveActivity = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly type: "messages.archived" | "messages.restored";
  readonly count: number;
}): Promise<void> => {
  await writeProjectActivityEvent({
    projectId: input.projectId,
    type: input.type,
    actor: { kind: "owner", userId: input.actorUserId },
    detail: { count: input.count },
  });
};
