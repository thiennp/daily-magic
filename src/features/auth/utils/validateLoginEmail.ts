import { isAgentAccessSyntheticEmail } from "@/lib/agentAccess/isAgentAccessSyntheticEmail";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LOGIN_EMAIL_REQUIRED_MESSAGE = "Enter your email.";
export const LOGIN_EMAIL_INVALID_MESSAGE =
  "Enter a valid email, like name@company.com.";
/** Assistant accounts have no inbox, so a sign-in link would never arrive. */
export const LOGIN_EMAIL_ASSISTANT_ACCOUNT_MESSAGE =
  "That is an assistant account. Assistants join a project through an invite link or the AgentWitch connector, not by email. Sign in with your own email or Google.";
export const LOGIN_EMAIL_SEND_FAILED_MESSAGE =
  "We could not send the link. Check your connection and try again.";

/** Returns the inline field error for an email, or null when it is fine. */
export default function validateLoginEmail(email: string): string | null {
  if (email.length === 0) return LOGIN_EMAIL_REQUIRED_MESSAGE;
  if (!EMAIL_PATTERN.test(email)) return LOGIN_EMAIL_INVALID_MESSAGE;
  return isAgentAccessSyntheticEmail(email.toLowerCase())
    ? LOGIN_EMAIL_ASSISTANT_ACCOUNT_MESSAGE
    : null;
}
