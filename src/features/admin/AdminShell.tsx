"use client";

import AdminSidebar from "@/features/shell/AdminSidebar";
import AppShell from "@/features/shell/AppShell";

/**
 * Admin chrome keeps the full primary nav (Marketplace, Automations,
 * Companies & rules) and the devices rail (Connect + Download AgentWitch Local).
 * Management aside stays for Companies / Users / Styleguide continuity.
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
      sidebar={
        <div className="space-y-4 lg:sticky lg:top-24">
          <AdminSidebar />
        </div>
      }
    >
      {children}
    </AppShell>
  );
}
