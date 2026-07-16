const subscriptionsByClientId = new Map<string, Set<string>>();

export const buildRunTerminalSubscriptionKey = (runId: string): string =>
  `run:${runId}`;

export const buildWriterSessionTerminalSubscriptionKey = (
  writerSessionId: string,
): string => `writer_session:${writerSessionId}`;

export const subscribeDashboardTerminal = (
  clientId: string,
  subscriptionKey: string,
): void => {
  const existing = subscriptionsByClientId.get(clientId) ?? new Set<string>();
  existing.add(subscriptionKey);
  subscriptionsByClientId.set(clientId, existing);
};

export const isDashboardTerminalSubscribed = (
  clientId: string,
  subscriptionKey: string,
): boolean =>
  subscriptionsByClientId.get(clientId)?.has(subscriptionKey) === true;

export const clearDashboardTerminalSubscriptions = (clientId: string): void => {
  subscriptionsByClientId.delete(clientId);
};

export const clearDashboardTerminalSubscriptionsForTests = (): void => {
  subscriptionsByClientId.clear();
};
