import type {
  HumanInviteListItem,
  SendHumanInviteEmailBody,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

type ErrorEnvelope = {
  readonly ok?: boolean;
  readonly code?: string;
  readonly errorMessage?: string;
};

export type HumanInviteEmailApiResult<T> =
  | ({ readonly ok: true } & T)
  | {
      readonly ok: false;
      readonly code?: string;
      readonly errorMessage?: string;
    };

const postJson = async <T>(
  url: string,
  body?: unknown,
): Promise<HumanInviteEmailApiResult<T>> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  if (response.status === 401) {
    return { ok: false, code: "unauthorized", errorMessage: "Unauthorized" };
  }
  const payload = (await response.json().catch(() => ({}))) as ErrorEnvelope &
    T;
  if (!response.ok) {
    return {
      ok: false,
      code: payload.code,
      errorMessage: payload.errorMessage,
    };
  }
  return { ...payload, ok: true };
};

/** POST /api/projects/{id}/human-invites/email — 201 { invite } (no token/link). */
export const sendHumanInviteEmailApi = (
  projectId: string,
  body: SendHumanInviteEmailBody,
) =>
  postJson<{ readonly invite: HumanInviteListItem }>(
    `/api/projects/${projectId}/human-invites/email`,
    body,
  );

export const approveHumanInviteApi = (projectId: string, inviteId: string) =>
  postJson<{ readonly membershipId: string }>(
    `/api/projects/${projectId}/human-invites/${inviteId}/approve`,
  );

export const denyHumanInviteApi = (projectId: string, inviteId: string) =>
  postJson<{ readonly inviteId: string }>(
    `/api/projects/${projectId}/human-invites/${inviteId}/deny`,
  );
