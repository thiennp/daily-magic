"use client";

import Link from "next/link";

import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";

interface HomeMarketingAuthTermsCheckProps {
  readonly agreed: boolean;
  readonly onChange: (agreed: boolean) => void;
}

/** Design terms checkbox; the form below stays disabled until it is ticked. */
export default function HomeMarketingAuthTermsCheck({
  agreed,
  onChange,
}: HomeMarketingAuthTermsCheckProps) {
  return (
    <label className="flex items-start gap-2 text-sm text-awc-fg-muted">
      <input
        type="checkbox"
        checked={agreed}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
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
  );
}
