/**
 * 2331ef53: the computer list was ordered by last heartbeat, so it reshuffled
 * every 30 seconds. Display order is now stable: newest connected computer
 * first, then id. Server-side picks still use the last-seen order.
 */
export const sortAgentWitchDevicesForDisplay = <
  T extends { readonly id: string; readonly claimedAt: string },
>(
  devices: readonly T[],
): readonly T[] =>
  [...devices].sort(
    (a, b) =>
      b.claimedAt.localeCompare(a.claimedAt) || a.id.localeCompare(b.id),
  );
