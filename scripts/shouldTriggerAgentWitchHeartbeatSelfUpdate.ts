/** True when heartbeat ACK advertise a different install bundle than local. */
export const shouldTriggerAgentWitchHeartbeatSelfUpdate = (input: {
  readonly localBundleVersion: string | null;
  readonly remoteBundleVersion: string | null;
}): boolean => {
  if (
    input.remoteBundleVersion === null ||
    input.remoteBundleVersion.trim().length === 0
  ) {
    return false;
  }

  const remote = input.remoteBundleVersion.trim();
  const local = input.localBundleVersion?.trim() ?? "";

  return local !== remote;
};
