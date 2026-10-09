const TTL_MS = 24 * 60 * 60 * 1000;
const MAX_ENTRIES = 20_000;

const seen = new Map<string, number>();

/**
 * A signed hello is accepted once: the nonce is chosen by the device and signed, so a captured hello
 * could otherwise be replayed. Remembers recent (key, nonce) pairs; false means "seen before".
 */
export const consumeDeviceAuthNonce = (
  devicePublicKey: string,
  nonce: string,
  now: number = Date.now(),
): boolean => {
  for (const [key, at] of seen) {
    if (now - at <= TTL_MS && seen.size <= MAX_ENTRIES) break;
    seen.delete(key);
  }
  const id = `${devicePublicKey}\n${nonce}`;
  if (seen.has(id)) return false;
  seen.set(id, now);
  return true;
};

export const resetDeviceAuthNonceCacheForTests = (): void => {
  seen.clear();
};
