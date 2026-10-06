import Link from "next/link";

import { MARKETING_HEADER_NAV_ITEMS } from "@/features/marketing/marketingHeaderNavItems.constant";

interface MarketingHeaderDesktopNavLinksProps {
  readonly navLinkClass: string;
}

export default function MarketingHeaderDesktopNavLinks({
  navLinkClass,
}: MarketingHeaderDesktopNavLinksProps) {
  return (
    <div className="hidden items-center gap-1 lg:flex">
      {MARKETING_HEADER_NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className={navLinkClass}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
