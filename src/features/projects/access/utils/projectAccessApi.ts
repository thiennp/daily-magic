export type AccessMembershipView = {
  readonly id: string;
  readonly userId: string;
  readonly teamLabel: string | null;
  readonly scopes: readonly string[];
  readonly createdAt: string;
  readonly projectDisplayName: string | null;
  readonly isAgent: boolean;
  readonly status?: string;
  readonly role?: string;
};

export type AccessPendingView = {
  readonly id: string;
  readonly requesterUserId: string;
  readonly reason: string | null;
  readonly createdAt: string;
  readonly requesterIsAgent?: boolean;
  readonly requesterLabel?: string | null;
  readonly teamLabel?: string | null;
  readonly requestedScopes?: readonly string[];
  readonly expiresAt?: string | null;
};

export type InviteListItem = {
  readonly inviteId: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly revokedAt: string | null;
  readonly maxUses: number;
  readonly usesRemaining: number;
  readonly teamLabel: string | null;
  readonly scopes: readonly string[];
};

export const fetchProjectAccess = async (projectId: string) => {
  const response = await fetch(`/api/projects/${projectId}/access`, {
    cache: "no-store",
  });
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly members?: readonly AccessMembershipView[];
    readonly pendingRequests?: readonly AccessPendingView[];
    readonly errorMessage?: string;
  }>;
};

export const postProjectAccessAction = async (
  url: string,
  body?: Record<string, unknown>,
): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly errorMessage?: string;
  }>;
};

export const fetchProjectFolderRefs = async (projectId: string) => {
  const response = await fetch(`/api/projects/${projectId}/folder-refs`, {
    cache: "no-store",
  });
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly folderRefs?: readonly {
      readonly id: string;
      readonly machineOrDeviceRef: string;
      readonly folderPath: string;
    }[];
  }>;
};

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
