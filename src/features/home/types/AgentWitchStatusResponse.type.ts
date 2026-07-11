import type ConnectedClient from "@/features/home/types/ConnectedClient.type";

export default interface AgentWitchStatusResponse {
  readonly clients?: readonly ConnectedClient[];
  readonly agentCount?: number;
  readonly dashboardCount?: number;
  readonly error?: string;
}
