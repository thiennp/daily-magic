export interface AgentWitchSocketStore {
  socket: WebSocket | null;
}

export const createAgentWitchSocketStore = (): AgentWitchSocketStore => ({
  socket: null,
});
