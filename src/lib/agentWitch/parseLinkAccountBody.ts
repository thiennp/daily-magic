export interface LinkAccountBody {
  readonly pairingToken: string;
  readonly linkToken: string;
  readonly deviceLabel: string | null;
}

export const parseLinkAccountBody = (body: unknown): LinkAccountBody | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const pairingToken =
    typeof record.pairingToken === "string" ? record.pairingToken.trim() : "";
  const linkToken =
    typeof record.linkToken === "string" ? record.linkToken.trim() : "";
  const deviceLabel =
    typeof record.deviceLabel === "string" &&
    record.deviceLabel.trim().length > 0
      ? record.deviceLabel.trim()
      : null;

  if (pairingToken.length === 0 || linkToken.length === 0) {
    return null;
  }

  return { pairingToken, linkToken, deviceLabel };
};
