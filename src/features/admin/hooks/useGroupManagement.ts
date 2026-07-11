import { useState } from "react";

import type {
  GroupItem,
  MemberItem,
} from "@/features/admin/types/groupManagement.types";
import {
  createAdminGroupAction,
  deleteAdminGroupAction,
} from "@/features/admin/utils/groupManagementGroupMutateActions";
import { selectAdminGroup } from "@/features/admin/utils/groupManagementLoadActions";
import {
  addGroupMemberAction,
  removeGroupMemberAction,
  updateGroupMemberRoleAction,
} from "@/features/admin/utils/groupManagementMemberMutateActions";
import { GroupRole } from "@/lib/auth/roles";

interface UseGroupManagementResult {
  readonly groups: readonly GroupItem[];
  readonly selectedGroupId: string;
  readonly members: readonly MemberItem[];
  readonly newGroupName: string;
  readonly memberEmail: string;
  readonly memberRole: string;
  readonly deleteMembers: boolean;
  readonly message: string | null;
  readonly setNewGroupName: (value: string) => void;
  readonly setMemberEmail: (value: string) => void;
  readonly setMemberRole: (value: string) => void;
  readonly setDeleteMembers: (value: boolean) => void;
  readonly handleSelectGroup: (groupId: string) => void;
  readonly handleCreateGroup: () => Promise<void>;
  readonly handleDeleteGroup: () => Promise<void>;
  readonly handleAddMember: () => Promise<void>;
  readonly handleRoleChange: (
    membershipId: string,
    role: string,
  ) => Promise<void>;
  readonly handleRemoveMember: (membershipId: string) => Promise<void>;
}

export function useGroupManagement(
  initialGroups: readonly GroupItem[],
): UseGroupManagementResult {
  const [groups, setGroups] = useState<readonly GroupItem[]>(initialGroups);
  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    initialGroups[0]?.id ?? "",
  );
  const [members, setMembers] = useState<readonly MemberItem[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRole, setMemberRole] = useState<string>(GroupRole.USER);
  const [deleteMembers, setDeleteMembers] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const actionDeps = {
    selectedGroupId,
    newGroupName,
    memberEmail,
    memberRole,
    deleteMembers,
    setGroups,
    setSelectedGroupId,
    setMembers,
    setNewGroupName,
    setMemberEmail,
    setMessage,
  };

  return {
    groups,
    selectedGroupId,
    members,
    newGroupName,
    memberEmail,
    memberRole,
    deleteMembers,
    message,
    setNewGroupName,
    setMemberEmail,
    setMemberRole,
    setDeleteMembers,
    handleSelectGroup: (groupId) => {
      selectAdminGroup(groupId, actionDeps);
    },
    handleCreateGroup: () => createAdminGroupAction(actionDeps),
    handleDeleteGroup: () => deleteAdminGroupAction(actionDeps),
    handleAddMember: () => addGroupMemberAction(actionDeps),
    handleRoleChange: (membershipId, role) =>
      updateGroupMemberRoleAction(membershipId, role, actionDeps),
    handleRemoveMember: (membershipId) =>
      removeGroupMemberAction(membershipId, actionDeps),
  };
}
