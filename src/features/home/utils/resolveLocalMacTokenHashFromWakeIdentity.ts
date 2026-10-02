/**
 * Decide whether wake `/identity` may update the browser's local token hash.
 * Never replace an existing hash with a different account's active-profile hash
 * while that hash is still present on this Mac (HOME-032). Drop or remint when
 * the cookie hash is no longer installed here (HOME-061).
 */
export const resolveLocalMacTokenHashFromWakeIdentity = (input: {
  readonly currentTokenHash: string | null;
  readonly activeTokenHash: string | null;
  readonly localTokenHashes: readonly string[];
  readonly currentTokenHashMatchesReachableDevice?: boolean;
  readonly activeTokenHashMatchesReachableDevice?: boolean;
}): string | null => {
  const normalize = (value: string | null | undefined): string | null => {
    if (value === null || value === undefined) {
      return null;
    }
    const trimmed = value.trim().toLowerCase();
    return trimmed.length > 0 ? trimmed : null;
  };

  const current = normalize(input.currentTokenHash);
  const active = normalize(input.activeTokenHash);
  const localHashes = input.localTokenHashes
    .map((hash) => normalize(hash))
    .filter((hash): hash is string => hash !== null);

  const currentReachable =
    input.currentTokenHashMatchesReachableDevice === true;
  const activeReachable = input.activeTokenHashMatchesReachableDevice === true;

  if (
    current !== null &&
    active !== null &&
    current !== active &&
    !currentReachable &&
    activeReachable &&
    localHashes.includes(active)
  ) {
    return active;
  }

  if (current !== null) {
    if (localHashes.length === 0) {
      return current;
    }
    if (localHashes.includes(current)) {
      return current;
    }
    // Cookie hash is not on this Mac anymore (repaired / reconnected install).
    if (localHashes.length === 1) {
      return localHashes[0] ?? null;
    }
    return null;
  }

  if (localHashes.length === 1) {
    return localHashes[0] ?? null;
  }

  if (localHashes.length === 0) {
    return active;
  }

  // Multiple accounts on this Mac: do not guess which browser session owns.
  return null;
};
