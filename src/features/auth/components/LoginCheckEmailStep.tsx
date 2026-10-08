"use client";

import { useEffect, useState } from "react";

const RESEND_SECONDS = 30;

interface LoginCheckEmailStepProps {
  readonly email: string;
  readonly isSending: boolean;
  readonly onResend: () => void;
  readonly onUseAnotherEmail: () => void;
}

/** "Check your email" step shown after the sign-in link was sent. */
export default function LoginCheckEmailStep({
  email,
  isSending,
  onResend,
  onUseAnotherEmail,
}: LoginCheckEmailStepProps) {
  const [left, setLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (left <= 0) return;
    const timer = window.setTimeout(() => setLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [left]);

  const canResend = left <= 0 && !isSending;
  const resendLabel = left > 0 ? `Resend in ${left} s` : "Resend link";

  return (
    <div className="flex flex-col gap-4">
      <p role="status" className="text-sm text-awc-fg-muted">
        We sent a sign-in link to <b className="text-awc-fg">{email}</b>. Open
        it on this device to finish. Check spam if you do not see it.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!canResend}
          title={
            left > 0 ? `Wait ${left} seconds before asking again.` : undefined
          }
          onClick={() => {
            setLeft(RESEND_SECONDS);
            onResend();
          }}
          className="min-h-9 rounded-md border border-awc-border-strong bg-awc-surface px-4 text-sm font-semibold text-awc-fg hover:bg-awc-fill disabled:cursor-not-allowed disabled:border-dashed disabled:bg-awc-fill disabled:text-awc-fg-muted"
        >
          {resendLabel}
        </button>
        <button
          type="button"
          onClick={onUseAnotherEmail}
          className="min-h-9 rounded-md px-4 text-sm font-semibold text-awc-blue-700 hover:bg-awc-blue-50"
        >
          Use another email
        </button>
      </div>
    </div>
  );
}
