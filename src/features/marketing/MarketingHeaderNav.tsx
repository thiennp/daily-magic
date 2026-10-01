"use client";

import Link from "next/link";
import { useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass = mergeMarketingClasses(
    MARKETING_HEADER_LINK_CLASSES,
    "rounded-lg px-3 py-2",
  );

  return (
    <nav className="relative flex items-center gap-3 text-sm sm:gap-4">
      <div className="hidden items-center gap-1 lg:flex">
        {MARKETING_HEADER_NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className={navLinkClass}>
            {item.label}
          </Link>
        ))}
      </div>
      <button
        type="button"
        className={mergeMarketingClasses(
          MARKETING_HEADER_LINK_CLASSES,
          "min-h-10 rounded-lg px-3 py-2 lg:hidden",
        )}
        aria-expanded={mobileOpen}
        aria-controls="marketing-header-mobile-nav"
        onClick={() => {
          setMobileOpen((open) => !open);
        }}
      >
        Menu
      </button>
      {mobileOpen ? (
        <div
          id="marketing-header-mobile-nav"
          className="absolute top-full right-0 z-30 mt-2 flex w-56 flex-col gap-1 rounded-xl border border-gray-200 bg-white p-2 shadow-lg lg:hidden"
        >
          {MARKETING_HEADER_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClass}
              onClick={() => {
                setMobileOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
      {showStyleguide ? (
        <Link
          href="/styleguide"
          className={mergeMarketingClasses(
            MARKETING_HEADER_LINK_CLASSES,
            "hidden sm:inline",
          )}
        >
          Styleguide
        </Link>
      ) : null}
      {showSignIn ? (
        <Link
          href="/login"
          className={mergeMarketingClasses(
            MARKETING_HEADER_LINK_CLASSES,
            "hidden min-h-10 items-center sm:inline-flex",
          )}
        >
          Sign in
        </Link>
      ) : null}
      <Link
        href="/#get-started"
        aria-label="Create free account"
        className={mergeMarketingClasses(
          MARKETING_CTA_PRIMARY_CLASSES,
          "inline-flex min-h-10 shrink-0 items-center px-3 sm:px-4",
        )}
      >
        Create account
      </Link>
    </nav>
  );
}
