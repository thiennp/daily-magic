const activeRunIds = new Set<string>();

export const registerAgentRunLiveTerminal = (runId: string): (() => void) => {
  activeRunIds.add(runId);
  return () => {
    activeRunIds.delete(runId);
  };
};

export const isAgentRunLiveTerminalActive = (runId: string): boolean =>
  activeRunIds.has(runId);
