import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import {
  COMPANIES_ENTITY_LABEL,
  COMPANY_ENTITY_LABEL,
} from "@/lib/admin/companyGroupCopy.constant";
import GroupDeleteControls from "@/features/admin/components/GroupDeleteControls";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";

interface GroupSelectionSectionProps {
  readonly isAdmin: boolean;
  readonly groups: readonly GroupItem[];
  readonly selectedGroupId: string;
  readonly newGroupName: string;
  readonly deleteMembers: boolean;
  readonly onNewGroupNameChange: (value: string) => void;
  readonly onSelectGroup: (groupId: string) => void;
  readonly onDeleteMembersChange: (value: boolean) => void;
  readonly onCreateGroup: () => void;
  readonly onDeleteGroup: () => void;
}

export default function GroupSelectionSection({
  isAdmin,
  groups,
  selectedGroupId,
  newGroupName,
  deleteMembers,
  onNewGroupNameChange,
  onSelectGroup,
  onDeleteMembersChange,
  onCreateGroup,
  onDeleteGroup,
}: GroupSelectionSectionProps) {
  return (
    <AppPanel padding="compact">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        {COMPANIES_ENTITY_LABEL}
      </h2>

      {isAdmin ? (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={newGroupName}
            onChange={(event) => {
              onNewGroupNameChange(event.target.value);
            }}
            placeholder={`New ${COMPANY_ENTITY_LABEL.toLowerCase()} name`}
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
          />
          <Button onClick={() => void onCreateGroup()}>
            Add {COMPANY_ENTITY_LABEL.toLowerCase()}
          </Button>
        </div>
      ) : null}

      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Selected {COMPANY_ENTITY_LABEL.toLowerCase()}
          <select
            value={selectedGroupId}
            onChange={(event) => {
              onSelectGroup(event.target.value);
            }}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="">
              Select a {COMPANY_ENTITY_LABEL.toLowerCase()}
            </option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isAdmin && selectedGroupId ? (
        <GroupDeleteControls
          groups={groups}
          selectedGroupId={selectedGroupId}
          deleteMembers={deleteMembers}
          onDeleteMembersChange={onDeleteMembersChange}
          onDeleteGroup={onDeleteGroup}
        />
      ) : null}
    </AppPanel>
  );
}
