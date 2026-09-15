export const resolveHeartbeatEmail = (
  payload: Readonly<Record<string, unknown>> | undefined,
  senderEmail: string | undefined,
): string | null => {
  if (typeof payload?.email === "string" && payload.email.trim().length > 0) {
    return payload.email.trim().toLowerCase();
  }

  if (senderEmail !== undefined && senderEmail.trim().length > 0) {
    return senderEmail.trim().toLowerCase();
  }

  return null;
};

export const resolveHeartbeatInstallBundleVersion = (
  payload: Readonly<Record<string, unknown>> | undefined,
): string | null => {
  if (typeof payload?.installBundleVersion !== "string") {
    return null;
  }

  const trimmedVersion = payload.installBundleVersion.trim();
  return trimmedVersion.length > 0 ? trimmedVersion : null;
};

export const resolveHeartbeatWakePort = (
  payload: Readonly<Record<string, unknown>> | undefined,
): number | null => {
  const wakePortRaw = payload?.wakePort;
  if (typeof wakePortRaw !== "number" || !Number.isInteger(wakePortRaw)) {
    return null;
  }

  return wakePortRaw > 0 && wakePortRaw <= 65535 ? wakePortRaw : null;
};
