import type { ProjectGrokWebhookStatusView } from "@/features/projects/access/utils/projectGrokWebhookApi";

const path = (projectId: string, membershipId: string): string =>
  `/api/projects/${encodeURIComponent(projectId)}/memberships/${encodeURIComponent(membershipId)}/grok-webhook`;

export const fetchOwnedBotGrokWebhookStatus = async (
  projectId: string,
  membershipId: string,
): Promise<ProjectGrokWebhookStatusView> => {
  const response = await fetch(path(projectId, membershipId), {
    cache: "no-store",
  });
  return response.json() as Promise<ProjectGrokWebhookStatusView>;
};

export const saveOwnedBotGrokWebhook = async (
  projectId: string,
  membershipId: string,
  body: { readonly webhookUrl: string; readonly webhookKey: string },
): Promise<ProjectGrokWebhookStatusView> => {
  const response = await fetch(path(projectId, membershipId), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json() as Promise<ProjectGrokWebhookStatusView>;
};
