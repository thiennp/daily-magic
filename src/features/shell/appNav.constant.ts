import { COMPANY_RULES_NAV_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

const SEND_TASK_NAV_HREF = buildAgentComposerHref();

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
    href: SEND_TASK_NAV_HREF,
    label: "Send a task",
    isActive: () => false,
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
