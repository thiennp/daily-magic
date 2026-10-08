"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import AppPanel from "@/components/surfaces/AppPanel";
import { COMPANIES_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import { isPrivilegedGlobalRole } from "@/lib/auth/roles";

const LOCKED_WHY =
  "is for AgentWitch staff admins. Your account cannot open it.";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview", staffOnly: true },
  { href: "/admin/groups", label: COMPANIES_ENTITY_LABEL, staffOnly: false },
  { href: "/admin/users", label: "Users", staffOnly: true },
  { href: "/admin/cost-control", label: "Cost control", staffOnly: true },
  { href: "/styleguide", label: "Styleguide", staffOnly: false },
] as const;

const LINK_CLASS = "rounded-lg px-3 py-2 text-sm transition";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isStaff = Boolean(
    session?.user?.globalRole &&
    isPrivilegedGlobalRole(session.user.globalRole),
  );

  return (
    <AppPanel as="aside" padding="compact" className="h-fit">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-awc-fg-subtle">
        Manage
      </h2>
      <nav
        aria-label="Administration"
        className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1"
      >
        {ADMIN_NAV.map((item) => {
          if (item.staffOnly && !isStaff) {
            return (
              <span
                key={item.href}
                aria-disabled="true"
                title={`${item.label} ${LOCKED_WHY}`}
                className={`${LINK_CLASS} flex cursor-not-allowed items-center gap-2 text-awc-fg-subtle`}
              >
                {item.label}
                <span className="rounded-full bg-awc-fill px-2 py-0.5 text-xs">
                  Staff only
                </span>
                <span className="sr-only"> (staff admins only)</span>
              </span>
            );
          }
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`${LINK_CLASS} ${
                isActive
                  ? "bg-awc-accent-soft text-awc-blue-700 dark:bg-brand-500/10 dark:text-brand-400"
                  : "text-awc-fg-muted hover:bg-awc-surface-2 hover:text-awc-blue-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-brand-400"
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
