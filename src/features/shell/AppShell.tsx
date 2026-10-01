"use client";

import AppShellBottomNav from "@/features/shell/AppShellBottomNav";
import AppShellHeader from "@/features/shell/AppShellHeader";
import AppShellNav from "@/features/shell/AppShellNav";
import {
  APP_SHELL_NARROW_CONTENT_CLASS,
  APP_SHELL_NARROW_MAIN_CLASS,
  APP_SHELL_WIDE_CONTENT_CLASS,
  APP_SHELL_WIDE_MAIN_CLASS,
} from "@/features/shell/appShellContentWidth.constant";
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
  const mainColumnClassName =
    contentClassName === APP_SHELL_NARROW_CONTENT_CLASS
      ? APP_SHELL_NARROW_MAIN_CLASS
      : APP_SHELL_WIDE_MAIN_CLASS;

  const showHeaderBrand = renderPrimaryNav || sidebar !== undefined;

  const embeddedPrimaryNav = renderPrimaryNav ? (
    <div className="mb-6 max-w-[20rem]">
      <AppShellNav placement="embedded" />
    </div>
  ) : null;

  const pageBody = sidebar ? (
    <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 pb-24 lg:grid-cols-[240px_1fr] lg:px-6 md:pb-6">
      {sidebar}
      <main className={mainColumnClassName}>
        {embeddedPrimaryNav}
        {children}
      </main>
    </div>
  ) : renderPrimaryNav ? (
    <div className="mx-auto w-full max-w-[1600px] px-4 pb-24 pt-6 sm:px-6 md:pb-6 lg:px-6">
      <div className="grid gap-6 md:grid-cols-[15rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden md:block">
          <div className="sticky top-[5.25rem]">
            <AppShellNav placement="sidebar" />
          </div>
        </aside>
        <main className={mainColumnClassName}>{children}</main>
      </div>
    </div>
  ) : (
    <main className={contentClassName ?? APP_SHELL_WIDE_CONTENT_CLASS}>
      {children}
    </main>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0 dark:bg-gray-900">
      <AppShellHeader showDesktopBrand={showHeaderBrand} />
      <WorkflowAttentionBanner />
      <DispatchApprovalListener />
      <WorkflowHumanStepListener />
      <GuestLibraryDraftSyncListener />
      {pageBody}
      <AppShellBottomNav />
    </div>
  );
}
