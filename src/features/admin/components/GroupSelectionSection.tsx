"use client";

import { useSession } from "next-auth/react";

import AppPanel from "@/components/surfaces/AppPanel";
import GroupCompanySettingsAccess from "@/features/admin/components/GroupCompanySettingsAccess";
import GroupCreateCompanyPanel from "@/features/admin/components/GroupCreateCompanyPanel";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import { COMPANIES_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";

interface GroupSelectionSectionProps {
  readonly groups: readonly GroupItem[];
  readonly selectedGroupId: string;
  readonly newGroupName: string;
  readonly canDeleteTeam: boolean;
  readonly canConfigureDispatchPolicy: boolean;
  readonly onNewGroupNameChange: (value: string) => void;
  readonly onSelectGroup: (groupId: string) => void;
  readonly onCreateGroup: () => void;
  readonly onOpenSettings: () => void;
}

export default function GroupSelectionSection({
  groups,
  selectedGroupId,
  newGroupName,
  canDeleteTeam,
  canConfigureDispatchPolicy,
  onNewGroupNameChange,
  onSelectGroup,
  onCreateGroup,
  onOpenSettings,
}: GroupSelectionSectionProps) {
  const { data: session } = useSession();
  const hasTeam = groups.length > 0;
  const actorEmail =
    session?.user &&
    "email" in session.user &&
    typeof session.user.email === "string"
      ? session.user.email
      : null;

  return (
    <AppPanel padding="compact">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        {hasTeam ? COMPANIES_ENTITY_LABEL : C.createHeading}
      </h2>

      {!hasTeam ? (
        <GroupCreateCompanyPanel
          newGroupName={newGroupName}
          actorEmail={actorEmail}
          onNewGroupNameChange={onNewGroupNameChange}
          onCreateGroup={onCreateGroup}
        />
      ) : null}

      {hasTeam ? (
        <GroupCompanySettingsAccess
          groups={groups}
          selectedGroupId={selectedGroupId}
          canConfigureDispatchPolicy={canConfigureDispatchPolicy}
          canDeleteTeam={canDeleteTeam}
          onSelectGroup={onSelectGroup}
          onOpenSettings={onOpenSettings}
        />
      ) : null}
    </AppPanel>
  );
}
