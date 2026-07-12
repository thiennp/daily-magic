import GroupManagementPanel from "@/features/admin/GroupManagementPanel";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";

interface AdminGroupsPageLayoutProps {
  readonly initialGroups: readonly GroupItem[];
}

export default function AdminGroupsPageLayout({
  initialGroups,
}: AdminGroupsPageLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <GroupManagementPanel initialGroups={initialGroups} />
    </div>
  );
}
