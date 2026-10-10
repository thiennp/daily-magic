import { createHash } from "node:crypto";

/**
 * Stable hash of a one-line failure reason: lowercased, with numbers, hex ids,
 * paths and quoted text removed, so "failed at step 3 (abc123)" and "failed at
 * step 7 (ff00aa)" are the same mistake. Null for an empty reason.
 */
export const fingerprintFailureReason = (reason: string): string | null => {
  const normalized = reason
    .toLowerCase()
    .replace(/["'`][^"'`]*["'`]/g, " ")
    .replace(/(?:[\w.-]*\/)+[\w.-]*/g, " ")
    .replace(/\b[0-9a-f]{6,}\b/g, " ")
    .replace(/\d+/g, " ")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return normalized.length === 0
    ? null
    : createHash("sha256").update(normalized).digest("hex").slice(0, 16);
};
