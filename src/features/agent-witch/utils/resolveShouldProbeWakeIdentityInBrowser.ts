/**
 * Avoid loopback wake probes (and DevTools ERR_CONNECTION_REFUSED noise) when
 * identity is already known or the UI does not need a this-Mac match yet.
 * Re-probe when a stored hash only matches an offline (or missing) claim so the
 * this computer badge can move to the live install (HOME-061).
 */
export const resolveShouldProbeWakeIdentityInBrowser = (input: {
  readonly localTokenHash: string | null;
  readonly claimedDeviceCount: number;
  readonly probeSuppressed: boolean;
  readonly localTokenHashMatchesReachableDevice?: boolean;
}): boolean => {
  if (input.claimedDeviceCount === 0) {
    return false;
  }

  const hashLooksStaleForReachableMatch =
    input.localTokenHash !== null &&
    input.localTokenHashMatchesReachableDevice === false;

  if (input.probeSuppressed && !hashLooksStaleForReachableMatch) {
    return false;
  }

  if (input.localTokenHash === null) {
    return true;
  }

  if (hashLooksStaleForReachableMatch) {
    return true;
  }

  return false;
};
