import { COMPANY_RULES_NAV_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import type AppNavItem from "@/lib/shell/AppNavItem.type";

export type { default as AppNavItem } from "@/lib/shell/AppNavItem.type";

const NEW_TASK_HREF = buildAgentComposerHref({ customTask: true });

export const PRIMARY_NAV: readonly AppNavItem[] = [
  {
    href: "/",
    label: "Home",
    isActive: (pathname) => pathname === "/",
  },
  {
    href: NEW_TASK_HREF,
    label: "New task",
    isActive: () => false,
  },
  {
    href: "/reports",
    label: "Reports",
    isActive: (pathname) => pathname.startsWith("/reports"),
  },
  {
    href: "/library",
    label: "Library",
    isActive: (pathname) => pathname.startsWith("/library"),
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
