import type { RemoveHumanMemberResponse } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export { acceptHumanInviteApi } from "@/features/projects/access/humanInvites/acceptHumanInviteApi";

type ErrorEnvelope = {
  readonly ok?: false;
  readonly code?: string;
  readonly errorMessage?: string;
};

export const revokeHumanInviteApi = async (
  projectId: string,
  inviteId: string,
  options?: { readonly keepalive?: boolean },
): Promise<{
  readonly ok: boolean;
  readonly errorMessage?: string;
  readonly code?: string;
}> => {
  const response = await fetch(
    `/api/projects/${projectId}/human-invites/${inviteId}`,
    { method: "DELETE", keepalive: options?.keepalive === true },
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
  options?: { readonly keepalive?: boolean },
): Promise<
  | ({ readonly ok: true } & RemoveHumanMemberResponse)
  | { readonly ok: false; readonly errorMessage: string; readonly code?: string }
> => {
  const response = await fetch(
    `/api/projects/${projectId}/human-members/${membershipId}/remove`,
    { method: "POST", keepalive: options?.keepalive === true },
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
