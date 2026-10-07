"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import MarketingHeaderDesktopNavLinks from "@/features/marketing/MarketingHeaderDesktopNavLinks";
import MarketingHeaderNavHamburgerButton from "@/features/marketing/MarketingHeaderNavHamburgerButton";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "Escape") {
        return;
      }
      event.preventDefault();
      setMobileOpen(false);
      toggleRef.current?.focus();
    };

    const handlePointerDown = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) {
        return;
      }
      setMobileOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [mobileOpen]);

  const navLinkClass = mergeMarketingClasses(
    MARKETING_HEADER_LINK_CLASSES,
    "rounded-lg px-3 py-2",
  );

  return (
    <nav
      ref={rootRef}
      className="relative flex items-center gap-3 text-sm sm:gap-4"
    >
      <MarketingHeaderDesktopNavLinks navLinkClass={navLinkClass} />
      <MarketingHeaderNavHamburgerButton
        ref={toggleRef}
        mobileOpen={mobileOpen}
        onToggle={() => {
          setMobileOpen((open) => !open);
        }}
      />
      {mobileOpen ? (
        <div
          id="marketing-header-mobile-nav"
          className="absolute top-full right-0 z-30 mt-2 flex w-56 flex-col gap-1 rounded-xl border border-awc-border bg-white p-2 shadow-lg lg:hidden"
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
