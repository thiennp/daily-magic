import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";

export const buildDashboardHttpSender = (
  userId: string,
  email?: string | null,
): AgentWitchHubClient => ({
  id: `dashboard-http-${userId}`,
  role: "dashboard",
  userId,
  ...(email !== undefined && email !== null ? { email } : {}),
  send: () => undefined,
});
