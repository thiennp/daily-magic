/** History continue needs the Mac id stored on the run (CLI --continue is per device). */
export const canContinueAgentRunOnStoredMac = (
  deviceId: string | null | undefined,
): deviceId is string => typeof deviceId === "string" && deviceId.length > 0;
