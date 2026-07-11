import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type {
  AgentWitchConnectedClient,
  AgentWitchHarnessManifestReport,
} from "./types/AgentWitchHubStatus.type";

export const buildAgentWitchHubStatus = (
  clients: readonly AgentWitchHubClient[],
): { readonly agentCount: number; readonly dashboardCount: number } => ({
  agentCount: clients.filter((client) => client.role === "agent").length,
  dashboardCount: clients.filter((client) => client.role === "dashboard")
    .length,
});

export const listConnectedAgentWitchClients = (
  clients: Map<string, AgentWitchHubClient>,
  connectedAtByClientId: Map<string, number>,
): readonly AgentWitchConnectedClient[] =>
  [...clients.values()]
    .map((client) => ({
      id: client.id,
      role: client.role,
      connectedAt: new Date(
        connectedAtByClientId.get(client.id) ?? Date.now(),
      ).toISOString(),
      userId: client.userId,
    }))
    .sort((left, right) => left.connectedAt.localeCompare(right.connectedAt));

export const listSortedHarnessManifestReports = (
  manifestByAgentClientId: Map<string, AgentWitchHarnessManifestReport>,
): readonly AgentWitchHarnessManifestReport[] =>
  [...manifestByAgentClientId.values()].sort((left, right) =>
    right.reportedAt.localeCompare(left.reportedAt),
  );
