/**
 * S0-8 secret patterns for anything AWL sends off the computer or stores as
 * memory / summary. Shared by the run-output scrubber and History skillgen.
 * Fixtures in tests must use obviously fake values.
 */
export interface OutboundSecretRule {
  readonly pattern: RegExp;
  readonly replacement: string;
}

export const OUTBOUND_SECRET_REDACTED = "[redacted-secret]";
export const OUTBOUND_PRIVATE_KEY_REDACTED = "[redacted-private-key]";

const NOT_ALREADY_REDACTED = "(?!\\[redacted)";
const ENV_SECRET_NAME =
  "(?:[A-Z0-9]+_)*(?:KEY|APIKEY|SECRET|TOKEN|PASSWORD|PASSWD|PAT|CREDENTIALS?)(?:_[A-Z0-9]+)*";

export const OUTBOUND_SECRET_RULES: readonly OutboundSecretRule[] = [
  {
    pattern:
      /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----(?:[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----|[\s\S]*$)/g,
    replacement: OUTBOUND_PRIVATE_KEY_REDACTED,
  },
  {
    pattern: new RegExp(
      `^(\\s*(?:export\\s+)?${ENV_SECRET_NAME}\\s*=\\s*)${NOT_ALREADY_REDACTED}(["']?)[^\\s"'#]{4,}\\2`,
      "gm",
    ),
    replacement: `$1${OUTBOUND_SECRET_REDACTED}`,
  },
  {
    pattern: /("?pairing_?token"?\s*[:=]\s*"?)(?!\[redacted)[^\s",}]{6,}/gi,
    replacement: `$1${OUTBOUND_SECRET_REDACTED}`,
  },
  { pattern: /\bsk-[A-Za-z0-9_-]{20,}/g, replacement: OUTBOUND_SECRET_REDACTED },
  { pattern: /\bgithub_pat_[A-Za-z0-9_]{20,}/g, replacement: OUTBOUND_SECRET_REDACTED },
  {
    pattern: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,
    replacement: OUTBOUND_SECRET_REDACTED,
  },
  { pattern: /\bxox[a-z]-[A-Za-z0-9-]{10,}/g, replacement: OUTBOUND_SECRET_REDACTED },
  { pattern: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g, replacement: OUTBOUND_SECRET_REDACTED },
  {
    pattern: /\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{8,}=*/gi,
    replacement: `Bearer ${OUTBOUND_SECRET_REDACTED}`,
  },
  {
    pattern: new RegExp(
      `\\b(api[_-]?key|secret|token|password|passwd|credential)(["']?\\s*[:=]\\s*)${NOT_ALREADY_REDACTED}(["']?)[^\\s"'\\\\(),;]{8,}\\3`,
      "gi",
    ),
    replacement: `$1$2${OUTBOUND_SECRET_REDACTED}`,
  },
];

/** High-confidence shapes; any left after scrubbing → hide the text. */
export const OUTBOUND_RESIDUAL_SECRET_PATTERNS: readonly RegExp[] = [
  /-----(?:BEGIN|END) [A-Z0-9 ]*PRIVATE KEY-----/,
  /\bsk-[A-Za-z0-9_-]{20,}/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}/,
  /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,
  /\bxox[a-z]-[A-Za-z0-9-]{10,}/,
  /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,
  /\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{12,}/i,
];
