"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import GroupCompanyIdentity from "@/features/admin/components/GroupCompanyIdentity";
import GroupCompanySettingsGearButton from "@/features/admin/components/GroupCompanySettingsGearButton";
import GroupNewCompanyModal from "@/features/admin/components/GroupNewCompanyModal";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";

const GEAR_CLASS =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-awc-fg-muted transition hover:bg-awc-tile hover:text-awc-fg";

interface GroupCompanySettingsAccessProps {
  readonly groups: readonly GroupItem[];
  readonly selectedGroupId: string;
  readonly actorRoleLabel: string | null;
  readonly peopleCount: number;
  readonly canConfigureDispatchPolicy: boolean;
  readonly canDeleteTeam: boolean;
  /** False for an owner who already has a company (one per owner; platform admins are exempt). */
  readonly canCreateCompany: boolean;
  readonly onSelectGroup: (groupId: string) => void;
  readonly onCreateGroup: (name: string) => void;
  readonly onOpenSettings: () => void;
}

export default function GroupCompanySettingsAccess({
  groups,
  selectedGroupId,
  actorRoleLabel,
  peopleCount,
  canConfigureDispatchPolicy,
  canDeleteTeam,
  canCreateCompany,
  onSelectGroup,
  onCreateGroup,
  onOpenSettings,
}: GroupCompanySettingsAccessProps) {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const selectedGroup = groups.find((group) => group.id === selectedGroupId);
  const name = selectedGroup?.name ?? "";
  const canOpenSettings =
    Boolean(selectedGroupId) && (canDeleteTeam || canConfigureDispatchPolicy);

  return (
    <section
      aria-label="Selected company"
      className="flex flex-wrap items-center gap-4"
    >
      <GroupCompanyIdentity
        name={name}
        actorRoleLabel={actorRoleLabel}
        peopleCount={peopleCount}
      />
      <div className="flex flex-wrap items-end gap-2">
        {groups.length > 1 ? (
          <label className="text-sm font-medium text-awc-fg">
            {C.managingCompany}
            <select
              value={selectedGroupId}
              onChange={(event) => {
                onSelectGroup(event.target.value);
              }}
              className="mt-1 block min-w-48 rounded-lg border border-awc-border px-3 py-2 text-sm"
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        {canCreateCompany ? (
          <Button
            variant="outline"
            onClick={() => {
              setIsNewOpen(true);
            }}
          >
            {C.newCompany}
          </Button>
        ) : null}
        {canOpenSettings ? (
          <GroupCompanySettingsGearButton
            companyName={name}
            onOpen={onOpenSettings}
            className={GEAR_CLASS}
          />
        ) : null}
      </div>
      <GroupNewCompanyModal
        isOpen={isNewOpen}
        existingNames={groups.map((group) => group.name)}
        onClose={() => {
          setIsNewOpen(false);
        }}
        onCreate={onCreateGroup}
      />
    </section>
  );
}
