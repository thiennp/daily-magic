"use client";

import { usePathname } from "next/navigation";

import GroupDispatchPolicyControl from "@/features/admin/components/GroupDispatchPolicyControl";
import { useAdminGroupsSidebarSelection } from "@/features/admin/hooks/useGroupManagement";

export default function AdminGroupsDispatchPolicySidebar() {
  const pathname = usePathname();
  const selectedGroupId = useAdminGroupsSidebarSelection();
  const showDispatchPolicy =
    pathname === "/admin/groups" && selectedGroupId !== null;

  if (!showDispatchPolicy) {
    return null;
  }

  return <GroupDispatchPolicyControl groupId={selectedGroupId} />;
}
