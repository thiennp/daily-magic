/** Locked EN for the device-code verify page (Product EN MUST pass). */
export const DEVICE_VERIFY_COPY = {
  /** Page H1 — ownership bind (Approve is the project owner's verb). */
  title: "You'll be this assistant's owner",
  /** Alias of title — kept for S2 consent reuse. */
  ownerLine: "You'll be this assistant's owner",
  /** Document / metadata title (verbatim AgentWitch). */
  pageTitle: "Become this assistant's owner | AgentWitch",
  sub: "This gives the assistant its own AgentWitch account, linked to you. It can ask to join a project when it has an invite. It sees nothing in a project until the project owner approves it.",
  /** Shown directly under `sub`: how to stop the assistant. */
  stop: "The project owner can remove it from the project's Members at any time.",
  codeLabel: "Code",
  /** Code lookup button (a verb, not the field label). */
  lookUp: "Continue",
  codeHelper: "Enter the code your assistant gave you.",
  clientLabel: "Assistant",
  clientFallback: "this assistant",
  /** Under Confirm/Deny; "Terms" and "Privacy Policy" are linked. */
  termsNotice:
    "By confirming, you accept the Terms and Privacy Policy for this assistant.",
  termsNoticePrefix: "By confirming, you accept the ",
  termsNoticeSuffix: " for this assistant.",
  confirm: "Confirm",
  deny: "Deny",
  confirmed:
    "Confirmed. You're this assistant's owner. A project still needs the project owner's approval before the assistant can join. You can close this page.",
  denied: "Denied. The assistant was not linked to you.",
  expired: "This code expired. Ask your assistant for a new code.",
  notFound:
    "That code was not found. Check the code with your assistant and try again.",
  alreadyDecided:
    "This code was already used. Ask your assistant for a new code.",
  rateLimited: "Too many tries. Wait a bit, then try again.",
  failed: "Something went wrong. Try again.",
  loginRequired: "Sign in to become this assistant's owner.",
} as const;

/** Map API / query error codes to human copy. Every code must resolve. */
export const deviceVerifyMessageForErrorCode = (
  code: string,
): string => {
  switch (code) {
    case "expired":
      return DEVICE_VERIFY_COPY.expired;
    case "invalid_code":
      return DEVICE_VERIFY_COPY.notFound;
    case "already_decided":
      return DEVICE_VERIFY_COPY.alreadyDecided;
    case "rate_limited":
      return DEVICE_VERIFY_COPY.rateLimited;
    case "not_pending":
    case "token_create_failed":
    case "account_exists":
    case "account_create_failed":
    case "agentmail_unavailable":
      return DEVICE_VERIFY_COPY.failed;
    default:
      return DEVICE_VERIFY_COPY.failed;
  }
};
