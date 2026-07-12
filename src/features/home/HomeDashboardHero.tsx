"use client";

import Link from "next/link";

import { COMPANY_RULES_NAV_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import { useAppPath } from "@/features/demo/DemoPreviewContext";
import formatGlobalRole from "@/lib/auth/formatGlobalRole";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface HomeDashboardHeroProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
}

export default function HomeDashboardHero({ user }: HomeDashboardHeroProps) {
  const displayName = user.name ?? user.email;
  const appPath = useAppPath();

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200/80 bg-gradient-to-br from-brand-50 via-white to-white p-8 shadow-theme-sm ring-1 ring-gray-200/50 dark:border-gray-800 dark:from-brand-950/30 dark:via-white/[0.02] dark:to-white/[0.02]">
      <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
        Your home
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        Welcome back, {displayName}
      </h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        Send tasks from your browser, share setup files with teammates who are
        online, and read what happened in Reports. Signed in as {user.email} (
        {formatGlobalRole(user.globalRole)}).
      </p>
      <div className="mt-6">
        <Link
          href={appPath("/agent")}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          Send a task
        </Link>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link
            href={appPath("/marketplace")}
            className="font-medium text-brand-600 hover:text-brand-700"
          >
            Browse marketplace →
          </Link>
          <Link
            href={appPath("/reports")}
            className="font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            View job history →
          </Link>
          <Link
            href={appPath("/admin/groups")}
            className="font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {COMPANY_RULES_NAV_LABEL}
          </Link>
        </div>
      </div>
    </section>
  );
}
