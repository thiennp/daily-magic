import type { PreflightEvidence } from "./PreflightResult.type";
import { isHashShapedFingerprint } from "./isHashShapedFingerprint";

const PEM_BLOCK =
  /-----BEGIN [A-Z0-9 ]+-----[\s\S]*?-----END [A-Z0-9 ]+-----/g;
const BEARER = /\bBearer\s+[A-Za-z0-9._\-+=\/]+/gi;
const KEY_ASSIGN =
  /\b(?:api[_-]?key|secret|token|password|authorization)\b\s*[:=]\s*['"]?[^\s'"]+/gi;
const LONG_HEX = /\b[a-fA-F0-9]{32,}\b/g;
const LONG_B64 = /\b[A-Za-z0-9+\/]{40,}={0,2}\b/g;

const REDACTED = "[redacted]";

/** Keep plain 40-char commit SHAs; redact other long hex (32–39, 41+). */
const redactLongHex = (match: string): string =>
  match.length === 40 ? match : REDACTED;

/** Strip secret-looking substrings; leave short/full commit SHAs intact. */
export const sanitizePreflightText = (value: string): string =>
  value
    .replace(PEM_BLOCK, REDACTED)
    .replace(BEARER, "Bearer [redacted]")
    .replace(KEY_ASSIGN, (match) => {
      const sep = match.includes("=") ? "=" : ":";
      const key = match.split(/[:=]/)[0]?.trim() ?? "secret";
      return `${key}${sep}[redacted]`;
    })
    .replace(LONG_HEX, redactLongHex)
    .replace(LONG_B64, (match) =>
      // Pure hex is a commit SHA (or already handled); do not treat as base64.
      /^[a-fA-F0-9]+$/.test(match) ? match : REDACTED,
    );

/**
 * Keep existence/path/sha/fingerprint only. Summaries are sanitized;
 * fingerprints must be hash-shaped or they are dropped.
 */
export const toSafePreflightEvidence = (
  evidence: readonly PreflightEvidence[],
): readonly PreflightEvidence[] =>
  evidence.map((item) => {
    const raw =
      typeof item.fingerprint === "string" ? item.fingerprint.trim() : "";
    const fingerprint =
      raw.length > 0 && isHashShapedFingerprint(raw) ? raw : undefined;
    return {
      kind: item.kind,
      summary: sanitizePreflightText(item.summary),
      ...(fingerprint !== undefined ? { fingerprint } : {}),
    };
  });
