import { PROJECTS_REPORTS_INTENT_HREF } from "@/lib/shell/projectTabIntentHrefs.constant";

export interface MarketingHeaderNavItem {
  readonly label: string;
  readonly href: string;
}

/** In-page anchors on the public landing; auth routes for signed-in areas. */
export const MARKETING_HEADER_NAV_ITEMS: readonly MarketingHeaderNavItem[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Workflows", href: "/#popular-presets-heading" },
  { label: "Security", href: "/#features-heading" },
  { label: "Resources", href: "/showcases" },
  {
    label: "Reports",
    href: `/login?callbackUrl=${encodeURIComponent(PROJECTS_REPORTS_INTENT_HREF)}`,
  },
] as const;
