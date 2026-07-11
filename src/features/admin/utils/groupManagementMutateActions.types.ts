import type { Dispatch, SetStateAction } from "react";

import type {
  GroupItem,
  MemberItem,
} from "@/features/admin/types/groupManagement.types";

export interface GroupManagementMutationDeps {
  readonly selectedGroupId: string;
  readonly newGroupName: string;
  readonly memberEmail: string;
  readonly memberRole: string;
  readonly deleteMembers: boolean;
  readonly setGroups: Dispatch<SetStateAction<readonly GroupItem[]>>;
  readonly setSelectedGroupId: Dispatch<SetStateAction<string>>;
  readonly setMembers: Dispatch<SetStateAction<readonly MemberItem[]>>;
  readonly setNewGroupName: Dispatch<SetStateAction<string>>;
  readonly setMemberEmail: Dispatch<SetStateAction<string>>;
  readonly setMessage: Dispatch<SetStateAction<string | null>>;
}
