"use client";

import GroupCompanySettingsGearButton from "@/features/admin/components/GroupCompanySettingsGearButton";
import { COMPANIES_RULES_HUB_COPY } from "@/features/admin/companiesRulesHubCopy.constant";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";

const GEAR_CLASS =
  "inline-flex items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white/90";

interface GroupCompanySettingsAccessProps {
  readonly groups: readonly GroupItem[];
  readonly selectedGroupId: string;
  readonly canConfigureDispatchPolicy: boolean;
  readonly canDeleteTeam: boolean;
  readonly onSelectGroup: (groupId: string) => void;
  readonly onOpenSettings: () => void;
}

export default function GroupCompanySettingsAccess({
  groups,
  selectedGroupId,
  canConfigureDispatchPolicy,
  canDeleteTeam,
  onSelectGroup,
  onOpenSettings,
}: GroupCompanySettingsAccessProps) {
  const selectedGroup = groups.find((group) => group.id === selectedGroupId);
  const canOpenSettings =
    Boolean(selectedGroupId) && (canDeleteTeam || canConfigureDispatchPolicy);
  const gear = canOpenSettings ? (
    <GroupCompanySettingsGearButton
      companyName={selectedGroup?.name}
      onOpen={onOpenSettings}
      className={`${GEAR_CLASS} ${groups.length === 1 ? "h-8 w-8" : "h-[42px] w-[42px] shrink-0"}`}
    />
  ) : null;

  if (groups.length === 1) {
    return (
      <div className="mt-4 flex items-center gap-2">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {selectedGroup?.name}
        </p>
        {gear}
      </div>
    );
  }

  return (
    <div className="mt-4 flex items-end gap-2">
      <label className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {COMPANIES_RULES_HUB_COPY.managingCompany}
        <select
          value={selectedGroupId}
          onChange={(event) => {
            onSelectGroup(event.target.value);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
        >
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </label>
      {gear}
    </div>
  );
}
