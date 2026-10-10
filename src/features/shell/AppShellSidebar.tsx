"use client";

import AppShellDevicesPanel from "@/features/shell/AppShellDevicesPanel";
import AppShellNav from "@/features/shell/AppShellNav";
import { APP_SHELL_V5_SIDE_PANEL_CLASS } from "@/features/shell/v5/public-api/types";

interface AppShellSidebarProps {
  readonly showDevicesRail?: boolean;
  /** Extra section rendered under the primary nav (e.g. admin Manage links). */
  readonly extraNav?: React.ReactNode;
}

/** V5-2: one white rounded side panel (nav + Devices + Cursor Cloud only). */
export default function AppShellSidebar({
  showDevicesRail = true,
  extraNav,
}: AppShellSidebarProps) {
  return (
    <aside className="hidden md:block">
      <div
        className={`sticky top-[5.25rem] flex max-h-[calc(100vh-5.25rem-1.5rem)] overflow-y-auto flex-col gap-4 ${APP_SHELL_V5_SIDE_PANEL_CLASS}`}
      >
        <AppShellNav />
        {extraNav}
        {showDevicesRail ? (
          <div id="awc-connect" className="mt-auto shrink-0 scroll-mt-24">
            <AppShellDevicesPanel embedded />
          </div>
        ) : null}
      </div>
    </aside>
  );
}
