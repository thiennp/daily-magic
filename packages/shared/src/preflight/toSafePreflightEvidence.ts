import type { PreflightEvidence } from "./PreflightResult.type";

const PEM_BLOCK =
  /-----BEGIN [A-Z0-9 ]+-----[\s\S]*?-----END [A-Z0-9 ]+-----/g;
const BEARER = /\bBearer\s+[A-Za-z0-9._\-+=\/]+/gi;
const KEY_ASSIGN =
  /\b(?:api[_-]?key|secret|token|password|authorization)\b\s*[:=]\s*['"]?[^\s'"]+/gi;
const LONG_HEX = /\b[a-f0-9]{32,}\b/gi;
const LONG_B64 = /\b[A-Za-z0-9+\/]{40,}={0,2}\b/g;

const REDACTED = "[redacted]";

/** Strip secret-looking substrings from a free-text summary. */
export const sanitizePreflightText = (value: string): string =>
  value
    .replace(PEM_BLOCK, REDACTED)
    .replace(BEARER, "Bearer [redacted]")
    .replace(KEY_ASSIGN, (match) => {
      const sep = match.includes("=") ? "=" : ":";
      const key = match.split(/[:=]/)[0]?.trim() ?? "secret";
      return `${key}${sep}[redacted]`;
    })
    .replace(LONG_HEX, REDACTED)
    .replace(LONG_B64, REDACTED);

/**
 * Keep existence/path/sha/fingerprint only. Summaries are sanitized;
 * fingerprints longer than 64 chars are truncated (sha display).
 */
export const toSafePreflightEvidence = (
  evidence: readonly PreflightEvidence[],
): readonly PreflightEvidence[] =>
  evidence.map((item) => {
    const fingerprint =
      typeof item.fingerprint === "string" && item.fingerprint.length > 0
        ? item.fingerprint.slice(0, 64)
        : undefined;
    return {
      kind: item.kind,
      summary: sanitizePreflightText(item.summary),
      ...(fingerprint !== undefined ? { fingerprint } : {}),
    };
  });
