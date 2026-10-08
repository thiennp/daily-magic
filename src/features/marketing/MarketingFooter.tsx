"use client";

import Link from "next/link";

import useStyleguideNavAccess from "@/features/auth/hooks/useStyleguideNavAccess";
import MarketingFooterLegalBar from "@/features/marketing/MarketingFooterLegalBar";
import {
  FOOTER_ADMIN_LINKS,
  shouldShowMarketingFooterAdmin,
} from "@/features/marketing/resolveMarketingFooterNav";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

const STAFF_LINKS = [
  ...FOOTER_ADMIN_LINKS,
  { label: "Styleguide", href: "/styleguide" },
] as const;

export default function MarketingFooter() {
  const showStaffLinks = useStyleguideNavAccess();

  return (
    <footer className="border-t border-awc-border bg-white">
      {shouldShowMarketingFooterAdmin(showStaffLinks) ? (
        <ul className="mx-auto flex max-w-6xl flex-wrap gap-x-4 gap-y-1 px-6 pt-6">
          {STAFF_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={mergeMarketingClasses(
                  "text-sm",
                  MARKETING_TEXT_LINK_CLASSES,
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <MarketingFooterLegalBar />
    </footer>
  );
}
