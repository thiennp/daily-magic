import { COMPANY_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";

interface ApiErrorPayload {
  readonly error?: string;
}

const companyLabel = COMPANY_ENTITY_LABEL.toLowerCase();

const readApiError = (
  payload: ApiErrorPayload,
  fallbackMessage: string,
): string => payload.error ?? fallbackMessage;

export async function createAdminGroup(name: string): Promise<string | null> {
  const response = await fetch("/api/admin/groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const payload = (await response.json()) as ApiErrorPayload;

  if (!response.ok) {
    return readApiError(payload, `Could not create ${companyLabel}.`);
  }

  return null;
}

export async function deleteAdminGroup(
  groupId: string,
  deleteMembers: boolean,
): Promise<string | null> {
  const response = await fetch("/api/admin/groups", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      groupId,
      deleteMembers,
    }),
  });
  const payload = (await response.json()) as ApiErrorPayload;

  if (!response.ok) {
    return readApiError(payload, `Could not delete ${companyLabel}.`);
  }

  return null;
}

export async function addGroupMember(
  groupId: string,
  email: string,
  role: string,
): Promise<string | null> {
  const response = await fetch(`/api/admin/groups/${groupId}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, role }),
  });
  const payload = (await response.json()) as ApiErrorPayload;

  if (!response.ok) {
    return readApiError(payload, "Could not add member.");
  }

  return null;
}

export async function updateGroupMemberRole(
  groupId: string,
  membershipId: string,
  role: string,
): Promise<string | null> {
  const response = await fetch(`/api/admin/groups/${groupId}/members`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ membershipId, role }),
  });
  const payload = (await response.json()) as ApiErrorPayload;

  if (!response.ok) {
    return readApiError(payload, "Could not update role.");
  }

  return null;
}

export async function removeGroupMember(
  groupId: string,
  membershipId: string,
): Promise<string | null> {
  const response = await fetch(`/api/admin/groups/${groupId}/members`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ membershipId }),
  });
  const payload = (await response.json()) as ApiErrorPayload;

  if (!response.ok) {
    return readApiError(payload, "Could not remove member.");
  }

  return null;
}
