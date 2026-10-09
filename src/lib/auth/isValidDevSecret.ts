import { createHash, timingSafeEqual } from "node:crypto";

const digest = (value: string): Buffer =>
  createHash("sha256").update(value, "utf8").digest();

const isValidDevSecret = (candidate: string | null | undefined): boolean => {
  const configuredSecret = process.env.SECRET?.trim();
  const normalizedCandidate = candidate?.trim();

  if (!configuredSecret || !normalizedCandidate) {
    return false;
  }

  // Compare digests in constant time: the length and the first differing byte stay private.
  return timingSafeEqual(digest(normalizedCandidate), digest(configuredSecret));
};

export default isValidDevSecret;
