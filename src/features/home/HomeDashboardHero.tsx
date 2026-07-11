import Link from "next/link";

import ConnectedClientsList from "@/features/home/ConnectedClientsList";
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

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-brand-500/10 via-white to-white p-8 dark:border-gray-800 dark:from-brand-500/10 dark:via-gray-900 dark:to-gray-900">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
            Mission control
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white/90">
            Welcome back, {displayName}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400">
            Dispatch agent tasks across your group, borrow harness context from
            online teammates, and review every run in Reports. Signed in as{" "}
            {user.email} ({formatGlobalRole(user.globalRole)}).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/agent"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600"
            >
              New agent task
            </Link>
            <Link
              href="/reports"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            >
              View reports
            </Link>
            <Link
              href="/admin/groups"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Groups & policy
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-5 backdrop-blur dark:border-gray-800 dark:bg-gray-950/60">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
            Team presence
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Connected dashboards and paired agents on this host.
          </p>
          <div className="mt-4">
            <ConnectedClientsList compact />
          </div>
        </div>
      </div>
    </section>
  );
}
