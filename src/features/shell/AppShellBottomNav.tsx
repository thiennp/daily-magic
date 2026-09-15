"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import { BOTTOM_NAV } from "@/features/shell/appBottomNav.constant";
import { filterAppNavForShellContext } from "@/lib/shell/filterAppNavForShellContext";

export default function AppShellBottomNav() {
  const pathname = usePathname();
  const shellNav = useShellNavContext();
  const navItems = filterAppNavForShellContext(BOTTOM_NAV, shellNav);

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur md:hidden dark:border-gray-800 dark:bg-gray-800/95"
    >
      <ul
        className="mx-auto grid max-w-lg"
        style={{
          gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))`,
        }}
      >
        {navItems.map((item) => {
          const isActive = item.isActive(pathname);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center px-1 py-2 text-[11px] font-medium transition ${
                  isActive
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
