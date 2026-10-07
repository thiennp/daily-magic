import AppPageHeader from "@/components/surfaces/AppPageHeader";
import GroupManagementPanel from "@/features/admin/GroupManagementPanel";
import { COMPANIES_RULES_HUB_COPY } from "@/features/admin/companiesRulesHubCopy.constant";
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
      <AppPageHeader
        title={COMPANIES_RULES_HUB_COPY.title}
        description={COMPANIES_RULES_HUB_COPY.lede}
      />
      <GroupManagementPanel initialGroups={initialGroups} />
    </div>
  );
}
