"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";
import isSuperAdminEmail from "@/lib/auth/isSuperAdminEmail";

interface LoginFormProps {
  readonly defaultCallbackUrl?: string;
}

export default function LoginForm({
  defaultCallbackUrl = "/admin/groups",
}: LoginFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? defaultCallbackUrl;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleEmailSignIn = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage("Enter your email address.");
      return;
    }

    if (isSuperAdminEmail(trimmedEmail)) {
      setMessage("Super admin must sign in with Google.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await signIn("nodemailer", {
        email: trimmedEmail,
        callbackUrl,
        redirect: false,
      });
      setMessage("Check your inbox for the sign-in link.");
    } catch {
      setMessage("Could not send the sign-in email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        Sign in
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Use Google or a magic link sent to your email. Super admin (
        {SUPER_ADMIN_EMAIL}) must use Google.
      </p>

      <div className="mt-6 space-y-4">
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

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
            placeholder="you@example.com"
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

        {message ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
        ) : null}
      </div>
    </div>
  );
}
