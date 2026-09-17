/**
 * AWI nested slice `hub-connection` — WebSocket hub client types (FSA boundary).
 * Implementation: `apps/install/entry/startAgentWitchClient.ts` (AWL script bridge).
 */
export type AgentWitchOutboundSocket = {
  readonly readyState: number;
  send(data: string): void;
};
