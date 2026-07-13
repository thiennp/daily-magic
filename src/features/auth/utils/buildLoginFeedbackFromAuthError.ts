import type { LoginFeedback } from "@/features/auth/utils/buildLoginFeedback";

const AUTH_ERROR_FEEDBACK_MAP: Record<string, LoginFeedback> = {
  OAuthAccountNotLinked: {
    variant: "error",
    title: "Account already exists",
    message:
      "This email already has an account with another sign-in method. Try the email magic link, or sign in with the method you used first.",
  },
  Configuration: {
    variant: "error",
    title: "Sign-in interrupted",
    message:
      "Google sign-in could not finish. Use one browser tab, click Continue with Google once, and try again in a private window if it keeps failing.",
  },
  AccessDenied: {
    variant: "error",
    title: "Sign-in cancelled",
    message:
      "Google sign-in was cancelled or denied. Try again when you are ready.",
  },
  Verification: {
    variant: "error",
    title: "Sign-in link expired",
    message:
      "That sign-in link is no longer valid. Request a new email link and try again.",
  },
};

export default function buildLoginFeedbackFromAuthError(
  errorCode: string,
): LoginFeedback {
  return (
    AUTH_ERROR_FEEDBACK_MAP[errorCode] ?? {
      variant: "error",
      title: "Sign-in failed",
      message: "Something went wrong during sign-in. Please try again.",
    }
  );
}
