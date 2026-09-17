"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  APP_SHELL_NAV_LINK_ACTIVE_CLASSES,
  APP_SHELL_NAV_LINK_BASE_CLASSES,
  APP_SHELL_NAV_LINK_INACTIVE_CLASSES,
} from "@/features/shell/appShellNavClasses.constant";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import { PRIMARY_NAV } from "@/features/shell/appNav.constant";
import { filterAppNavForShellContext } from "@/lib/shell/filterAppNavForShellContext";

export default function AppShellNav() {
  const pathname = usePathname();
  const shellNav = useShellNavContext();
  const navItems = filterAppNavForShellContext(PRIMARY_NAV, shellNav);

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
      {navItems.map((item) => {
        const isActive = item.isActive(pathname);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`${APP_SHELL_NAV_LINK_BASE_CLASSES} ${
              isActive
                ? APP_SHELL_NAV_LINK_ACTIVE_CLASSES
                : APP_SHELL_NAV_LINK_INACTIVE_CLASSES
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
