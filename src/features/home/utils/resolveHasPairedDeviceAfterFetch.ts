export const resolveHasPairedDeviceAfterFetch = (
  currentHasPairedDevice: boolean,
  deviceCount: number,
  errorMessage: string | null,
): boolean => {
  if (deviceCount > 0) {
    return true;
  }

  if (errorMessage !== null) {
    return currentHasPairedDevice;
  }

  return false;
};
