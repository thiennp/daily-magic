const activeRunIds = new Set<string>();

export const registerAgentLiveProgressFeed = (runId: string): (() => void) => {
  activeRunIds.add(runId);
  return () => {
    activeRunIds.delete(runId);
  };
};

export const isAgentLiveProgressFeedActive = (runId: string): boolean =>
  activeRunIds.has(runId);

export const isAnyAgentLiveProgressFeedActive = (): boolean =>
  activeRunIds.size > 0;
