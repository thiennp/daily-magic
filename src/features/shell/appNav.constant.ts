import { COMPANY_RULES_NAV_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import type AppNavItem from "@/lib/shell/AppNavItem.type";

export type { default as AppNavItem } from "@/lib/shell/AppNavItem.type";

export const PRIMARY_NAV: readonly AppNavItem[] = [
  {
    href: "/",
    label: "Home",
    isActive: (pathname) => pathname === "/",
  },
  {
    href: "/projects",
    label: "Projects",
    isActive: (pathname) => pathname.startsWith("/projects"),
  },
  {
    href: "/prompt-optimizer",
    label: "Prompt optimizer",
    isActive: (pathname) => pathname.startsWith("/prompt-optimizer"),
  },
  {
    href: "/marketplace",
    label: "Marketplace",
    isActive: (pathname) => pathname.startsWith("/marketplace"),
  },
  {
    href: "/automations",
    label: "Automations",
    isActive: (pathname) => pathname.startsWith("/automations"),
  },
  {
    href: "/admin/groups",
    label: COMPANY_RULES_NAV_LABEL,
    isActive: (pathname) => pathname.startsWith("/admin"),
  },
];
