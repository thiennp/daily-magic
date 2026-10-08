import Link from "next/link";

import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import {
  FOOTER_LEGAL_LINKS,
  resolveMarketingFooterProductLinks,
} from "@/features/marketing/resolveMarketingFooterNav";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { MARKETING_TEXT_MUTED_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

/** Design footer row: © line on the left, five links on the right. */
export default function MarketingFooterLegalBar() {
  const links = [
    ...resolveMarketingFooterProductLinks(false),
    ...FOOTER_LEGAL_LINKS,
  ];

  return (
    <div
      className={mergeMarketingClasses(
        "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-6 text-sm",
        MARKETING_TEXT_MUTED_CLASSES,
      )}
    >
      <p>
        © {new Date().getFullYear()} {AGENT_WITCH_PRODUCT_NAME}
      </p>
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {links.map((link) => (
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
  );
}
