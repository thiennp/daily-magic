import type {
  AwcInviteCreateRequest,
  AwcInviteCreateResponse,
  AwcInviteListItem,
} from "@/features/projects/access/types/awcProjectAccessContract.type";

export type ProjectInvitesListResult =
  | { readonly ok: true; readonly invites: readonly AwcInviteListItem[] }
  | { readonly ok: false; readonly errorMessage: string; readonly status: number };

export type ProjectInviteCreateResult =
  | { readonly ok: true; readonly invite: AwcInviteCreateResponse }
  | { readonly ok: false; readonly errorMessage: string; readonly status: number };

export type ProjectInviteRevokeResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly errorMessage: string; readonly status: number };

const readErrorMessage = async (
  response: Response,
  fallback: string,
): Promise<string> => {
  const body: unknown = await response.json().catch(() => null);
  if (
    typeof body === "object" &&
    body !== null &&
    typeof (body as { errorMessage?: unknown }).errorMessage === "string"
  ) {
    return (body as { errorMessage: string }).errorMessage;
  }
  return fallback;
};

export const fetchProjectInvites = async (
  projectId: string,
): Promise<ProjectInvitesListResult> => {
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(projectId)}/invites`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        errorMessage: await readErrorMessage(
          response,
          "Could not load invites.",
        ),
      };
    }
    const body: unknown = await response.json().catch(() => null);
    const invites =
      typeof body === "object" &&
      body !== null &&
      Array.isArray((body as { invites?: unknown }).invites)
        ? ((body as { invites: AwcInviteListItem[] }).invites)
        : [];
    return { ok: true, invites };
  } catch {
    return {
      ok: false,
      status: 0,
      errorMessage: "Could not load invites.",
    };
  }
};

export const createProjectInvite = async (
  projectId: string,
  request: AwcInviteCreateRequest = {},
): Promise<ProjectInviteCreateResult> => {
  const payload = {
    maxUses: request.maxUses ?? 1,
    expiresInDays: request.expiresInDays ?? 7,
    ...(request.teamLabel !== undefined
      ? { teamLabel: request.teamLabel }
      : {}),
    ...(request.scopes !== undefined ? { scopes: request.scopes } : {}),
  };

  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(projectId)}/invites`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        errorMessage: await readErrorMessage(
          response,
          "Could not create invite.",
        ),
      };
    }
    const body = (await response.json()) as AwcInviteCreateResponse;
    if (!body?.inviteId || !body?.url) {
      return {
        ok: false,
        status: response.status,
        errorMessage: "Invite create response missing inviteId/url.",
      };
    }
    return { ok: true, invite: body };
  } catch {
    return {
      ok: false,
      status: 0,
      errorMessage: "Could not create invite.",
    };
  }
};

export const revokeProjectInvite = async (
  projectId: string,
  inviteId: string,
): Promise<ProjectInviteRevokeResult> => {
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(projectId)}/invites/${encodeURIComponent(inviteId)}`,
      { method: "DELETE" },
    );
    if (response.status === 204 || response.ok) {
      return { ok: true };
    }
    return {
      ok: false,
      status: response.status,
      errorMessage: await readErrorMessage(
        response,
        "Could not revoke invite.",
      ),
    };
  } catch {
    return {
      ok: false,
      status: 0,
      errorMessage: "Could not revoke invite.",
    };
  }
};
