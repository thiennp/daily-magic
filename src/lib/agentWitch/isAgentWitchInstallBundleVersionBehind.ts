export const isAgentWitchInstallBundleVersionBehind = (
  localVersion: string | null | undefined,
  serverVersion: string,
): boolean => {
  const normalizedLocal = localVersion?.trim() ?? "";
  const normalizedServer = serverVersion.trim();

  if (normalizedServer.length === 0) {
    return false;
  }

  if (normalizedLocal.length === 0) {
    return true;
  }

  const localNumber = Number.parseInt(normalizedLocal, 10);
  const serverNumber = Number.parseInt(normalizedServer, 10);

  if (Number.isFinite(localNumber) && Number.isFinite(serverNumber)) {
    return serverNumber > localNumber;
  }

  return normalizedLocal !== normalizedServer;
};
