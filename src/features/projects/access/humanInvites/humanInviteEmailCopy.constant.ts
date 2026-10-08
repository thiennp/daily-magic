/** DF-025 email invite strings — Members → Invite person → Email tab. */
export const HUMAN_INVITE_EMAIL_COPY = {
  sendInvite: "Send invite",
  sending: "Sending…",
  approvalCheckbox: "Approve before they join",
  inviteSentTo: "Invite sent to {email}",
  invitesSentCount: "{count} invites sent",
  someInvitesFailed: "{sent} sent, {failed} not sent: {reason}",
  emailRequired: "Enter an email address.",
  emailInvalid: "This does not look like an email: {email}",
  tooManyEmails: "Invite up to {max} people at a time.",
  sendFailed: "Could not send. Nothing was sent. Try again.",
  wantsToJoin: "Wants to join",
  approve: "Approve",
  deny: "Deny",
  approved: "{name} joined the project.",
  denied: "Request denied.",
  decideFailed: "Could not update the request. Try again.",
  awaitingTitle: "Request sent",
  awaitingBody:
    "{inviter} will approve your request to join {projectName}. You'll get access as soon as they do.",
} as const;

export const HUMAN_INVITE_EMAIL_MAX_PER_SEND = 10;

/** Accept page hint when the invite needs owner Approve. */
export const HUMAN_INVITE_EMAIL_APPROVAL_HINT =
  "After you join, the owner approves your request before you get access.";

export const fillHumanInviteEmailCopy = (
  template: string,
  values: Readonly<Record<string, string | number>>,
): string =>
  Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  );
