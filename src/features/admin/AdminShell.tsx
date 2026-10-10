"use client";

import { AdminSidebar } from "@/features/shell/public-api/presentation";
import { AppShell } from "@/features/shell/public-api/presentation";

/**
 * Admin chrome keeps the full primary nav (Marketplace, Automations,
 * Companies & rules) and the devices rail (Connect + Download AgentWitch Local).
 * Management links render inside the same left column (one sidebar, not two).
 */
export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      renderPrimaryNav={true}
      showDevicesRail={true}
      primaryNavExtra={<AdminSidebar />}
    >
      {children}
    </AppShell>
  );
}
