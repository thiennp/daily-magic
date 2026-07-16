"use client";

import AdminGroupsDispatchPolicySidebar from "@/features/admin/components/AdminGroupsDispatchPolicySidebar";
import AdminSidebar from "@/features/shell/AdminSidebar";
import AppShell from "@/features/shell/AppShell";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      sidebar={
        <div className="space-y-4 lg:sticky lg:top-24">
          <AdminSidebar />
          <AdminGroupsDispatchPolicySidebar />
        </div>
      }
    >
      {children}
    </AppShell>
  );
}
