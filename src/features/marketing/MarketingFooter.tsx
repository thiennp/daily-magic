import Link from "next/link";

import { COMPANIES_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
  MARKETING_TEXT_MUTED_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

const FOOTER_PRODUCT_LINKS = [
  { label: "Real examples", href: "/showcases" },
  { label: "Send a task", href: buildAgentComposerHref() },
  { label: "Reports", href: "/reports" },
  { label: "Styleguide", href: "/styleguide" },
] as const;

const FOOTER_ADMIN_LINKS = [
  { label: COMPANIES_ENTITY_LABEL, href: "/admin/groups" },
  { label: "Users", href: "/admin/users" },
] as const;

export default function MarketingFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
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
            {FOOTER_PRODUCT_LINKS.map((link) => (
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
      </div>
      <div
        className={mergeMarketingClasses(
          "border-t border-zinc-200 py-4 text-center text-xs",
          MARKETING_TEXT_MUTED_CLASSES,
        )}
      >
        AI tasks for teams — with approval when you need it.
      </div>
    </footer>
  );
}
