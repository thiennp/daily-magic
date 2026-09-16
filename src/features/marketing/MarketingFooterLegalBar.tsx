import Link from "next/link";

import { FOOTER_LEGAL_LINKS } from "@/features/marketing/resolveMarketingFooterNav";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { MARKETING_TEXT_MUTED_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function MarketingFooterLegalBar() {
  return (
    <div
      className={mergeMarketingClasses(
        "border-t border-zinc-200 px-6 py-4 text-center text-xs",
        MARKETING_TEXT_MUTED_CLASSES,
      )}
    >
      <p>AI tasks for teams — with approval when you need it.</p>
      <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {FOOTER_LEGAL_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={mergeMarketingClasses(
              "text-xs",
              MARKETING_TEXT_LINK_CLASSES,
            )}
          >
            {link.label}
          </Link>
        ))}
      </p>
    </div>
  );
}
