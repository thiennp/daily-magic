export type ProjectGrokWebhookStatusView = {
  readonly ok?: boolean;
  readonly grokWebhookRegistered?: boolean;
  readonly grokWebhookUrlHost?: string | null;
  readonly keySet?: boolean;
  readonly hmacWebhookRegistered?: boolean;
  readonly hmacWebhookUrlHost?: string | null;
  readonly secretSet?: boolean;
  /** GET only (DF-036): ISO time of the latest real wake attempt, or null. */
  readonly lastWakeAt?: string | null;
  /** GET only (DF-036): meta only, e.g. "HTTP 429", "HTTP 500", "Fetch failed (timeout, DNS or refused)", "Not postable"; null after a success. */
  readonly lastFailureReason?: string | null;
  readonly errorMessage?: string;
  /** PUT only: this save flipped delivery_mode poll → webhook. */
  readonly deliveryModeFlipped?: boolean;
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

/** Owner pre-registers the wake link of a still-pending join request (carried over on Approve). */
export const savePendingRequestWakeLink = async (
  projectId: string,
  requestId: string,
  body: { readonly webhookUrl: string; readonly webhookKey: string },
): Promise<ProjectGrokWebhookStatusView> => {
  const response = await fetch(
    `/api/projects/${encodeURIComponent(projectId)}/access/requests/${encodeURIComponent(requestId)}/wake-link`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  return response.json() as Promise<ProjectGrokWebhookStatusView>;
};
