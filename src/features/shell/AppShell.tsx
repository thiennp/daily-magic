"use client";

import AppShellBottomNav from "@/features/shell/AppShellBottomNav";
import AppShellHeader from "@/features/shell/AppShellHeader";
import DispatchApprovalListener from "@/features/dispatch/DispatchApprovalListener";

interface AppShellProps {
  readonly children: React.ReactNode;
  readonly sidebar?: React.ReactNode;
  readonly sectionTitle?: string;
  readonly contentClassName?: string;
}

export default function AppShell({
  children,
  sidebar,
  sectionTitle,
  contentClassName,
}: AppShellProps) {
  const mainClassName =
    contentClassName ??
    (sidebar ? undefined : "mx-auto max-w-4xl px-4 py-6 pb-24 sm:px-6 md:pb-6");

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0 dark:bg-gray-900">
      <AppShellHeader sectionTitle={sectionTitle} />
      <DispatchApprovalListener />
      {sidebar ? (
        <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 pb-24 lg:grid-cols-[240px_1fr] lg:px-6 md:pb-6">
          {sidebar}
          <main>{children}</main>
        </div>
      ) : (
        <main className={mainClassName}>{children}</main>
      )}
      <AppShellBottomNav />
    </div>
  );
}
