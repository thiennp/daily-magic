"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import {
  useMarketingAuthModal,
  type MarketingAuthMode,
} from "@/features/marketing/MarketingAuthModalContext";

interface MarketingAuthTriggerProps {
  readonly mode: MarketingAuthMode;
  readonly className: string;
  readonly fallbackHref: string;
  readonly children: ReactNode;
  readonly ariaLabel?: string;
}

/** Opens the Home auth modal; plain link where no modal is mounted. */
export default function MarketingAuthTrigger({
  mode,
  className,
  fallbackHref,
  children,
  ariaLabel,
}: MarketingAuthTriggerProps) {
  const modal = useMarketingAuthModal();

  if (modal === null) {
    return (
      <Link href={fallbackHref} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      onClick={() => {
        modal.open(mode);
      }}
    >
      {children}
    </button>
  );
}
