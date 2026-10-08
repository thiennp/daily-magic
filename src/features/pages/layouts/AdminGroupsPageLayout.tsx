import GroupManagementPanel from "@/features/admin/GroupManagementPanel";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

interface AdminGroupsPageLayoutProps {
  readonly initialGroups: readonly GroupItem[];
}

export default function AdminGroupsPageLayout({
  initialGroups,
}: AdminGroupsPageLayoutProps) {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <GroupManagementPanel initialGroups={initialGroups} />
    </div>
  );
}
