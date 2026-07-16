"use client";

import AdminGroupsDispatchPolicySidebar from "@/features/admin/components/AdminGroupsDispatchPolicySidebar";
import { AdminGroupsSidebarProvider } from "@/features/admin/context/AdminGroupsSidebarContext";
import AdminSidebar from "@/features/shell/AdminSidebar";
import AppShell from "@/features/shell/AppShell";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGroupsSidebarProvider>
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
    </AdminGroupsSidebarProvider>
  );
}
