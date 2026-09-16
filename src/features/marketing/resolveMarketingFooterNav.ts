import { COMPANIES_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export interface MarketingFooterLink {
  readonly label: string;
  readonly href: string;
}

const FOOTER_PUBLIC_PRODUCT_LINKS: readonly MarketingFooterLink[] = [
  { label: "Real examples", href: "/showcases" },
  { label: "Send a task", href: buildAgentComposerHref() },
  { label: "Reports", href: "/reports" },
];

const FOOTER_STAFF_PRODUCT_LINKS: readonly MarketingFooterLink[] = [
  { label: "Styleguide", href: "/styleguide" },
];

export const FOOTER_ADMIN_LINKS: readonly MarketingFooterLink[] = [
  { label: COMPANIES_ENTITY_LABEL, href: "/admin/groups" },
  { label: "Users", href: "/admin/users" },
];

export const resolveMarketingFooterProductLinks = (
  showStaffLinks: boolean,
): readonly MarketingFooterLink[] =>
  showStaffLinks
    ? [...FOOTER_PUBLIC_PRODUCT_LINKS, ...FOOTER_STAFF_PRODUCT_LINKS]
    : FOOTER_PUBLIC_PRODUCT_LINKS;

export const shouldShowMarketingFooterAdmin = (
  showStaffLinks: boolean,
): boolean => showStaffLinks;
