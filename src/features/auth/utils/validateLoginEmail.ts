const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LOGIN_EMAIL_REQUIRED_MESSAGE = "Enter your email.";
export const LOGIN_EMAIL_INVALID_MESSAGE =
  "Enter a valid email, like name@company.com.";
export const LOGIN_EMAIL_SEND_FAILED_MESSAGE =
  "We could not send the link. Check your connection and try again.";

/** Returns the inline field error for an email, or null when it is fine. */
export default function validateLoginEmail(email: string): string | null {
  if (email.length === 0) return LOGIN_EMAIL_REQUIRED_MESSAGE;
  return EMAIL_PATTERN.test(email) ? null : LOGIN_EMAIL_INVALID_MESSAGE;
}
