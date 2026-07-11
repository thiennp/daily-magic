export const formatPairedDeviceTimestamp = (value: string | null): string => {
  if (value === null) {
    return "—";
  }

  return new Date(value).toLocaleString();
};
