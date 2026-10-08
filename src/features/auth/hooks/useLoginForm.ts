"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { type LoginFeedback } from "@/features/auth/utils/buildLoginFeedback";
import buildLoginFeedbackFromAuthError from "@/features/auth/utils/buildLoginFeedbackFromAuthError";
import normalizeAuthErrorCode from "@/features/auth/utils/normalizeAuthErrorCode";
import parseEmailSignInFeedback from "@/features/auth/utils/parseEmailSignInFeedback";
import readDevSecretFromLocalStorage from "@/features/auth/utils/readDevSecretFromLocalStorage";
import runDevLogin from "@/features/auth/utils/runDevLogin";
import validateLoginEmail, {
  LOGIN_EMAIL_SEND_FAILED_MESSAGE,
} from "@/features/auth/utils/validateLoginEmail";

interface UseLoginFormParams {
  readonly defaultCallbackUrl: string;
}

export default function useLoginForm({
  defaultCallbackUrl,
}: UseLoginFormParams) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? defaultCallbackUrl;
  const authError = normalizeAuthErrorCode(searchParams.get("error"));
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [feedback, setFeedback] = useState<LoginFeedback | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const authErrorFeedback = authError
    ? buildLoginFeedbackFromAuthError(authError)
    : null;
  const displayedFeedback = feedback ?? authErrorFeedback;

  const handleEmailSignIn = async (submittedEmail?: string) => {
    const trimmedEmail = (submittedEmail ?? email).trim();

    const validationError = validateLoginEmail(trimmedEmail);
    setFieldError(validationError);
    if (validationError !== null) {
      setFeedback(null);
      return;
    }

    const devSecret = readDevSecretFromLocalStorage();

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const dev = await runDevLogin(trimmedEmail, devSecret);
      if (dev.handled) {
        if (dev.feedback === null) {
          window.location.assign(callbackUrl);
        } else {
          setFeedback(dev.feedback);
        }
        return;
      }

      const result = await signIn("resend", {
        email: trimmedEmail,
        callbackUrl,
        redirect: false,
      });
      const parsed = parseEmailSignInFeedback(result);
      if (parsed.variant === "success") {
        setSentEmail(trimmedEmail);
      } else {
        setFeedback(parsed);
      }
    } catch {
      setFieldError(LOGIN_EMAIL_SEND_FAILED_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    if (isGoogleSigningIn) {
      return;
    }

    setIsGoogleSigningIn(true);
    setFeedback(null);
    void signIn("google", { callbackUrl });
  };

  return {
    email,
    setEmail: (value: string) => {
      setEmail(value);
      setFieldError(null);
    },
    fieldError,
    sentEmail,
    resetSent: () => setSentEmail(null),
    isSubmitting,
    isGoogleSigningIn,
    displayedFeedback,
    handleEmailSignIn,
    handleGoogleSignIn,
  };
}
