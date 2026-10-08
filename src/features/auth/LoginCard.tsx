"use client";

import { useState } from "react";

import useBrowserSnapshot from "@/hooks/useBrowserSnapshot";
import LoginForm, { type LoginFormMode } from "@/features/auth/LoginForm";
import LoginModeSwitch from "@/features/auth/components/LoginModeSwitch";
import MarketingCard from "@/features/marketing/MarketingCard";

const titleFor = (mode: LoginFormMode, sent: boolean): string => {
  if (sent) return "Check your email";
  return mode === "up" ? "Create your free account" : "Sign in";
};

type LoginCardProps = { readonly notice?: string | null };

/** Centered sign-in card: logo, title, notice, form, and mode switch. */
export default function LoginCard({ notice = null }: LoginCardProps) {
  const hashMode = useBrowserSnapshot(() => window.location.hash, "");
  const [pickedMode, setMode] = useState<LoginFormMode | null>(null);
  const [sent, setSent] = useState(false);
  const mode = pickedMode ?? (hashMode === "#up" ? "up" : "in");

  return (
    <div className="mx-auto mt-2 flex w-full max-w-[440px] flex-col gap-4">
      <MarketingCard as="section" className="flex flex-col gap-4 sm:p-6">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="mx-auto size-11"
        >
          <path
            d="M12 2L2 12l10 10 10-10L12 2z"
            className="fill-awc-blue-950/10"
          />
          <path
            d="M12 6v12m-6-6h12"
            className="stroke-awc-blue-950"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1
          id="login-title"
          className="text-center text-2xl font-semibold text-awc-fg"
        >
          {titleFor(mode, sent)}
        </h1>
        {notice !== null && !sent ? (
          <p
            role="status"
            className="rounded-lg border border-awc-blue-200 bg-awc-blue-50 px-4 py-3 text-sm text-awc-fg"
          >
            {notice}
          </p>
        ) : null}
        <LoginForm
          defaultCallbackUrl="/"
          appearance="marketing"
          mode={mode}
          onSentChange={setSent}
        />
      </MarketingCard>
      {sent ? null : <LoginModeSwitch mode={mode} onChange={setMode} />}
    </div>
  );
}
