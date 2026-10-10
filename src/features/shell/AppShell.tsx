"use client";

import AppShellDevicesPanel from "@/features/shell/AppShellDevicesPanel";
import AppShellHeader from "@/features/shell/AppShellHeader";
import AppShellSidebar from "@/features/shell/AppShellSidebar";
import {
  APP_SHELL_NARROW_CONTENT_CLASS,
  APP_SHELL_NARROW_MAIN_CLASS,
  APP_SHELL_WIDE_CONTENT_CLASS,
  APP_SHELL_WIDE_MAIN_CLASS,
} from "@/features/shell/appShellContentWidth.constant";
import { DispatchApprovalListener } from "@/features/dispatch/public-api/presentation";
import AppShellLiveFloaterRestorer from "@/features/shell/AppShellLiveFloaterRestorer";
import { WorkflowAttentionBanner } from "@/features/dispatch/public-api/presentation";
import { WorkflowHumanStepListener } from "@/features/dispatch/public-api/presentation";
import { GuestLibraryDraftSyncListener } from "@/features/library/public-api/presentation";

interface AppShellProps {
  readonly children: React.ReactNode;
  readonly sidebar?: React.ReactNode;
  readonly contentClassName?: string;
  /** When false, hide the desktop primary nav + devices sidebar column. */
  readonly renderPrimaryNav?: boolean;
  /** When false, primary nav still renders but Your Devices is omitted (e.g. admin). */
  readonly showDevicesRail?: boolean;
  /** Rendered inside the primary nav column, under the nav (keeps one left column). */
  readonly primaryNavExtra?: React.ReactNode;
}

export default function AppShell({
  children,
  sidebar,
  contentClassName,
  renderPrimaryNav = true,
  showDevicesRail = true,
  primaryNavExtra,
}: AppShellProps) {
  const mainColumnClassName =
    contentClassName === APP_SHELL_NARROW_CONTENT_CLASS
      ? APP_SHELL_NARROW_MAIN_CLASS
      : APP_SHELL_WIDE_MAIN_CLASS;

  const showHeaderBrand = renderPrimaryNav || sidebar !== undefined;

  const primaryNavAside = renderPrimaryNav ? (
    <AppShellSidebar
      showDevicesRail={showDevicesRail}
      extraNav={primaryNavExtra}
    />
  ) : null;

  /** Mobile: devices sit below main content (artifact order), not above.
   *  Sidebar column is one width at every breakpoint: `--awc-side-w` (I3). */
  const mobileDevicesRail =
    renderPrimaryNav && showDevicesRail ? (
      <div className="mx-auto w-full max-w-[1600px] px-4 pb-6 pt-2 md:hidden sm:px-6 lg:px-6">
        <AppShellDevicesPanel />
      </div>
    ) : null;

  const pageBody = sidebar ? (
    <div className="mx-auto w-full max-w-[1600px] px-4 pb-6 pt-6 sm:px-6 lg:px-6">
      <div
        className={`grid gap-6 ${
          renderPrimaryNav
            ? "md:grid-cols-[var(--awc-side-w)_15rem_minmax(0,1fr)] lg:grid-cols-[var(--awc-side-w)_240px_minmax(0,1fr)]"
            : "md:grid-cols-[var(--awc-side-w)_minmax(0,1fr)]"
        }`}
      >
        {primaryNavAside}
        {sidebar}
        <main className={mainColumnClassName}>{children}</main>
      </div>
    </div>
  ) : renderPrimaryNav ? (
    <div className="mx-auto w-full max-w-[1600px] px-4 pb-6 pt-6 sm:px-6 lg:px-6">
      <div className="grid gap-6 md:grid-cols-[var(--awc-side-w)_minmax(0,1fr)]">
        {primaryNavAside}
        <main className={mainColumnClassName}>
          {primaryNavExtra ? (
            <div className="mb-4 md:hidden">{primaryNavExtra}</div>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  ) : (
    <main className={contentClassName ?? APP_SHELL_WIDE_CONTENT_CLASS}>
      {children}
    </main>
  );

  return (
    <div className="min-h-screen bg-awc-bg dark:bg-gray-900">
      <AppShellHeader showDesktopBrand={showHeaderBrand} />
      <WorkflowAttentionBanner />
      <DispatchApprovalListener />
      <WorkflowHumanStepListener />
      <AppShellLiveFloaterRestorer />
      <GuestLibraryDraftSyncListener />
      {pageBody}
      {mobileDevicesRail}
    </div>
  );
}
