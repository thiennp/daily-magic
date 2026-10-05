import { loadProjectProcessingReceiptMemberships } from "@/lib/projects/acl/messaging/loadProjectProcessingReceiptMemberships";
import { PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME } from "@/lib/projects/acl/messaging/projectMessage.constants";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

type ReceiptRecipient = {
  readonly id: string;
  readonly user_id: string;
};

export type ProjectProcessingReceiptTarget =
  | {
      readonly toMembershipId: string;
      readonly toUserId: string;
      readonly toProjectDisplayName: string | null;
      readonly recipients: readonly ReceiptRecipient[];
      readonly sender: string;
    }
  | {
      readonly toMembershipId: null;
      readonly toUserId: string;
      readonly toProjectDisplayName: string;
      readonly recipients: readonly [];
      readonly sender: null;
      readonly ownerUserId: string;
    };

/**
 * Resolve the receipt recipient once (bot membership or Owner). Null means
 * skip — missing project (Owner) or missing sender membership (bot).
 */
export const resolveProjectProcessingReceiptTarget = async (input: {
  readonly projectId: string;
  readonly sender: string | null;
}): Promise<ProjectProcessingReceiptTarget | null> => {
  if (input.sender === null) {
    const project = await getUserProjectById(input.projectId);
    if (project === null) {
      return null;
    }
    return Object.freeze({
      toMembershipId: null,
      toUserId: project.ownerUserId,
      toProjectDisplayName: PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME,
      recipients: Object.freeze([]) as readonly [],
      sender: null,
      ownerUserId: project.ownerUserId,
    });
  }

  const byId = await loadProjectProcessingReceiptMemberships({
    projectId: input.projectId,
    ids: [input.sender],
  });
  const sender = byId.get(input.sender);
  if (sender === undefined) {
    return null;
  }
  return Object.freeze({
    toMembershipId: sender.id,
    toUserId: sender.userId,
    toProjectDisplayName: sender.projectDisplayName,
    recipients: Object.freeze([{ id: sender.id, user_id: sender.userId }]),
    sender: sender.id,
  });
};
