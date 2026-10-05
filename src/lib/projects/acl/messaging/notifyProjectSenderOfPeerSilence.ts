import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import {
  PROJECT_MESSAGE_KIND_PEER_SILENT,
  PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
  PROJECT_MESSAGE_SYSTEM_SENDER_DISPLAY_NAME,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

const silenceSummary = (input: {
  readonly event: "timeout_5m" | "timeout_10m";
  readonly peerName: string;
  readonly messageId: string;
}): string =>
  (input.event === "timeout_5m"
    ? `No activity from ${input.peerName} for 5 min on ${input.messageId}. Tell the user and ask ${input.peerName} once.`
    : `No activity from ${input.peerName} for 10 min on ${input.messageId}. Delivery blocked. Tell the user and stop.`
  ).slice(0, PROJECT_MESSAGE_SUMMARY_MAX_CHARS);

/**
 * System notice to sender A about silent peer B. No sender membership, so
 * the inbox shows the system sender (by kind), never "Owner" or the peer.
 * sender_user_id is A's own user (the column is NOT NULL).
 */
export const notifyProjectSenderOfPeerSilence = async (input: {
  readonly event: "timeout_5m" | "timeout_10m";
  readonly projectId: string;
  readonly messageId: string;
  readonly senderMembershipId: string;
  readonly senderUserId: string;
  readonly senderDisplayName: string | null;
  readonly peerDisplayName: string | null;
}): Promise<void> => {
  await insertProjectMessageWithDeliveries({
    projectId: input.projectId,
    senderMembershipId: null,
    senderProjectDisplayName: PROJECT_MESSAGE_SYSTEM_SENDER_DISPLAY_NAME,
    senderUserId: input.senderUserId,
    toMembershipId: input.senderMembershipId,
    toUserId: input.senderUserId,
    toTeamLabel: null,
    toProjectDisplayName: input.senderDisplayName,
    kind:
      input.event === "timeout_5m"
        ? PROJECT_MESSAGE_KIND_PEER_SILENT
        : PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
    summary: silenceSummary({
      event: input.event,
      peerName: input.peerDisplayName ?? "peer",
      messageId: input.messageId,
    }),
    refsJson: "{}",
    recipients: [{ id: input.senderMembershipId, user_id: input.senderUserId }],
  });
};
