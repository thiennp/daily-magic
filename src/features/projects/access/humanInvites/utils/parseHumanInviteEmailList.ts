import {
  HUMAN_INVITE_EMAIL_COPY,
  HUMAN_INVITE_EMAIL_MAX_PER_SEND,
  fillHumanInviteEmailCopy,
} from "@/features/projects/access/humanInvites/humanInviteEmailCopy.constant";

const EMAIL_SHAPE = /^[^\s@,;<>"]+@[^\s@,;<>"]+\.[^\s@,;<>"]+$/;

export type ParseHumanInviteEmailListResult =
  | { readonly ok: true; readonly emails: readonly string[] }
  | { readonly ok: false; readonly errorMessage: string };

/** "a@x.com, b@y.com" → unique lowercase list (comma / semicolon / newline). */
export const parseHumanInviteEmailList = (
  raw: string,
): ParseHumanInviteEmailListResult => {
  const parts = raw
    .split(/[,;\n]+/)
    .map((part) => part.trim().toLowerCase())
    .filter((part) => part.length > 0);
  const emails = [...new Set(parts)];
  if (emails.length === 0) {
    return { ok: false, errorMessage: HUMAN_INVITE_EMAIL_COPY.emailRequired };
  }
  if (emails.length > HUMAN_INVITE_EMAIL_MAX_PER_SEND) {
    return {
      ok: false,
      errorMessage: fillHumanInviteEmailCopy(
        HUMAN_INVITE_EMAIL_COPY.tooManyEmails,
        {
          max: HUMAN_INVITE_EMAIL_MAX_PER_SEND,
        },
      ),
    };
  }
  const bad = emails.find((email) => !EMAIL_SHAPE.test(email));
  if (bad !== undefined) {
    return {
      ok: false,
      errorMessage: fillHumanInviteEmailCopy(
        HUMAN_INVITE_EMAIL_COPY.emailInvalid,
        {
          email: bad,
        },
      ),
    };
  }
  return { ok: true, emails };
};
