import type { InviteListItem } from "@/features/projects/access/utils/projectAccessApi.types";

export const fetchDisplayNamePresets = async (projectId: string) => {
  const response = await fetch(
    `/api/projects/${projectId}/display-name-presets`,
    { cache: "no-store" },
  );
  return response.json() as Promise<{
    readonly presets?: readonly string[];
    readonly available?: readonly string[];
    readonly suggested?: string;
  }>;
};

export const fetchProjectInvites = async (projectId: string) => {
  const response = await fetch(`/api/projects/${projectId}/invites`, {
    cache: "no-store",
  });
  return response.json() as Promise<{
    readonly invites?: readonly InviteListItem[];
    readonly ok?: boolean;
    readonly errorMessage?: string;
  }>;
};

export const createProjectInviteApi = async (
  projectId: string,
  body?: Record<string, unknown>,
) => {
  const response = await fetch(`/api/projects/${projectId}/invites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  return response.json() as Promise<{
    readonly inviteId?: string;
    readonly url?: string;
    readonly token?: string;
    readonly expiresAt?: string;
    readonly maxUses?: number;
    readonly usesRemaining?: number;
    readonly teamLabel?: string | null;
    readonly scopes?: readonly string[];
    readonly ok?: boolean;
    readonly errorMessage?: string;
  }>;
};

export const revokeProjectInviteApi = async (
  projectId: string,
  inviteId: string,
): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  const response = await fetch(
    `/api/projects/${projectId}/invites/${inviteId}`,
    { method: "DELETE" },
  );
  if (response.status === 204) {
    return { ok: true };
  }
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly errorMessage?: string;
  }>;
};

export const renameMembershipDisplayNameApi = async (
  projectId: string,
  membershipId: string,
  projectDisplayName: string,
): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  const response = await fetch(
    `/api/projects/${projectId}/memberships/${membershipId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectDisplayName }),
    },
  );
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly errorMessage?: string;
  }>;
};
