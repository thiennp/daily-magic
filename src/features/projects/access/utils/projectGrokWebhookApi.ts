export type ProjectGrokWebhookStatusView = {
  readonly ok?: boolean;
  readonly grokWebhookRegistered?: boolean;
  readonly grokWebhookUrlHost?: string | null;
  readonly keySet?: boolean;
  readonly errorMessage?: string;
};

const grokWebhookPath = (projectId: string, membershipId: string): string =>
  `/api/projects/${encodeURIComponent(projectId)}/access/members/${encodeURIComponent(membershipId)}/grok-webhook`;

export const fetchMemberGrokWebhookStatus = async (
  projectId: string,
  membershipId: string,
): Promise<ProjectGrokWebhookStatusView> => {
  const response = await fetch(grokWebhookPath(projectId, membershipId), {
    cache: "no-store",
  });
  return response.json() as Promise<ProjectGrokWebhookStatusView>;
};

export const saveMemberGrokWebhook = async (
  projectId: string,
  membershipId: string,
  body: { readonly webhookUrl: string; readonly webhookKey: string },
): Promise<ProjectGrokWebhookStatusView> => {
  const response = await fetch(grokWebhookPath(projectId, membershipId), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json() as Promise<ProjectGrokWebhookStatusView>;
};
