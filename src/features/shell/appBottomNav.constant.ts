import type { AppNavItem } from "@/features/shell/appNav.constant";

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
    href: "/agent",
    label: "Send",
    isActive: (pathname) =>
      pathname === "/agent" || pathname.startsWith("/ws-test"),
  },
  {
    href: "/reports",
    label: "History",
    isActive: (pathname) => pathname.startsWith("/reports"),
  },
];
