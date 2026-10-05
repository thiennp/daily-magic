import { isProjectMessageReadOnlyRole } from "@/lib/projects/acl/messaging/decideProjectMessagePostAccess";
import { hasProjectProcessingReceipt } from "@/lib/projects/acl/messaging/hasProjectProcessingReceipt";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { loadProjectProcessingReceiptMemberships } from "@/lib/projects/acl/messaging/loadProjectProcessingReceiptMemberships";
import {
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

/** Peer → Owner task.processing receipt when the original sender is the Owner. */
export const insertOwnerProjectProcessingReceipt = async (input: {
  readonly projectId: string;
  readonly peer: string;
  readonly summary: string;
}): Promise<void> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return;
  }
  if (
    await hasProjectProcessingReceipt({
      projectId: input.projectId,
      peer: input.peer,
      sender: null,
      ownerUserId: project.ownerUserId,
      summary: input.summary,
    })
  ) {
    return;
  }
  const byId = await loadProjectProcessingReceiptMemberships({
    projectId: input.projectId,
    ids: [input.peer],
  });
  const peer = byId.get(input.peer);
  // Viewers are read-only on messages: never post a receipt as them.
  if (peer === undefined || isProjectMessageReadOnlyRole(peer.role)) {
    return;
  }
  await insertProjectMessageWithDeliveries({
    projectId: input.projectId,
    senderMembershipId: peer.id,
    senderUserId: peer.userId,
    senderProjectDisplayName: peer.projectDisplayName,
    toMembershipId: null,
    toUserId: project.ownerUserId,
    toTeamLabel: null,
    toProjectDisplayName: PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME,
    kind: PROJECT_MESSAGE_KIND_TASK_PROCESSING,
    summary: input.summary,
    refsJson: "{}",
    recipients: [],
  });
};
