import {
  decideProjectMessagePostAccess,
  type ProjectMessagePostDenyCode,
} from "@/lib/projects/acl/messaging/decideProjectMessagePostAccess";
import { PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME } from "@/lib/projects/acl/messaging/projectMessage.constants";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

export type ProjectMessengerSender = {
  readonly kind: "owner" | "member";
  /** Null for the owner (owner has no membership row; same as owner dispatch). */
  readonly senderMembershipId: string | null;
  readonly displayName: string;
};

export type ProjectMessengerSenderDecision =
  | { readonly ok: true; readonly sender: ProjectMessengerSender }
  | {
      readonly ok: false;
      readonly code: "forbidden" | ProjectMessagePostDenyCode;
    };

/**
 * Who may send in the messenger: the owner, or a human seat that passes the
 * shared post gate (member yes; viewer → viewer_read_only). Bots reply via
 * project_messenger_reply, not this path.
 */
export const decideProjectMessengerSender = (input: {
  readonly isOwner: boolean;
  readonly seat: ProjectMembershipRecord | null;
}): ProjectMessengerSenderDecision => {
  if (input.isOwner) {
    return {
      ok: true,
      sender: {
        kind: "owner",
        senderMembershipId: null,
        displayName: PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME,
      },
    };
  }
  if (input.seat === null || input.seat.memberKind !== "human") {
    return { ok: false, code: "forbidden" };
  }
  const access = decideProjectMessagePostAccess(input.seat);
  if (!access.ok) {
    return { ok: false, code: access.code };
  }
  return {
    ok: true,
    sender: {
      kind: "member",
      senderMembershipId: input.seat.id,
      displayName: access.projectDisplayName,
    },
  };
};
