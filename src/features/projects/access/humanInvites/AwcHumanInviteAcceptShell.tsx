"use client";

import type { ReactNode } from "react";

export type AwcHumanInviteAcceptShellProps = {
  readonly children: ReactNode;
  readonly badge?: string;
  readonly projectName: string;
};

/** Shared chrome for human invite accept states. */
export default function AwcHumanInviteAcceptShell({
  children,
  badge,
  projectName,
}: AwcHumanInviteAcceptShellProps) {
  return (
    <main className="mx-auto max-w-xl px-4 py-12 text-gray-900 dark:text-white">
      {badge ? (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
          {badge} · {projectName}
        </p>
      ) : null}
      {children}
    </main>
  );
}
