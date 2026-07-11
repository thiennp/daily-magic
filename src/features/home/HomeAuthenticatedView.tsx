import Link from "next/link";

import ConnectedClientsList from "@/features/home/ConnectedClientsList";
import LocalAgentSetupInstructions from "@/features/home/LocalAgentSetupInstructions";
import HarnessWorkspace from "@/features/harness/HarnessWorkspace";
import formatGlobalRole from "@/lib/auth/formatGlobalRole";
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
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Connect your computer to run local agent tasks from the browser.
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Welcome, {displayName}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Signed in as{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {user.email}
          </span>{" "}
          ({formatGlobalRole(user.globalRole)})
        </p>
      </div>

      <ConnectedClientsList />
      <HarnessWorkspace />
      <LocalAgentSetupInstructions />

      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href="/agent"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          Send a test task
        </Link>
        <Link
          href="/admin/groups"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Administration
        </Link>
      </div>
    </div>
  );
}
