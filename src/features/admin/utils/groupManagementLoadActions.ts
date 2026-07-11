import type { Dispatch, SetStateAction } from "react";

import type {
  GroupItem,
  MemberItem,
} from "@/features/admin/types/groupManagement.types";
import {
  fetchAdminGroups,
  fetchGroupMembers,
} from "@/features/admin/utils/fetchGroupManagementData";

interface GroupManagementLoadDeps {
  readonly setGroups: Dispatch<SetStateAction<readonly GroupItem[]>>;
  readonly setSelectedGroupId: Dispatch<SetStateAction<string>>;
  readonly setMembers: Dispatch<SetStateAction<readonly MemberItem[]>>;
  readonly setMessage: Dispatch<SetStateAction<string | null>>;
}

export const loadAdminGroups = async (
  deps: GroupManagementLoadDeps,
): Promise<void> => {
  const result = await fetchAdminGroups();

  if (result.errorMessage) {
    deps.setMessage(result.errorMessage);
    return;
  }

  deps.setGroups(result.groups);
  deps.setSelectedGroupId((current) => current || result.groups[0]?.id || "");
};

export const loadGroupMembersForSelection = async (
  groupId: string,
  deps: Pick<GroupManagementLoadDeps, "setMembers" | "setMessage">,
): Promise<void> => {
  if (!groupId) {
    deps.setMembers([]);
    return;
  }

  const result = await fetchGroupMembers(groupId);

  if (result.errorMessage) {
    deps.setMessage(result.errorMessage);
    return;
  }

  deps.setMembers(result.members);
};

export const selectAdminGroup = (
  groupId: string,
  deps: GroupManagementLoadDeps,
): void => {
  deps.setSelectedGroupId(groupId);
  void loadGroupMembersForSelection(groupId, deps);
};
