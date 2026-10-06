import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import {
  PROJECT_MESSAGE_KIND_COMPOSER_RECIPIENT_STICKY_CLEARED,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
  PROJECT_MESSAGE_SYSTEM_SENDER_DISPLAY_NAME,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * Lightweight system notice to the sticky actor: their locked recipient left.
 * recipients=[] → no bot wakes; inbox picks up via to_user_id.
 */
export const notifyComposerRecipientStickyCleared = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly leftMembershipId: string;
  readonly leftDisplayName: string | null;
}): Promise<void> => {
  void input.leftMembershipId;
  const label = input.leftDisplayName?.trim() || "that assistant";
  const summary = `Recipient sticky cleared: ${label} left the project.`.slice(
    0,
    PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
  );
  await insertProjectMessageWithDeliveries({
    projectId: input.projectId,
    senderMembershipId: null,
    senderProjectDisplayName: PROJECT_MESSAGE_SYSTEM_SENDER_DISPLAY_NAME,
    senderUserId: input.actorUserId,
    toMembershipId: null,
    toUserId: input.actorUserId,
    toTeamLabel: null,
    toProjectDisplayName: null,
    kind: PROJECT_MESSAGE_KIND_COMPOSER_RECIPIENT_STICKY_CLEARED,
    summary,
    refsJson: "{}",
    recipients: [],
  });
};
