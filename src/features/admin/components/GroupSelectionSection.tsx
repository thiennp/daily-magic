"use client";

import { useSession } from "next-auth/react";

import AppPanel from "@/components/surfaces/AppPanel";
import GroupCompanySettingsAccess from "@/features/admin/components/GroupCompanySettingsAccess";
import GroupCreateCompanyPanel from "@/features/admin/components/GroupCreateCompanyPanel";
import GroupJoinHonestyCard from "@/features/admin/components/GroupJoinHonestyCard";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";

interface GroupSelectionSectionProps {
  readonly groups: readonly GroupItem[];
  readonly selectedGroupId: string;
  readonly newGroupName: string;
  readonly actorRoleLabel: string | null;
  readonly peopleCount: number;
  readonly canDeleteTeam: boolean;
  readonly canConfigureDispatchPolicy: boolean;
  readonly onNewGroupNameChange: (value: string) => void;
  readonly onSelectGroup: (groupId: string) => void;
  readonly onCreateGroup: (name: string) => void;
  readonly onOpenSettings: () => void;
}

export default function GroupSelectionSection({
  groups,
  selectedGroupId,
  newGroupName,
  actorRoleLabel,
  peopleCount,
  canDeleteTeam,
  canConfigureDispatchPolicy,
  onNewGroupNameChange,
  onSelectGroup,
  onCreateGroup,
  onOpenSettings,
}: GroupSelectionSectionProps) {
  const { data: session } = useSession();
  const actorEmail =
    session?.user &&
    "email" in session.user &&
    typeof session.user.email === "string"
      ? session.user.email
      : null;

  if (groups.length === 0) {
    return (
      <div className="grid gap-5 lg:grid-cols-2">
        <AppPanel padding="compact" aria-labelledby="create-company-h">
          <h2
            id="create-company-h"
            className="text-lg font-semibold text-awc-fg"
          >
            {C.createHeading}
          </h2>
          <GroupCreateCompanyPanel
            newGroupName={newGroupName}
            onNewGroupNameChange={onNewGroupNameChange}
            onCreateGroup={onCreateGroup}
          />
        </AppPanel>
        <AppPanel padding="compact">
          <GroupJoinHonestyCard actorEmail={actorEmail} />
        </AppPanel>
      </div>
    );
  }

  return (
    <AppPanel padding="compact">
      <GroupCompanySettingsAccess
        groups={groups}
        selectedGroupId={selectedGroupId}
        actorRoleLabel={actorRoleLabel}
        peopleCount={peopleCount}
        canConfigureDispatchPolicy={canConfigureDispatchPolicy}
        canDeleteTeam={canDeleteTeam}
        onSelectGroup={onSelectGroup}
        onCreateGroup={onCreateGroup}
        onOpenSettings={onOpenSettings}
      />
    </AppPanel>
  );
}
