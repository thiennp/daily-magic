import type { HumanInviteAcceptViewState } from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptView";

const EMAIL_ERROR_CODES = new Set([
  "INVITE_EMAIL_MISMATCH",
  "INVITE_EMAIL_UNVERIFIED",
]);

/** True when accept failed on email lock — invite stays usable. */
export const isHumanAcceptEmailLockError = (
  code: string | undefined,
): boolean => typeof code === "string" && EMAIL_ERROR_CODES.has(code);

/** Map email-lock accept codes to view states (invite remains usable). */
export const mapHumanAcceptEmailErrorView = (
  code: string | undefined,
): Extract<
  HumanInviteAcceptViewState,
  "email_mismatch" | "email_unverified"
> | null => {
  if (code === "INVITE_EMAIL_MISMATCH") return "email_mismatch";
  if (code === "INVITE_EMAIL_UNVERIFIED") return "email_unverified";
  return null;
};
