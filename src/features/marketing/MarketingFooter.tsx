"use client";

import Link from "next/link";

import useStyleguideNavAccess from "@/features/auth/hooks/useStyleguideNavAccess";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import MarketingFooterLegalBar from "@/features/marketing/MarketingFooterLegalBar";
import {
  FOOTER_ADMIN_LINKS,
  resolveMarketingFooterProductLinks,
  shouldShowMarketingFooterAdmin,
} from "@/features/marketing/resolveMarketingFooterNav";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
  MARKETING_TEXT_MUTED_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function MarketingFooter() {
  const showStaffLinks = useStyleguideNavAccess();
  const productLinks = resolveMarketingFooterProductLinks(showStaffLinks);
  const showAdminLinks = shouldShowMarketingFooterAdmin(showStaffLinks);

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div
        className={mergeMarketingClasses(
          "mx-auto grid max-w-6xl gap-10 px-6 py-12",
          showStaffLinks
            ? "md:grid-cols-[1.2fr_1fr_1fr]"
            : "md:grid-cols-[1.2fr_1fr]",
        )}
      >
        <div>
          <p
            className={mergeMarketingClasses(
              "text-sm font-semibold",
              MARKETING_TEXT_PRIMARY_CLASSES,
            )}
          >
            {AGENT_WITCH_PRODUCT_NAME}
          </p>
          <p
            className={mergeMarketingClasses(
              "mt-2 max-w-xs text-sm",
              MARKETING_TEXT_SECONDARY_CLASSES,
            )}
          >
            Send AI tasks to your team&apos;s Macs with approval rules and a
            clear history of every job.
          </p>
        </div>
        <div>
          <p
            className={mergeMarketingClasses(
              "text-xs font-semibold uppercase tracking-wide",
              MARKETING_TEXT_MUTED_CLASSES,
            )}
          >
            Product
          </p>
          <ul className="mt-3 space-y-2">
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
      </div>
      <MarketingFooterLegalBar />
    </footer>
  );
}
