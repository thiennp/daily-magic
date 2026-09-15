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
    label: "Playbooks",
    isActive: (pathname) => pathname.startsWith("/library"),
  },
  {
    href: SEND_TASK_NAV_HREF,
    label: "Send",
    isActive: () => false,
  },
  {
    href: "/reports",
    label: "Runs",
    isActive: (pathname) => pathname.startsWith("/reports"),
  },
];
