import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

export type RedeemHumanInviteResult =
  | {
      readonly ok: true;
      readonly membership: ProjectMembershipRecord;
      readonly projectId: string;
      readonly role: string;
      readonly projectDisplayName: string;
      readonly awaitingApproval?: false;
    }
  | {
      /** 108: invite parked as 'accepted'; owner must Approve (no membership yet). */
      readonly ok: true;
      readonly awaitingApproval: true;
      readonly inviteId: string;
      readonly projectId: string;
      readonly role: string;
      readonly projectDisplayName: string;
    }
  | {
      readonly ok: false;
      readonly code:
        | "invalid_token"
        | "expired"
        | "revoked"
        | "already_redeemed"
        | "already_owner"
        | "already_member"
        | "already_requested"
        | "invalid_transition"
        | "display_name_invalid"
        | "display_name_reserved"
        | "display_name_required"
        | "display_name_taken"
        | "invite_email_mismatch"
        | "invite_email_unverified";
      readonly projectId?: string;
      readonly suggestedProjectDisplayName?: string | null;
      readonly invitedEmailMasked?: string;
    };
