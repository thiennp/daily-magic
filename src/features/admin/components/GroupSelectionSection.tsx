import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import GroupCompanySettingsAccess from "@/features/admin/components/GroupCompanySettingsAccess";
import {
  COMPANIES_ENTITY_LABEL,
  COMPANY_ENTITY_LABEL,
} from "@/lib/admin/companyGroupCopy.constant";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";

interface GroupSelectionSectionProps {
  readonly groups: readonly GroupItem[];
  readonly selectedGroupId: string;
  readonly newGroupName: string;
  readonly deleteMembers: boolean;
  readonly canDeleteTeam: boolean;
  readonly canConfigureDispatchPolicy: boolean;
  readonly onNewGroupNameChange: (value: string) => void;
  readonly onSelectGroup: (groupId: string) => void;
  readonly onDeleteMembersChange: (value: boolean) => void;
  readonly onCreateGroup: () => void;
  readonly onDeleteGroup: () => void;
}

export default function GroupSelectionSection({
  groups,
  selectedGroupId,
  newGroupName,
  deleteMembers,
  canDeleteTeam,
  canConfigureDispatchPolicy,
  onNewGroupNameChange,
  onSelectGroup,
  onDeleteMembersChange,
  onCreateGroup,
  onDeleteGroup,
}: GroupSelectionSectionProps) {
  const companyLabel = COMPANY_ENTITY_LABEL.toLowerCase();
  const hasTeam = groups.length > 0;

  return (
    <AppPanel padding="compact">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        {COMPANIES_ENTITY_LABEL}
      </h2>

      {!hasTeam ? (
        <>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create your {companyLabel} to invite teammates. You cannot join an
            existing {companyLabel}; ask an admin to add you instead.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={newGroupName}
              onChange={(event) => {
                onNewGroupNameChange(event.target.value);
              }}
              placeholder={`New ${companyLabel} name`}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
            />
            <Button onClick={() => void onCreateGroup()}>
              Create {companyLabel}
            </Button>
          </div>
        </>
      ) : null}

      {hasTeam ? (
        <GroupCompanySettingsAccess
          groups={groups}
          selectedGroupId={selectedGroupId}
          companyLabel={companyLabel}
          canConfigureDispatchPolicy={canConfigureDispatchPolicy}
          canDeleteTeam={canDeleteTeam}
          deleteMembers={deleteMembers}
          onSelectGroup={onSelectGroup}
          onDeleteMembersChange={onDeleteMembersChange}
          onDeleteGroup={onDeleteGroup}
        />
      ) : null}
    </AppPanel>
  );
}
