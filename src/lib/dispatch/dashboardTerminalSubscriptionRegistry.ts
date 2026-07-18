/**
 * Process-wide subscriptions so HTTP dispatch and WebSocket handlers share
 * one map (Next route bundles vs `server.ts` would otherwise diverge).
 */
const terminalSubscriptionGlobal = globalThis as typeof globalThis & {
  __dailyMagicDashboardTerminalSubscriptions?: Map<string, Set<string>>;
};

const subscriptionsByClientId = (): Map<string, Set<string>> => {
  if (
    terminalSubscriptionGlobal.__dailyMagicDashboardTerminalSubscriptions ===
    undefined
  ) {
    terminalSubscriptionGlobal.__dailyMagicDashboardTerminalSubscriptions =
      new Map();
  }
  return terminalSubscriptionGlobal.__dailyMagicDashboardTerminalSubscriptions;
};

export const buildRunTerminalSubscriptionKey = (runId: string): string =>
  `run:${runId}`;

export const buildWriterSessionTerminalSubscriptionKey = (
  writerSessionId: string,
): string => `writer_session:${writerSessionId}`;

export const subscribeDashboardTerminal = (
  clientId: string,
  subscriptionKey: string,
): void => {
  const existing = subscriptionsByClientId().get(clientId) ?? new Set<string>();
  existing.add(subscriptionKey);
  subscriptionsByClientId().set(clientId, existing);
};

export const isDashboardTerminalSubscribed = (
  clientId: string,
  subscriptionKey: string,
): boolean =>
  subscriptionsByClientId().get(clientId)?.has(subscriptionKey) === true;

export const clearDashboardTerminalSubscriptions = (clientId: string): void => {
  subscriptionsByClientId().delete(clientId);
};

export const clearDashboardTerminalSubscriptionsForTests = (): void => {
  subscriptionsByClientId().clear();
};
