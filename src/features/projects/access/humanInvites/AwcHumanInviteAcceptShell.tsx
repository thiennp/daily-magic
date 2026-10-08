"use client";

import type { ReactNode } from "react";

export type AwcHumanInviteAcceptShellProps = {
  readonly children: ReactNode;
  readonly projectName: string;
};

/** Shared chrome for human invite accept states — one centered card (Join project). */
export default function AwcHumanInviteAcceptShell({
  children,
  projectName,
}: AwcHumanInviteAcceptShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-[560px] flex-col px-4 py-12 text-awc-fg dark:text-white">
      <section
        aria-label={projectName}
        className="space-y-4 rounded-[20px] bg-awc-surface p-5 text-left shadow-awc-card"
      >
        {children}
      </section>
    </main>
  );
}
