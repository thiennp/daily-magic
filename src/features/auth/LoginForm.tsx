"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import Alert from "@/components/ui/alert/Alert";
import Button from "@/components/ui/button/Button";
import {
  buildLoginFeedback,
  type LoginFeedback,
} from "@/features/auth/utils/buildLoginFeedback";
import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";
import isSuperAdminEmail from "@/lib/auth/isSuperAdminEmail";

interface LoginFormProps {
  readonly defaultCallbackUrl?: string;
}

export default function LoginForm({
  defaultCallbackUrl = "/",
}: LoginFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? defaultCallbackUrl;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<LoginFeedback | null>(null);
  const emailInputId = "login-email";

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
      <p className="text-sm text-gray-600 dark:text-gray-400">
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

        <div className="relative py-2 text-center text-xs uppercase tracking-wide text-gray-400">
          or email
        </div>

        <label
          htmlFor={emailInputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
          <input
            id={emailInputId}
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

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
