/**
 * Decide whether wake `/identity` may update the browser's local token hash.
 * Never replace an existing hash with a different account's active-profile hash.
 */
export const resolveLocalMacTokenHashFromWakeIdentity = (input: {
  readonly currentTokenHash: string | null;
  readonly activeTokenHash: string | null;
  readonly localTokenHashes: readonly string[];
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

  if (current !== null) {
    if (localHashes.length === 0 || localHashes.includes(current)) {
      return current;
    }
    // Stale cookie for a token no longer on this Mac — keep until Connect remints.
    return current;
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
