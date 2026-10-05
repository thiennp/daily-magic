import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

export type RedeemHumanInviteResult =
  | {
      readonly ok: true;
      readonly membership: ProjectMembershipRecord;
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
