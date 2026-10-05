import { maskEmail } from "@/lib/projects/acl/humanInvites/maskEmail";
import { parseHumanInviteEmail } from "@/lib/projects/acl/humanInvites/clampHumanInviteParams";

export type HumanInviteEmailLockDecision =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code: "invite_email_mismatch" | "invite_email_unverified";
      readonly invitedEmailMasked: string;
    };

/** Mode B gate: match + verified before claim/naming. No FSA transition. */
export const assertHumanInviteEmailLock = (input: {
  readonly requireEmailMatch: boolean;
  readonly invitedEmail: string | null;
  readonly claimantEmail: string | null | undefined;
  readonly claimantEmailVerified: boolean;
}): HumanInviteEmailLockDecision => {
  if (!input.requireEmailMatch) {
    return { ok: true };
  }
  const invitedNormalized = parseHumanInviteEmail(input.invitedEmail);
  const masked =
    invitedNormalized !== null
      ? maskEmail(invitedNormalized)
      : input.invitedEmail && input.invitedEmail.trim().length > 0
        ? maskEmail(input.invitedEmail)
        : "***";
  const claimantNormalized = parseHumanInviteEmail(input.claimantEmail ?? null);
  if (claimantNormalized === null || invitedNormalized === null) {
    return {
      ok: false,
      code: "invite_email_mismatch",
      invitedEmailMasked: masked,
    };
  }
  if (!input.claimantEmailVerified) {
    return {
      ok: false,
      code: "invite_email_unverified",
      invitedEmailMasked: masked,
    };
  }
  if (claimantNormalized !== invitedNormalized) {
    return {
      ok: false,
      code: "invite_email_mismatch",
      invitedEmailMasked: masked,
    };
  }
  return { ok: true };
};
