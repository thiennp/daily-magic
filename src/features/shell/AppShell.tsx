"use client";

import AppShellBottomNav from "@/features/shell/AppShellBottomNav";
import AppShellHeader from "@/features/shell/AppShellHeader";
import AppShellNav from "@/features/shell/AppShellNav";
import { APP_SHELL_WIDE_CONTENT_CLASS } from "@/features/shell/appShellContentWidth.constant";
import DispatchApprovalListener from "@/features/dispatch/DispatchApprovalListener";
import WorkflowAttentionBanner from "@/features/dispatch/WorkflowAttentionBanner";
import WorkflowHumanStepListener from "@/features/dispatch/WorkflowHumanStepListener";
import GuestLibraryDraftSyncListener from "@/features/library/GuestLibraryDraftSyncListener";

interface AppShellProps {
  readonly children: React.ReactNode;
  readonly sidebar?: React.ReactNode;
  readonly contentClassName?: string;
  /** When false, the page places desktop primary nav (e.g. home devices column). */
  readonly renderPrimaryNav?: boolean;
}

export default function AppShell({
  children,
  sidebar,
  contentClassName,
  renderPrimaryNav = true,
}: AppShellProps) {
  const mainClassName =
    contentClassName ?? (sidebar ? undefined : APP_SHELL_WIDE_CONTENT_CLASS);

  const primaryNav = renderPrimaryNav ? (
    <div className="mb-6 max-w-[20rem]">
      <AppShellNav />
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0 dark:bg-gray-900">
      <AppShellHeader />
      <WorkflowAttentionBanner />
      <DispatchApprovalListener />
      <WorkflowHumanStepListener />
      <GuestLibraryDraftSyncListener />
      {sidebar ? (
        <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 pb-24 lg:grid-cols-[240px_1fr] lg:px-6 md:pb-6">
          {sidebar}
          <main>
            {primaryNav}
            {children}
          </main>
        </div>
      ) : (
        <main className={mainClassName}>
          {primaryNav}
          {children}
        </main>
      )}
      <AppShellBottomNav />
    </div>
  );
}
