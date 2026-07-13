import GroupManagementPanel from "@/features/admin/GroupManagementPanel";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";

interface AdminGroupsPageLayoutProps {
  readonly initialGroups: readonly GroupItem[];
}

export default function AdminGroupsPageLayout({
  initialGroups,
}: AdminGroupsPageLayoutProps) {
  return <GroupManagementPanel initialGroups={initialGroups} />;
}
