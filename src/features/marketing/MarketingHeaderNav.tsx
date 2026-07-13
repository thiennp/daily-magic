"use client";

import Link from "next/link";

import useStyleguideNavAccess from "@/features/auth/hooks/useStyleguideNavAccess";
import { MARKETING_CTA_PRIMARY_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface MarketingHeaderNavProps {
  readonly showSignIn: boolean;
}

export default function MarketingHeaderNav({
  showSignIn,
}: MarketingHeaderNavProps) {
  const showStyleguide = useStyleguideNavAccess();

  return (
    <nav className="flex items-center gap-4 text-sm">
      {showStyleguide ? (
        <Link
          href="/styleguide"
          className="text-zinc-600 transition hover:text-zinc-900"
        >
          Styleguide
        </Link>
      ) : null}
      {showSignIn ? (
        <Link
          href="/login"
          className="text-zinc-600 transition hover:text-zinc-900"
        >
          Sign in
        </Link>
      ) : null}
      <Link
        href="/#get-started"
        aria-label="Get started with sign in"
        className={mergeMarketingClasses(
          MARKETING_CTA_PRIMARY_CLASSES,
          "h-10 px-4",
        )}
      >
        Get started
      </Link>
    </nav>
  );
}
