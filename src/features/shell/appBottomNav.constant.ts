import type { AppNavItem } from "@/features/shell/appNav.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

const SEND_TASK_NAV_HREF = buildAgentComposerHref();

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
    label: "Market",
    isActive: (pathname) => pathname.startsWith("/marketplace"),
  },
  {
    href: SEND_TASK_NAV_HREF,
    label: "Send",
    isActive: () => false,
  },
  {
    href: "/reports",
    label: "History",
    isActive: (pathname) => pathname.startsWith("/reports"),
  },
];
