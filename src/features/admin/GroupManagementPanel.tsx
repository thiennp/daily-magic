"use client";

import { useState } from "react";

import {
  COMPANIES_RULES_HUB_CRUMBS,
  CompaniesRulesHead,
  CompaniesRulesOrientationStrip,
  GroupCompanySettingsView,
  GroupInvitationsInbox,
  GroupMembersAndRuns,
  GroupSelectionSection,
} from "@/features/admin/components/public-api/presentation";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import { useGroupActorAccess } from "@/features/admin/hooks/public-api/presentation";
import { useGroupManagement } from "@/features/admin/hooks/public-api/presentation";
import type { GroupItem } from "@/features/admin/types/public-api/types";
import { formatCompanyMemberRoleLabel } from "@/features/admin/utils/public-api/presentation";

interface GroupManagementPanelProps {
  readonly initialGroups: readonly GroupItem[];
}

export default function GroupManagementPanel({
  initialGroups,
}: GroupManagementPanelProps) {
  const groupManagement = useGroupManagement(initialGroups);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const {
    isGlobalAdmin,
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
      <GroupInvitationsInbox />
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
        // A company owner who is not a platform admin may own one company: the server says 409 otherwise.
        canCreateCompany={isGlobalAdmin || !canDeleteTeam}
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
            actorCanManageAdmins={canDeleteTeam}
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
