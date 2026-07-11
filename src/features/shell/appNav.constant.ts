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
    label: "Agent",
    isActive: (pathname) =>
      pathname === "/agent" || pathname.startsWith("/ws-test"),
  },
  {
    href: "/admin/groups",
    label: "Admin",
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
