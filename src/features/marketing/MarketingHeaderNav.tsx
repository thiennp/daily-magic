"use client";

import Link from "next/link";

import useStyleguideNavAccess from "@/features/auth/hooks/useStyleguideNavAccess";
import { MARKETING_HEADER_NAV_ITEMS } from "@/features/marketing/marketingHeaderNavItems.constant";
import { MARKETING_CTA_PRIMARY_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { MARKETING_HEADER_LINK_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
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
      <div className="hidden items-center gap-1 lg:flex">
        {MARKETING_HEADER_NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={mergeMarketingClasses(
              MARKETING_HEADER_LINK_CLASSES,
              "rounded-lg px-3 py-2",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
      {showStyleguide ? (
        <Link href="/styleguide" className={MARKETING_HEADER_LINK_CLASSES}>
          Styleguide
        </Link>
      ) : null}
      {showSignIn ? (
        <Link href="/login" className={MARKETING_HEADER_LINK_CLASSES}>
          Sign in
        </Link>
      ) : null}
      <Link
        href="/#get-started"
        aria-label="Create free account"
        className={mergeMarketingClasses(
          MARKETING_CTA_PRIMARY_CLASSES,
          "h-10 px-4",
        )}
      >
        Create free account
      </Link>
    </nav>
  );
}
