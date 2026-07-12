"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import LoginFormEmailField from "@/features/auth/components/LoginFormEmailField";
import type { LoginFormAppearance } from "@/features/auth/loginFormAppearance.constant";
import { LOGIN_FORM_APPEARANCE_CLASSES } from "@/features/auth/loginFormAppearance.constant";
import {
  buildLoginFeedback,
  type LoginFeedback,
} from "@/features/auth/utils/buildLoginFeedback";
import Alert from "@/components/ui/alert/Alert";
import Button from "@/components/ui/button/Button";
import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";
import isSuperAdminEmail from "@/lib/auth/isSuperAdminEmail";

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

    if (isSuperAdminEmail(trimmedEmail)) {
      setFeedback(buildLoginFeedback("Super admin must sign in with Google."));
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
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
        Use Google or a magic link sent to your email. Super admin (
        {SUPER_ADMIN_EMAIL}) must use Google.
      </p>

      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            void signIn("google", { callbackUrl });
          }}
        >
          Continue with Google
        </Button>

        <div className={appearanceClasses.divider}>or email</div>

        <LoginFormEmailField
          appearance={appearance}
          emailInputId={emailInputId}
          email={email}
          onEmailChange={setEmail}
        />

        <Button
          className="w-full"
          disabled={isSubmitting}
          onClick={() => {
            void handleEmailSignIn();
          }}
        >
          {isSubmitting ? "Sending..." : "Email me a sign-in link"}
        </Button>

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
