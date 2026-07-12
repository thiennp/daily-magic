"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  normalizeAppPathname,
  useAppPath,
} from "@/features/demo/DemoPreviewContext";
import { BOTTOM_NAV } from "@/features/shell/appBottomNav.constant";

export default function AppShellBottomNav() {
  const pathname = usePathname();
  const appPath = useAppPath();
  const normalizedPath = normalizeAppPathname(pathname);

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur md:hidden dark:border-gray-800 dark:bg-gray-900/95"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {BOTTOM_NAV.map((item) => {
          const isActive = item.isActive(normalizedPath);

          return (
            <li key={item.href}>
              <Link
                href={appPath(item.href)}
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
