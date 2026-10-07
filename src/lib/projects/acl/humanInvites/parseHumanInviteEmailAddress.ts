import {
  HUMAN_INVITE_EMAIL_MAX_LENGTH,
  HUMAN_INVITE_EMAIL_PATTERN,
} from "@/lib/projects/acl/humanInvites/humanInviteEmail.constant";

/** Strict single-address parse for email send: trim + lowercase, or null. */
export const parseHumanInviteEmailAddress = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (
    normalized.length === 0 ||
    normalized.length > HUMAN_INVITE_EMAIL_MAX_LENGTH ||
    !HUMAN_INVITE_EMAIL_PATTERN.test(normalized)
  ) {
    return null;
  }
  return normalized;
};

/** Email invites lock to the invited address unless the owner unticks it. */
export const parseEmailInviteRequireEmailMatch = (value: unknown): boolean =>
  !(value === false || value === "false");

/** Email invites need owner Approve unless the owner explicitly opts out. */
export const parseRequiresApproval = (value: unknown): boolean =>
  !(value === false || value === "false");
