/** Owner / inviter actions on one assistant seat. */
export const setBotRestrictionsApi = async (
  projectId: string,
  membershipId: string,
  change: { readonly isolated?: boolean; readonly closed?: boolean },
): Promise<boolean> => {
  const response = await fetch(
    `/api/projects/${projectId}/memberships/${membershipId}/isolation`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(change),
    },
  );
  return response.ok;
};

export const sendBotGuidanceApi = async (
  projectId: string,
  membershipId: string,
): Promise<boolean> => {
  const response = await fetch(
    `/api/projects/${projectId}/memberships/${membershipId}/guidance-update`,
    { method: "POST" },
  );
  return response.ok;
};

export type InviterChoiceView = {
  readonly userId: string;
  readonly label: string;
  readonly isYou: boolean;
};

/** Claim an assistant (no inviterUserId = you) or change who invited it. */
export const setBotInviterApi = async (
  projectId: string,
  membershipId: string,
  inviterUserId: string | null,
): Promise<boolean> => {
  const response = await fetch(
    `/api/projects/${projectId}/memberships/${membershipId}/inviter`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inviterUserId === null ? {} : { inviterUserId }),
    },
  );
  return response.ok;
};

export type OwnedBotOption = {
  readonly userId: string;
  readonly label: string;
  readonly suggestedName: string | null;
};

export const fetchOwnedBotsApi = async (
  projectId: string,
): Promise<readonly OwnedBotOption[] | null> => {
  const response = await fetch(`/api/projects/${projectId}/owned-bots`, {
    cache: "no-store",
  });
  if (!response.ok) return null;
  const body = (await response.json()) as { bots?: readonly OwnedBotOption[] };
  return body.bots ?? [];
};

export const addOwnedBotApi = async (
  projectId: string,
  input: { readonly botUserId: string; readonly projectDisplayName: string },
): Promise<{ readonly ok: boolean; readonly code?: string }> => {
  const response = await fetch(`/api/projects/${projectId}/owned-bots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (response.ok) return { ok: true };
  const body = (await response.json().catch(() => ({}))) as { code?: string };
  return { ok: false, code: body.code };
};
