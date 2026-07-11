"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PRIMARY_NAV, SECONDARY_NAV } from "@/features/shell/appNav.constant";

export default function AppShellNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
      {PRIMARY_NAV.map((item) => {
        const isActive = item.isActive(pathname);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                : "text-gray-600 hover:bg-gray-50 hover:text-brand-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-brand-400"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      {SECONDARY_NAV.map((item) => {
        const isActive = item.isActive(pathname);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-lg px-3 py-2 text-sm transition ${
              isActive
                ? "text-brand-600 dark:text-brand-400"
                : "text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
