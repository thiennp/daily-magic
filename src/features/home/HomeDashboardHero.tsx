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
    <section className="overflow-hidden rounded-3xl border border-gray-200/80 bg-gradient-to-br from-brand-50 via-white to-white p-8 shadow-theme-sm ring-1 ring-gray-200/50">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
            Your home
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
            Welcome back, {displayName}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-gray-600">
            Send tasks from your browser, share setup files with teammates who
            are online, and read what happened in Reports. Signed in as{" "}
            {user.email} ({formatGlobalRole(user.globalRole)}).
          </p>
          <div className="mt-6">
            <Link
              href="/agent"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600"
            >
              Send a task
            </Link>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link
                href="/reports"
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                View job history →
              </Link>
              <Link
                href="/admin/groups"
                className="font-medium text-gray-600 hover:text-gray-800"
              >
                Teams & rules
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-theme-xs ring-1 ring-gray-200/50">
          <h2 className="text-sm font-semibold text-gray-900">Who is online</h2>
          <p className="mt-1 text-xs text-gray-600">
            Teammates and connected Macs right now.
          </p>
          <div className="mt-4">
            <ConnectedClientsList compact />
          </div>
        </div>
      </div>
    </section>
  );
}
