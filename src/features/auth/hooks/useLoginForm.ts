"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import {
  buildLoginFeedback,
  type LoginFeedback,
} from "@/features/auth/utils/buildLoginFeedback";
import buildLoginFeedbackFromAuthError from "@/features/auth/utils/buildLoginFeedbackFromAuthError";
import readDevSecretFromLocalStorage from "@/features/auth/utils/readDevSecretFromLocalStorage";
import secretLogin from "@/features/auth/utils/secretLogin";

interface UseLoginFormParams {
  readonly defaultCallbackUrl: string;
}

export default function useLoginForm({
  defaultCallbackUrl,
}: UseLoginFormParams) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? defaultCallbackUrl;
  const authError = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [feedback, setFeedback] = useState<LoginFeedback | null>(null);
  const authErrorFeedback = authError
    ? buildLoginFeedbackFromAuthError(authError)
    : null;
  const displayedFeedback = feedback ?? authErrorFeedback;

  const handleEmailSignIn = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setFeedback(buildLoginFeedback("Enter your email address."));
      return;
    }

    const devSecret = readDevSecretFromLocalStorage();

    setIsSubmitting(true);
    setFeedback(null);

    try {
      if (devSecret) {
        const result = await secretLogin({
          email: trimmedEmail,
          secret: devSecret,
        });

        if (result.ok) {
          window.location.assign(callbackUrl);
          return;
        }

        setFeedback(
          buildLoginFeedback(
            result.error ??
              "Dev secret login failed. Check localStorage secret and SECRET env.",
          ),
        );
        return;
      }

      await signIn("resend", {
        email: trimmedEmail,
        callbackUrl,
        redirect: false,
      });
      setFeedback(buildLoginFeedback("Check your inbox for the sign-in link."));
    } catch {
      setFeedback(buildLoginFeedback("Could not send the sign-in email."));
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
    setEmail,
    isSubmitting,
    isGoogleSigningIn,
    displayedFeedback,
    handleEmailSignIn,
    handleGoogleSignIn,
  };
}
