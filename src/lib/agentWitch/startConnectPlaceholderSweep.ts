import { revokeStaleConnectPlaceholders } from "@/lib/agentWitch/revokeStaleConnectPlaceholders";

export const CONNECT_PLACEHOLDER_SWEEP_INTERVAL_MS = 15 * 60 * 1000;

/** 544db9dd: revoke Connect placeholders past their TTL, now and every 15 min. */
export const startConnectPlaceholderSweep = (
  schedule: (run: () => void, intervalMs: number) => unknown = setInterval,
): void => {
  const sweep = (): void => {
    void revokeStaleConnectPlaceholders().catch((error: unknown) => {
      console.error("[agent-witch/devices] placeholder sweep failed", error);
    });
  };
  sweep();
  schedule(sweep, CONNECT_PLACEHOLDER_SWEEP_INTERVAL_MS);
};
