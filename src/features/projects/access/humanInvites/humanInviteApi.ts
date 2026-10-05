import type {
  CreateHumanInviteBody,
  CreateHumanInviteResponse,
  HumanInviteListItem,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export {
  acceptHumanInviteApi,
  removeHumanMemberApi,
  revokeHumanInviteApi,
} from "@/features/projects/access/humanInvites/humanInviteMutateApi";

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
  const invites = (body.invites ?? []).map((invite) => ({
    ...invite,
    requireEmailMatch: invite.requireEmailMatch === true,
  }));
  return { ok: true, invites };
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
    ErrorEnvelope & { readonly requireEmailMatch?: boolean };
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
    requireEmailMatch: payload.requireEmailMatch === true,
    expiresAt: String(payload.expiresAt ?? ""),
    maxUses: Number(payload.maxUses ?? 1),
    usesRemaining: Number(payload.usesRemaining ?? 1),
  };
};
