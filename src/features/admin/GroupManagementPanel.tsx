"use client";

import { useSession } from "next-auth/react";

import GroupDispatchPolicyControl from "@/features/admin/components/GroupDispatchPolicyControl";
import GroupMembersSection from "@/features/admin/components/GroupMembersSection";
import GroupSelectionSection from "@/features/admin/components/GroupSelectionSection";
import GroupTeamActivityPanel from "@/features/admin/components/GroupTeamActivityPanel";
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
  const groupManagement = useGroupManagement(initialGroups);
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

  return (
    <div className="space-y-6">
      <GroupSelectionSection
        groups={groupManagement.groups}
        selectedGroupId={groupManagement.selectedGroupId}
        newGroupName={groupManagement.newGroupName}
        deleteMembers={groupManagement.deleteMembers}
        canDeleteTeam={canDeleteTeam}
        onNewGroupNameChange={groupManagement.setNewGroupName}
        onSelectGroup={groupManagement.handleSelectGroup}
        onDeleteMembersChange={groupManagement.setDeleteMembers}
        onCreateGroup={() => void groupManagement.handleCreateGroup()}
        onDeleteGroup={() => void groupManagement.handleDeleteGroup()}
      />

      {groupManagement.selectedGroupId ? (
        <>
          <GroupDispatchPolicyControl
            groupId={groupManagement.selectedGroupId}
          />
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

      {groupManagement.message ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {groupManagement.message}
        </p>
      ) : null}
    </div>
  );
}
