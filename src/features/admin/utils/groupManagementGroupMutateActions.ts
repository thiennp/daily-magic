import type { GroupManagementMutationDeps } from "@/features/admin/utils/groupManagementMutateActions.types";
import { loadAdminGroups } from "@/features/admin/utils/groupManagementLoadActions";
import {
  createAdminGroup,
  deleteAdminGroup,
} from "@/features/admin/utils/mutateGroupManagement";

export const createAdminGroupAction = async (
  deps: GroupManagementMutationDeps,
): Promise<void> => {
  const errorMessage = await createAdminGroup(deps.newGroupName);

  if (errorMessage) {
    deps.setMessage(errorMessage);
    return;
  }

  deps.setNewGroupName("");
  deps.setMessage("Group created.");
  await loadAdminGroups(deps);
};

export const deleteAdminGroupAction = async (
  deps: GroupManagementMutationDeps,
): Promise<void> => {
  if (!deps.selectedGroupId) {
    return;
  }

  const errorMessage = await deleteAdminGroup(
    deps.selectedGroupId,
    deps.deleteMembers,
  );

  if (errorMessage) {
    deps.setMessage(errorMessage);
    return;
  }

  deps.setSelectedGroupId("");
  deps.setMembers([]);
  deps.setMessage("Group deleted.");
  await loadAdminGroups(deps);
};
