import type { AppNavItem } from "@/features/shell/appNav.constant";

export const BOTTOM_NAV: readonly AppNavItem[] = [
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
    href: "/marketplace",
    label: "Marketplace",
    isActive: (pathname) => pathname.startsWith("/marketplace"),
  },
  {
    href: "/prompt-optimizer",
    label: "Prompt optimizer",
    isActive: (pathname) => pathname.startsWith("/prompt-optimizer"),
  },
];
