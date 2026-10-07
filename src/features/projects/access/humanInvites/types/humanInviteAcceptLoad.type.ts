import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type HumanInviteAcceptLoad =
  | {
      readonly ok: true;
      readonly token: string;
      readonly projectId: string;
      readonly projectName: string;
      readonly inviterDisplayName: string;
      readonly role: HumanInviteRole;
      readonly expiresAt: string;
      readonly email: string | null;
      /** From peek/API when server exposes requireEmailMatch + invitedEmailMasked. */
      readonly requireEmailMatch: boolean;
      readonly invitedEmailMasked: string | null;
      /** 108: accept parks the invite until the owner Approves. */
      readonly requiresApproval: boolean;
    }
  | {
      readonly ok: false;
      readonly token: string;
      readonly miss:
        | "invalid_token"
        | "expired"
        | "revoked"
        | "already_redeemed"
        | "awaiting_approval";
      readonly projectName: string | null;
      readonly inviterDisplayName: string;
    };
