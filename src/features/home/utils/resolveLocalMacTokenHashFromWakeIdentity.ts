/**
 * Decide whether wake `/identity` may update the browser's local token hash.
 * Never replace an existing hash with a different account's active-profile hash
 * while that hash is still present on this Mac (HOME-032). Drop or remint when
 * the cookie hash is no longer installed here (HOME-061). Prefer the sole
 * reachable cloud row that matches a local install token (HOME-064).
 */
export const resolveLocalMacTokenHashFromWakeIdentity = (input: {
  readonly currentTokenHash: string | null;
  readonly activeTokenHash: string | null;
  readonly localTokenHashes: readonly string[];
  readonly soleReachableLocalTokenHash?: string | null;
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
  const soleReachable = normalize(input.soleReachableLocalTokenHash ?? null);
  const localHashes = input.localTokenHashes
    .map((hash) => normalize(hash))
    .filter((hash): hash is string => hash !== null);

  const currentReachable =
    input.currentTokenHashMatchesReachableDevice === true;
  const activeReachable = input.activeTokenHashMatchesReachableDevice === true;

  if (current !== null && currentReachable) {
    return current;
  }

  if (soleReachable !== null && current !== soleReachable) {
    const currentOnLocalInstall =
      current !== null && localHashes.includes(current);
    if (current === null || !currentOnLocalInstall || !currentReachable) {
      return soleReachable;
    }
  }

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
    if (localHashes.length === 1) {
      return localHashes[0] ?? null;
    }
    return null;
  }

  if (soleReachable !== null) {
    return soleReachable;
  }

  if (localHashes.length === 1) {
    return localHashes[0] ?? null;
  }

  if (localHashes.length === 0) {
    return active;
  }

  return null;
};
