const normalizeHostLabel = (value: string): string =>
  value.trim().toLowerCase().replace(/\.local$/, "");

export const deviceLabelMatchesLocalHost = (
  deviceLabel: string | null,
  localHost: string,
): boolean => {
  if (deviceLabel === null) {
    return false;
  }

  return (
    normalizeHostLabel(deviceLabel) === normalizeHostLabel(localHost)
  );
};
