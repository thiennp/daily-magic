"use client";

import { usePathname } from "next/navigation";

import GroupDispatchPolicyControl from "@/features/admin/components/GroupDispatchPolicyControl";
import { useAdminGroupsSidebar } from "@/features/admin/context/AdminGroupsSidebarContext";

export default function AdminGroupsDispatchPolicySidebar() {
  const pathname = usePathname();
  const adminGroupsSidebar = useAdminGroupsSidebar();
  const showDispatchPolicy =
    pathname === "/admin/groups" &&
    Boolean(adminGroupsSidebar?.selectedGroupId);

  if (!showDispatchPolicy || !adminGroupsSidebar) {
    return null;
  }

  return (
    <GroupDispatchPolicyControl groupId={adminGroupsSidebar.selectedGroupId} />
  );
}
