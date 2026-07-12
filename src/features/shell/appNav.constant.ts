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
    href: "/agent",
    label: "Send a task",
    isActive: (pathname) =>
      pathname === "/agent" || pathname.startsWith("/ws-test"),
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

export const SECONDARY_NAV: readonly AppNavItem[] = [
  {
    href: "/styleguide",
    label: "Styleguide",
    isActive: (pathname) => pathname.startsWith("/styleguide"),
  },
];
