import { ensureProjectComposerRecipientStickySchema } from "@/lib/projects/acl/composer/ensureProjectComposerRecipientStickySchema";
import { notifyComposerRecipientStickyCleared } from "@/lib/projects/acl/composer/notifyComposerRecipientStickyCleared";
import { clearProjectComposerRecipientStickyForMembership } from "@/lib/projects/acl/composer/projectComposerRecipientStickyRepo";

/**
 * When a membership leaves/is removed: clear stickies pointing at it and
 * emit a system notice to each affected actor (inbox via to_user_id).
 */
export const clearStickyOnMembershipLeave = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly displayName: string | null;
}): Promise<{ readonly clearedActorUserIds: readonly string[] }> => {
  await ensureProjectComposerRecipientStickySchema();
  const clearedActorUserIds =
    await clearProjectComposerRecipientStickyForMembership({
      projectId: input.projectId,
      membershipId: input.membershipId,
    });
  for (const actorUserId of clearedActorUserIds) {
    try {
      await notifyComposerRecipientStickyCleared({
        projectId: input.projectId,
        actorUserId,
        leftMembershipId: input.membershipId,
        leftDisplayName: input.displayName,
      });
    } catch (error) {
      console.error("composer sticky cleared notice failed on leave", {
        projectId: input.projectId,
        membershipId: input.membershipId,
        actorUserId,
        error,
      });
    }
  }
  return { clearedActorUserIds };
};
