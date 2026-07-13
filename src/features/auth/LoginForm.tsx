"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import LoginFormEmailField from "@/features/auth/components/LoginFormEmailField";
import LoginFormEmailSubmitButton from "@/features/auth/components/LoginFormEmailSubmitButton";
import LoginFormGoogleButton from "@/features/auth/components/LoginFormGoogleButton";
import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import { LOGIN_FORM_APPEARANCE_CLASSES } from "@/features/auth/loginFormAppearance.constant";
import {
  buildLoginFeedback,
  type LoginFeedback,
} from "@/features/auth/utils/buildLoginFeedback";
import readDevSecretFromLocalStorage from "@/features/auth/utils/readDevSecretFromLocalStorage";
import secretLogin from "@/features/auth/utils/secretLogin";
import Alert from "@/components/ui/alert/Alert";

interface LoginFormProps {
  readonly defaultCallbackUrl?: string;
  readonly appearance?: LoginFormAppearance;
}

export default function LoginForm({
  defaultCallbackUrl = "/",
  appearance = "default",
}: LoginFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? defaultCallbackUrl;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<LoginFeedback | null>(null);
  const emailInputId = "login-email";
  const appearanceClasses = LOGIN_FORM_APPEARANCE_CLASSES[appearance];

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

  return (
    <div className="space-y-6">
      <p className={appearanceClasses.description}>
        Use Google or a magic link sent to your email.
      </p>

      <div className="space-y-4">
        <LoginFormGoogleButton
          appearance={appearance}
          onGoogleSignIn={() => {
            void signIn("google", { callbackUrl });
          }}
        />

        <div className={appearanceClasses.divider}>or email</div>

        <LoginFormEmailField
          appearance={appearance}
          emailInputId={emailInputId}
          email={email}
          onEmailChange={setEmail}
        />

        <LoginFormEmailSubmitButton
          appearance={appearance}
          isSubmitting={isSubmitting}
          onEmailSignIn={() => {
            void handleEmailSignIn();
          }}
        />

        {feedback ? (
          <Alert
            variant={feedback.variant}
            title={feedback.title}
            message={feedback.message}
          />
        ) : null}
      </div>
    </div>
  );
}
