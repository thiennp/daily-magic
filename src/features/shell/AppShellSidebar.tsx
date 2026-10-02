"use client";

import AppShellDevicesPanel from "@/features/shell/AppShellDevicesPanel";
import AppShellNav from "@/features/shell/AppShellNav";

interface AppShellSidebarProps {
  readonly showDevicesRail?: boolean;
}

export default function AppShellSidebar({
  showDevicesRail = true,
}: AppShellSidebarProps) {
  return (
    <aside className="hidden md:block">
      <div className="sticky top-[5.25rem] flex max-h-[calc(100vh-5.25rem-1.5rem)] flex-col">
        <AppShellNav />
        {showDevicesRail ? (
          <div className="mt-auto shrink-0 pt-4">
            <AppShellDevicesPanel />
          </div>
        ) : null}
      </div>
    </aside>
  );
}
