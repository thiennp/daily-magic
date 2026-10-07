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
    readonly autoApprove?: boolean;
    readonly ok?: boolean;
    readonly errorMessage?: string;
  }>;
};

/** Owner-only: invite URL for a usable pending invite (107, any device). */
export const fetchProjectInvitePromptApi = async (
  projectId: string,
  inviteId: string,
): Promise<
  | { readonly ok: true; readonly url: string }
  | { readonly ok: false; readonly errorMessage?: string }
> => {
  try {
    const response = await fetch(
      `/api/projects/${projectId}/invites/${inviteId}/prompt`,
      { cache: "no-store" },
    );
    const body = (await response.json().catch(() => ({}))) as {
      readonly url?: unknown;
      readonly errorMessage?: unknown;
    };
    if (response.ok && typeof body.url === "string" && body.url.length > 0) {
      return { ok: true, url: body.url };
    }
    return {
      ok: false,
      errorMessage:
        typeof body.errorMessage === "string" ? body.errorMessage : undefined,
    };
  } catch {
    return { ok: false };
  }
};

export const updateProjectInviteAutoApproveApi = async (
  projectId: string,
  inviteId: string,
  autoApprove: boolean,
): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  const response = await fetch(
    `/api/projects/${projectId}/invites/${inviteId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ autoApprove }),
    },
  );
  if (!response.ok) {
    return response.json() as Promise<{
      readonly ok: boolean;
      readonly errorMessage?: string;
    }>;
  }
  return { ok: true };
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
