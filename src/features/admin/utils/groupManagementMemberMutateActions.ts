import type { GroupManagementMutationDeps } from "@/features/admin/utils/groupManagementMutateActions.types";
import { loadGroupMembersForSelection } from "@/features/admin/utils/groupManagementLoadActions";
import {
  addGroupMember,
  removeGroupMember,
  updateGroupMemberRole,
} from "@/features/admin/utils/mutateGroupManagement";

const refreshSelectedGroupMembers = async (
  deps: GroupManagementMutationDeps,
): Promise<void> => {
  await loadGroupMembersForSelection(deps.selectedGroupId, deps);
};

export const addGroupMemberAction = async (
  deps: GroupManagementMutationDeps,
): Promise<void> => {
  if (!deps.selectedGroupId) {
    return;
  }

  const errorMessage = await addGroupMember(
    deps.selectedGroupId,
    deps.memberEmail,
    deps.memberRole,
  );

  if (errorMessage) {
    deps.setMessage(errorMessage);
    return;
  }

  deps.setMemberEmail("");
  deps.setMessage("Member added.");
  await refreshSelectedGroupMembers(deps);
};

export const updateGroupMemberRoleAction = async (
  membershipId: string,
  role: string,
  deps: GroupManagementMutationDeps,
): Promise<void> => {
  if (!deps.selectedGroupId) {
    return;
  }

  const errorMessage = await updateGroupMemberRole(
    deps.selectedGroupId,
    membershipId,
    role,
  );

  if (errorMessage) {
    deps.setMessage(errorMessage);
    return;
  }

  deps.setMessage("Role updated.");
  await refreshSelectedGroupMembers(deps);
};

export const removeGroupMemberAction = async (
  membershipId: string,
  deps: GroupManagementMutationDeps,
): Promise<void> => {
  if (!deps.selectedGroupId) {
    return;
  }

  const errorMessage = await removeGroupMember(
    deps.selectedGroupId,
    membershipId,
  );

  if (errorMessage) {
    deps.setMessage(errorMessage);
    return;
  }

  deps.setMessage("Member removed.");
  await refreshSelectedGroupMembers(deps);
};
