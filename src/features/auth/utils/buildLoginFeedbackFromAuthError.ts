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
    title: "Email sign-in unavailable",
    message:
      "We could not send a sign-in email. The server may be missing a verified Resend sender domain (EMAIL_FROM), or delivery is limited to approved addresses. Try Google sign-in, or ask an admin to verify the agentwitch.com sender in Resend.",
  },
  EmailSignin: {
    variant: "error",
    title: "Email sign-in failed",
    message:
      "We could not send a sign-in email to that address. Try Google sign-in, or use an inbox allowed by the current Resend configuration.",
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
