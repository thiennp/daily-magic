"use client";

import Link from "next/link";

import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";

interface HomeMarketingAuthTermsCheckProps {
  readonly agreed: boolean;
  readonly error: boolean;
  readonly onChange: (agreed: boolean) => void;
}

/** Design terms checkbox; unticked clicks on the form show `error`. */
export default function HomeMarketingAuthTermsCheck({
  agreed,
  error,
  onChange,
}: HomeMarketingAuthTermsCheckProps) {
  return (
    <div>
      <label className="flex items-start gap-2 text-sm text-awc-fg-muted">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => {
            onChange(event.target.checked);
          }}
          aria-invalid={error ? true : undefined}
          className="mt-0.5"
        />
        <span>
          I agree to the{" "}
          <Link href="/terms" className={MARKETING_TEXT_LINK_CLASSES}>
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className={MARKETING_TEXT_LINK_CLASSES}>
            Privacy policy
          </Link>
        </span>
      </label>
      {error ? (
        <p role="alert" className="mt-1 text-[13px] text-awc-bad">
          Agree to the Terms and Privacy policy to create your account.
        </p>
      ) : null}
    </div>
  );
}
