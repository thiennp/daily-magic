"use client";

import AppShellDevicesPanel from "@/features/shell/AppShellDevicesPanel";
import AppShellNav from "@/features/shell/AppShellNav";
import { APP_SHELL_V5_SIDE_PANEL_CLASS } from "@/features/shell/v5/appShellV5Classes.constant";

interface AppShellSidebarProps {
  readonly showDevicesRail?: boolean;
}

/** V5-2: one white rounded side panel (nav + Devices + Cursor Cloud only). */
export default function AppShellSidebar({
  showDevicesRail = true,
}: AppShellSidebarProps) {
  return (
    <aside className="hidden md:block">
      <div
        className={`sticky top-[5.25rem] flex max-h-[calc(100vh-5.25rem-1.5rem)] overflow-y-auto flex-col gap-4 ${APP_SHELL_V5_SIDE_PANEL_CLASS}`}
      >
        <AppShellNav />
        {showDevicesRail ? (
          <div className="mt-auto shrink-0">
            <AppShellDevicesPanel embedded />
          </div>
        ) : null}
      </div>
    </aside>
  );
}
