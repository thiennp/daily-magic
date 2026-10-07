"use client";

import Link from "next/link";

import useStyleguideNavAccess from "@/features/auth/hooks/useStyleguideNavAccess";
import MarketingFooterLegalBar from "@/features/marketing/MarketingFooterLegalBar";
import {
  FOOTER_ADMIN_LINKS,
  resolveMarketingFooterProductLinks,
  shouldShowMarketingFooterAdmin,
} from "@/features/marketing/resolveMarketingFooterNav";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { MARKETING_TEXT_MUTED_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function MarketingFooter() {
  const showStaffLinks = useStyleguideNavAccess();
  const productLinks = resolveMarketingFooterProductLinks(showStaffLinks);
  const showAdminLinks = shouldShowMarketingFooterAdmin(showStaffLinks);

  return (
    <footer className="border-t border-awc-border bg-white">
      <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
        {showAdminLinks ? (
          <div>
            <p
              className={mergeMarketingClasses(
                "text-xs font-semibold uppercase tracking-wide",
                MARKETING_TEXT_MUTED_CLASSES,
              )}
            >
              Admin
            </p>
            <ul className="mt-3 space-y-2">
              {FOOTER_ADMIN_LINKS.map((link) => (
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
          </div>
        ) : null}
        <div>
          <p
            className={mergeMarketingClasses(
              "text-xs font-semibold uppercase tracking-wide",
              MARKETING_TEXT_MUTED_CLASSES,
            )}
          >
            Product
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {productLinks.map((link) => (
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
        </div>
      </div>
      <MarketingFooterLegalBar />
    </footer>
  );
}
