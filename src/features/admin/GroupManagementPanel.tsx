"use client";

import { useState } from "react";

import CompaniesRulesHead, {
  COMPANIES_RULES_HUB_CRUMBS,
} from "@/features/admin/components/CompaniesRulesHead";
import CompaniesRulesOrientationStrip from "@/features/admin/components/CompaniesRulesOrientationStrip";
import GroupCompanySettingsView from "@/features/admin/components/GroupCompanySettingsView";
import GroupMembersAndRuns from "@/features/admin/components/GroupMembersAndRuns";
import GroupSelectionSection from "@/features/admin/components/GroupSelectionSection";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import { useGroupActorAccess } from "@/features/admin/hooks/useGroupActorAccess";
import { useGroupManagement } from "@/features/admin/hooks/useGroupManagement";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";
import { formatCompanyMemberRoleLabel } from "@/features/admin/utils/formatCompanyMemberRoleLabel";

interface GroupManagementPanelProps {
  readonly initialGroups: readonly GroupItem[];
}

export default function GroupManagementPanel({
  initialGroups,
}: GroupManagementPanelProps) {
  const groupManagement = useGroupManagement(initialGroups);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const {
    actorUserId,
    actorMembership,
    canDeleteTeam,
    canConfigureDispatchPolicy,
  } = useGroupActorAccess(groupManagement.members);
  const selectedGroupId = groupManagement.selectedGroupId;
  const hasCompany = groupManagement.groups.length > 0 && selectedGroupId;

  if (isSettingsOpen && selectedGroupId) {
    return (
      <GroupCompanySettingsView
        groupId={selectedGroupId}
        groups={groupManagement.groups}
        canConfigureDispatchPolicy={canConfigureDispatchPolicy}
        canDeleteTeam={canDeleteTeam}
        deleteMembers={groupManagement.deleteMembers}
        onBack={() => {
          setIsSettingsOpen(false);
        }}
        onDeleteMembersChange={groupManagement.setDeleteMembers}
        onDeleteGroup={() => {
          setIsSettingsOpen(false);
          void groupManagement.handleDeleteGroup();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <CompaniesRulesHead
        crumbs={COMPANIES_RULES_HUB_CRUMBS}
        title={C.title}
        tip={C.whatIsCompanyTip}
        tipLabel="What is a company?"
        lede={C.lede}
      />
      <GroupSelectionSection
        groups={groupManagement.groups}
        selectedGroupId={selectedGroupId}
        newGroupName={groupManagement.newGroupName}
        actorRoleLabel={
          actorMembership
            ? formatCompanyMemberRoleLabel(actorMembership.role)
            : null
        }
        peopleCount={groupManagement.members.length}
        canDeleteTeam={canDeleteTeam}
        canConfigureDispatchPolicy={canConfigureDispatchPolicy}
        onNewGroupNameChange={groupManagement.setNewGroupName}
        onSelectGroup={groupManagement.handleSelectGroup}
        onCreateGroup={(name) => void groupManagement.handleCreateGroup(name)}
        onOpenSettings={() => {
          setIsSettingsOpen(true);
        }}
      />

      {hasCompany ? (
        <>
          <CompaniesRulesOrientationStrip
            groupId={selectedGroupId}
            canConfigureDispatchPolicy={canConfigureDispatchPolicy}
            onOpenCompanySettings={() => {
              setIsSettingsOpen(true);
            }}
          />
          <GroupMembersAndRuns
            groupManagement={groupManagement}
            actorUserId={actorUserId}
            actorIsAdmin={canConfigureDispatchPolicy}
          />
        </>
      ) : null}

      <p
        role="status"
        aria-live="polite"
        className="text-sm text-awc-fg-muted empty:hidden"
      >
        {groupManagement.message}
      </p>
    </div>
  );
}
