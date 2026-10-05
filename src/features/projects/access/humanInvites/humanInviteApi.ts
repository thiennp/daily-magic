import type {
  AcceptHumanInviteResponse,
  CreateHumanInviteBody,
  CreateHumanInviteResponse,
  HumanInviteListItem,
  RemoveHumanMemberResponse,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

type ErrorEnvelope = {
  readonly ok?: false;
  readonly code?: string;
  readonly errorMessage?: string;
};

export const fetchHumanInvites = async (
  projectId: string,
): Promise<{
  readonly ok: boolean;
  readonly invites: readonly HumanInviteListItem[];
  readonly errorMessage?: string;
  readonly code?: string;
}> => {
  const response = await fetch(`/api/projects/${projectId}/human-invites`, {
    cache: "no-store",
  });
  if (response.status === 401) {
    return {
      ok: false,
      invites: [],
      code: "unauthorized",
      errorMessage: "Unauthorized",
    };
  }
  const body = (await response.json().catch(() => ({}))) as {
    readonly invites?: readonly HumanInviteListItem[];
  } & ErrorEnvelope;
  if (!response.ok) {
    return {
      ok: false,
      invites: [],
      code: body.code,
      errorMessage: body.errorMessage ?? "Could not load people invites.",
    };
  }
  return { ok: true, invites: body.invites ?? [] };
};

export const createHumanInviteApi = async (
  projectId: string,
  body: CreateHumanInviteBody,
): Promise<
  | ({ readonly ok: true } & CreateHumanInviteResponse)
  | { readonly ok: false; readonly errorMessage: string; readonly code?: string }
> => {
  const response = await fetch(`/api/projects/${projectId}/human-invites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await response.json().catch(() => ({}))) as Partial<
    CreateHumanInviteResponse
  > &
    ErrorEnvelope;
  if (!response.ok) {
    return {
      ok: false,
      code: payload.code,
      errorMessage: payload.errorMessage ?? "Could not create invite. Try again.",
    };
  }
  return {
    ok: true,
    inviteId: String(payload.inviteId ?? ""),
    url: String(payload.url ?? ""),
    token: String(payload.token ?? ""),
    role: payload.role ?? "member",
    email: payload.email ?? null,
    expiresAt: String(payload.expiresAt ?? ""),
    maxUses: Number(payload.maxUses ?? 1),
    usesRemaining: Number(payload.usesRemaining ?? 1),
  };
};

export const revokeHumanInviteApi = async (
  projectId: string,
  inviteId: string,
): Promise<{
  readonly ok: boolean;
  readonly errorMessage?: string;
  readonly code?: string;
}> => {
  const response = await fetch(
    `/api/projects/${projectId}/human-invites/${inviteId}`,
    { method: "DELETE" },
  );
  if (response.status === 204) {
    return { ok: true };
  }
  if (response.status === 401) {
    return { ok: false, code: "unauthorized", errorMessage: "Unauthorized" };
  }
  const payload = (await response.json().catch(() => ({}))) as ErrorEnvelope;
  return {
    ok: false,
    code: payload.code,
    errorMessage: payload.errorMessage ?? "Could not revoke invite. Try again.",
  };
};

export const removeHumanMemberApi = async (
  projectId: string,
  membershipId: string,
): Promise<
  | ({ readonly ok: true } & RemoveHumanMemberResponse)
  | { readonly ok: false; readonly errorMessage: string; readonly code?: string }
> => {
  const response = await fetch(
    `/api/projects/${projectId}/human-members/${membershipId}/remove`,
    { method: "POST" },
  );
  const payload = (await response.json().catch(() => ({}))) as Partial<
    RemoveHumanMemberResponse
  > &
    ErrorEnvelope;
  if (!response.ok) {
    return {
      ok: false,
      code: payload.code,
      errorMessage: payload.errorMessage ?? "Could not remove member. Try again.",
    };
  }
  return {
    ok: true,
    membershipId: String(payload.membershipId ?? membershipId),
    status: "revoked",
  };
};

export const acceptHumanInviteApi = async (
  token: string,
): Promise<
  | AcceptHumanInviteResponse
  | {
      readonly ok: false;
      readonly status: number;
      readonly code?: string;
      readonly errorMessage?: string;
    }
> => {
  const response = await fetch(
    `/api/invite/h/${encodeURIComponent(token)}/accept`,
    { method: "POST" },
  );
  if (response.status === 401) {
    return { ok: false, status: 401, code: "unauthorized" };
  }
  const payload = (await response.json().catch(() => ({}))) as Partial<
    AcceptHumanInviteResponse
  > &
    ErrorEnvelope;
  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      code: payload.code,
      errorMessage: payload.errorMessage,
    };
  }
  return {
    ok: true,
    projectId: String(payload.projectId ?? ""),
    membershipId: String(payload.membershipId ?? ""),
    role: payload.role ?? "member",
    status: String(payload.status ?? "active"),
  };
};
