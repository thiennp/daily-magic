import type {
  GroupItem,
  MemberItem,
} from "@/features/admin/types/groupManagement.types";

interface ApiErrorPayload {
  readonly error?: string;
}

export async function fetchAdminGroups(): Promise<{
  readonly groups: readonly GroupItem[];
  readonly errorMessage: string | null;
}> {
  const response = await fetch("/api/admin/groups");
  const payload = (await response.json()) as ApiErrorPayload & {
    groups?: GroupItem[];
  };

  if (!response.ok) {
    return {
      groups: [],
      errorMessage: payload.error ?? "Could not load groups.",
    };
  }

  return {
    groups: payload.groups ?? [],
    errorMessage: null,
  };
}

export async function fetchGroupMembers(groupId: string): Promise<{
  readonly members: readonly MemberItem[];
  readonly errorMessage: string | null;
}> {
  const response = await fetch(`/api/admin/groups/${groupId}/members`);
  const payload = (await response.json()) as ApiErrorPayload & {
    members?: MemberItem[];
  };

  if (!response.ok) {
    return {
      members: [],
      errorMessage: payload.error ?? "Could not load members.",
    };
  }

  return {
    members: payload.members ?? [],
    errorMessage: null,
  };
}
