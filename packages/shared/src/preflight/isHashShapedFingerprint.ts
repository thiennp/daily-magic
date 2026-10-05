/** Hex git/sha fingerprints: 7–64 hex chars, optional sha1:/sha256: prefix. */
const HASH_FINGERPRINT =
  /^(?:sha256:|sha1:)?[a-fA-F0-9]{7,64}$/;

export const isHashShapedFingerprint = (value: string): boolean =>
  HASH_FINGERPRINT.test(value.trim());
