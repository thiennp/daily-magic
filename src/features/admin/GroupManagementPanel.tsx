"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import CompaniesRulesOrientationStrip from "@/features/admin/components/CompaniesRulesOrientationStrip";
import GroupCompanySettingsModal from "@/features/admin/components/GroupCompanySettingsModal";
import GroupMembersSection from "@/features/admin/components/GroupMembersSection";
import GroupSelectionSection from "@/features/admin/components/GroupSelectionSection";
import GroupTeamActivityPanel from "@/features/admin/components/GroupTeamActivityPanel";
import { useAdminGroupsSidebar } from "@/features/admin/context/AdminGroupsSidebarContext";
import { useGroupManagement } from "@/features/admin/hooks/useGroupManagement";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";
import { GroupRole, isPrivilegedGlobalRole } from "@/lib/auth/roles";

interface GroupManagementPanelProps {
  readonly initialGroups: readonly GroupItem[];
}

export default function GroupManagementPanel({
  initialGroups,
}: GroupManagementPanelProps) {
  const { data: session } = useSession();
  const adminGroupsSidebar = useAdminGroupsSidebar();
  const groupManagement = useGroupManagement(initialGroups);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    adminGroupsSidebar?.setSelectedGroupId(groupManagement.selectedGroupId);
  }, [adminGroupsSidebar, groupManagement.selectedGroupId]);

  const actorUserId =
    session?.user && "id" in session.user && typeof session.user.id === "string"
      ? session.user.id
      : null;
  const actorMembership = groupManagement.members.find(
    (member) => member.membership.userId === actorUserId,
  )?.membership;
  const isGlobalAdmin =
    session?.user?.globalRole &&
    isPrivilegedGlobalRole(session.user.globalRole);
  const canDeleteTeam =
    Boolean(isGlobalAdmin) ||
    actorMembership?.role === GroupRole.GROUP_SUPER_ADMIN;
  const canConfigureDispatchPolicy =
    Boolean(isGlobalAdmin) ||
    actorMembership?.role === GroupRole.GROUP_SUPER_ADMIN ||
    actorMembership?.role === GroupRole.GROUP_ADMIN;

  const openSettings = (): void => {
    setIsSettingsOpen(true);
  };

  return (
    <div className="space-y-6">
      <GroupSelectionSection
        groups={groupManagement.groups}
        selectedGroupId={groupManagement.selectedGroupId}
        newGroupName={groupManagement.newGroupName}
        canDeleteTeam={canDeleteTeam}
        canConfigureDispatchPolicy={canConfigureDispatchPolicy}
        onNewGroupNameChange={groupManagement.setNewGroupName}
        onSelectGroup={groupManagement.handleSelectGroup}
        onCreateGroup={() => void groupManagement.handleCreateGroup()}
        onOpenSettings={openSettings}
      />

      <CompaniesRulesOrientationStrip
        groupId={groupManagement.selectedGroupId || null}
        canConfigureDispatchPolicy={canConfigureDispatchPolicy}
        onOpenCompanySettings={openSettings}
      />

      {groupManagement.selectedGroupId ? (
        <>
          <GroupMembersSection
            members={groupManagement.members}
            memberEmail={groupManagement.memberEmail}
            memberRole={groupManagement.memberRole}
            onMemberEmailChange={groupManagement.setMemberEmail}
            onMemberRoleChange={groupManagement.setMemberRole}
            onAddMember={() => void groupManagement.handleAddMember()}
            onRoleChange={groupManagement.handleRoleChange}
            onRemoveMember={groupManagement.handleRemoveMember}
          />
          <GroupTeamActivityPanel groupId={groupManagement.selectedGroupId} />
        </>
      ) : null}

      {groupManagement.selectedGroupId ? (
        <GroupCompanySettingsModal
          isOpen={isSettingsOpen}
          groupId={groupManagement.selectedGroupId}
          groups={groupManagement.groups}
          canConfigureDispatchPolicy={canConfigureDispatchPolicy}
          canDeleteTeam={canDeleteTeam}
          deleteMembers={groupManagement.deleteMembers}
          onClose={() => {
            setIsSettingsOpen(false);
          }}
          onDeleteMembersChange={groupManagement.setDeleteMembers}
          onDeleteGroup={() => {
            setIsSettingsOpen(false);
            void groupManagement.handleDeleteGroup();
          }}
        />
      ) : null}

      {groupManagement.message ? (
        <p className="text-sm text-awc-fg-muted">
          {groupManagement.message}
        </p>
      ) : null}
    </div>
  );
}
