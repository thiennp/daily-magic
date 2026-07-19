const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Reads `installBundleVersion` from a `system.ack` heartbeat payload. */
export const readInstallBundleVersionFromHeartbeatAck = (
  payload: unknown,
): string | null => {
  if (!isRecord(payload)) {
    return null;
  }

  const version = payload.installBundleVersion;
  if (typeof version !== "string") {
    return null;
  }

  const trimmed = version.trim();
  return trimmed.length > 0 ? trimmed : null;
};
