export const parseUpdateDeviceLabelBody = (
  body: unknown,
): string | undefined => {
  if (typeof body !== "object" || body === null) {
    return undefined;
  }

  const deviceLabel = (body as { deviceLabel?: unknown }).deviceLabel;
  if (typeof deviceLabel !== "string") {
    return undefined;
  }

  const trimmedLabel = deviceLabel.trim();
  if (trimmedLabel.length === 0 || trimmedLabel.length > 80) {
    return undefined;
  }

  return trimmedLabel;
};
