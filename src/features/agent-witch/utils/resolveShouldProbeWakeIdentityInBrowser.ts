/**
 * Avoid loopback wake probes (and DevTools ERR_CONNECTION_REFUSED noise) when
 * identity is already known or the UI does not need a this-Mac match yet.
 */
export const resolveShouldProbeWakeIdentityInBrowser = (input: {
  readonly localTokenHash: string | null;
  readonly claimedDeviceCount: number;
  readonly probeSuppressed: boolean;
}): boolean => {
  if (input.probeSuppressed) {
    return false;
  }

  if (input.localTokenHash !== null) {
    return false;
  }

  if (input.claimedDeviceCount === 0) {
    return false;
  }

  return true;
};
