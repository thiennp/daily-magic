export type AgentWitchDashboardMessageListener = (raw: string) => void;

export interface AgentWitchDashboardBus {
  readonly subscribe: (
    listener: AgentWitchDashboardMessageListener,
  ) => () => void;
  readonly publish: (raw: string) => void;
}

export const createAgentWitchDashboardBus = (): AgentWitchDashboardBus => {
  const listeners = new Set<AgentWitchDashboardMessageListener>();

  return {
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    publish: (raw) => {
      for (const listener of listeners) {
        listener(raw);
      }
    },
  };
};
