import type {
  AcceptHumanInviteBody,
  AcceptHumanInviteFailure,
  AcceptHumanInviteResponse,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

type ErrorEnvelope = {
  readonly ok?: false;
  readonly code?: string;
  readonly errorMessage?: string;
};

export const acceptHumanInviteApi = async (
  token: string,
  body: AcceptHumanInviteBody = {},
): Promise<AcceptHumanInviteResponse | AcceptHumanInviteFailure> => {
  const response = await fetch(
    `/api/invite/h/${encodeURIComponent(token)}/accept`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (response.status === 401) {
    return { ok: false, status: 401, code: "unauthorized" };
  }
  const payload = (await response.json().catch(() => ({}))) as Partial<
    AcceptHumanInviteResponse
  > &
    ErrorEnvelope & {
      readonly suggestedProjectDisplayName?: string | null;
      readonly invitedEmailMasked?: string | null;
    };
  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      code: payload.code,
      errorMessage: payload.errorMessage,
      suggestedProjectDisplayName:
        typeof payload.suggestedProjectDisplayName === "string"
          ? payload.suggestedProjectDisplayName
          : null,
      invitedEmailMasked:
        typeof payload.invitedEmailMasked === "string"
          ? payload.invitedEmailMasked
          : null,
    };
  }
  return {
    ok: true,
    projectId: String(payload.projectId ?? ""),
    membershipId: String(payload.membershipId ?? ""),
    role: payload.role ?? "member",
    status: String(payload.status ?? "active"),
    projectDisplayName: String(payload.projectDisplayName ?? ""),
  };
};
