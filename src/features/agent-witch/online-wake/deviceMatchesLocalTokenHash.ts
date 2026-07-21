export const deviceMatchesLocalTokenHash = (
  deviceTokenHash: string | null | undefined,
  localTokenHash: string,
): boolean => {
  if (
    deviceTokenHash === null ||
    deviceTokenHash === undefined ||
    deviceTokenHash.trim().length === 0
  ) {
    return false;
  }

  return (
    deviceTokenHash.trim().toLowerCase() === localTokenHash.trim().toLowerCase()
  );
};
