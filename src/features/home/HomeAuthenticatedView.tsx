import Link from "next/link";

import UserDropdown from "@/components/header/UserDropdown";
import ConnectedClientsList from "@/features/home/ConnectedClientsList";
import LocalAgentSetupInstructions from "@/features/home/LocalAgentSetupInstructions";
import HarnessManagerPanel from "@/features/harness/HarnessManagerPanel";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface HomeAuthenticatedViewProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
}

export default function HomeAuthenticatedView({
  user,
}: HomeAuthenticatedViewProps) {
  const displayName = user.name ?? user.email;

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-500">
            Daily Magic
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Welcome, {displayName}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Signed in as{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {user.email}
            </span>{" "}
            ({user.globalRole})
          </p>
        </div>
        <UserDropdown />
      </div>

      <ConnectedClientsList />
      <HarnessManagerPanel />
      <LocalAgentSetupInstructions />

      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href="/ws-test"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        >
          WebSocket test
        </Link>
        <Link
          href="/admin/groups"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Administration
        </Link>
        <Link
          href="/styleguide"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Styleguide
        </Link>
      </div>
    </div>
  );
}
