import Button from "@/components/ui/button/Button";
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
    <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Groups
      </h2>

      {isAdmin ? (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={newGroupName}
            onChange={(event) => {
              onNewGroupNameChange(event.target.value);
            }}
            placeholder="New group name"
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
          />
          <Button onClick={() => void onCreateGroup()}>Add group</Button>
        </div>
      ) : null}

      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Selected group
          <select
            value={selectedGroupId}
            onChange={(event) => {
              onSelectGroup(event.target.value);
            }}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="">Select a group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isAdmin && selectedGroupId ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={deleteMembers}
              onChange={(event) => {
                onDeleteMembersChange(event.target.checked);
              }}
            />
            Also delete all users in this group
          </label>
          <Button variant="outline" onClick={() => void onDeleteGroup()}>
            Delete group
          </Button>
        </div>
      ) : null}
    </section>
  );
}
