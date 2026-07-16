"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AppPanel from "@/components/surfaces/AppPanel";
import { COMPANIES_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";

const ADMIN_NAV = [
  { href: "/admin/groups", label: COMPANIES_ENTITY_LABEL },
  { href: "/admin/users", label: "Users" },
] as const;

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <AppPanel
      as="aside"
      padding="compact"
      className="h-fit"
    >
      <p className="mb-3 text-sm font-medium text-gray-800 dark:text-white/90">
        Management
      </p>
      <nav
        aria-label="Administration"
        className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1"
      >
        {ADMIN_NAV.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                  : "text-gray-600 hover:bg-gray-50 hover:text-brand-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-brand-400"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </AppPanel>
  );
}
