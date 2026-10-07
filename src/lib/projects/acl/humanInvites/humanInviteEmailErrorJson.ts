import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";

/** DF-025 codes → HTTP status + plain English (UI shows errorMessage). */
const EMAIL_INVITE_ERRORS: Readonly<
  Record<string, { readonly status: number; readonly message: string }>
> = {
  invalid_email: { status: 400, message: "Enter a valid email address." },
  cannot_invite_self: { status: 400, message: "That's your own email." },
  already_invited: {
    status: 409,
    message: "An invite to this email is already waiting.",
  },
  rate_limited: {
    status: 429,
    message: "Too many invites sent. Try again in an hour.",
  },
  email_not_configured: {
    status: 503,
    message: "Email invites are not set up yet. Use Copy link instead.",
  },
  email_send_failed: {
    status: 502,
    message: "Could not send the email. Try again.",
  },
  not_awaiting_approval: {
    status: 409,
    message: "This request was already handled.",
  },
  already_member: {
    status: 409,
    message: "This person is already in the project.",
  },
  display_name_taken: {
    status: 409,
    message: "Someone in this project already uses that nickname.",
  },
};

export const humanInviteEmailErrorJson = (code: string): Response => {
  const known = EMAIL_INVITE_ERRORS[code];
  if (known !== undefined) {
    return Response.json(
      { ok: false, code: code.toUpperCase(), errorMessage: known.message },
      { status: known.status },
    );
  }
  const status = code === "forbidden" ? 403 : code === "not_found" ? 404 : 400;
  return projectAccessErrorJson(code, status);
};
