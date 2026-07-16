import { COMPANY_RULES_NAV_LABEL } from "@/lib/admin/companyGroupCopy.constant";

export interface AppNavItem {
  readonly href: string;
  readonly label: string;
  readonly isActive: (pathname: string) => boolean;
}

export const PRIMARY_NAV: readonly AppNavItem[] = [
  {
    href: "/",
    label: "Home",
    isActive: (pathname) => pathname === "/",
  },
  {
    href: "/marketplace",
    label: "Marketplace",
    isActive: (pathname) => pathname.startsWith("/marketplace"),
  },
  {
    href: "/library",
    label: "Library",
    isActive: (pathname) => pathname.startsWith("/library"),
  },
  {
    href: "/automations",
    label: "Automations",
    isActive: (pathname) => pathname.startsWith("/automations"),
  },
  {
    href: "/reports",
    label: "Job history",
    isActive: (pathname) => pathname.startsWith("/reports"),
  },
  {
    href: "/admin/groups",
    label: COMPANY_RULES_NAV_LABEL,
    isActive: (pathname) => pathname.startsWith("/admin"),
  },
];
