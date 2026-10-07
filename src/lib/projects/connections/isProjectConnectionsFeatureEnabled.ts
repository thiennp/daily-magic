/**
 * Whole-feature gate. Unset or "1"/"true"/"yes" → enabled.
 * "0"/"false"/"no"/"off" → GET returns 501 (UI unavailable).
 */
export const isProjectConnectionsFeatureEnabled = (): boolean => {
  const raw = process.env.PROJECT_CONNECTIONS_ENABLED;
  if (raw === undefined || raw.trim() === "") return true;
  const v = raw.trim().toLowerCase();
  if (v === "0" || v === "false" || v === "no" || v === "off") return false;
  return true;
};

export const resolveProjectConnectionsAuthSecret = (): string | null => {
  const authSecret = process.env.AUTH_SECRET;
  return typeof authSecret === "string" && authSecret.length > 0
    ? authSecret
    : null;
};
