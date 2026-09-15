"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-zinc-100 text-zinc-900 dark:bg-white/10 dark:text-white"
                : "text-gray-600 hover:bg-gray-50 hover:text-zinc-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
