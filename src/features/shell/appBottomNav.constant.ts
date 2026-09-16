import type { AppNavItem } from "@/features/shell/appNav.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

const NEW_TASK_NAV_HREF = buildAgentComposerHref({ customTask: true });

export const BOTTOM_NAV: readonly AppNavItem[] = [
  {
    href: "/",
    label: "Home",
    isActive: (pathname) => pathname === "/",
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
    href: NEW_TASK_NAV_HREF,
    label: "New task",
    isActive: () => false,
  },
  {
    href: "/reports",
    label: "Reports",
    isActive: (pathname) => pathname.startsWith("/reports"),
  },
];
