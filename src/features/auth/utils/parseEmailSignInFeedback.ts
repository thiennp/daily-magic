import {
  buildLoginFeedback,
  type LoginFeedback,
} from "@/features/auth/utils/buildLoginFeedback";
import buildLoginFeedbackFromAuthError from "@/features/auth/utils/buildLoginFeedbackFromAuthError";

interface EmailSignInResult {
  readonly ok?: boolean;
  readonly error?: string | null;
}

export default function parseEmailSignInFeedback(
  result: EmailSignInResult | undefined,
): LoginFeedback {
  if (result?.error) {
    return buildLoginFeedbackFromAuthError(result.error);
  }

  if (!result?.ok) {
    return buildLoginFeedback("Could not send the sign-in email.");
  }

  return buildLoginFeedback("Check your inbox for the sign-in link.");
}
