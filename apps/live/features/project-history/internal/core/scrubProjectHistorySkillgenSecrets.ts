export type ScrubProjectHistorySkillgenSecretsResult = {
  readonly scrubbed: string;
  /** True when a high-confidence secret pattern remains after replacements. */
  readonly residualSecret: boolean;
  readonly replacementCount: number;
};

type ScrubRule = {
  readonly pattern: RegExp;
  readonly replacement: string;
};

const SCRUB_RULES: readonly ScrubRule[] = [
  {
    pattern: /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/g,
    replacement: "[redacted-private-key]",
  },
  {
    pattern: /\bsk-[a-zA-Z0-9]{20,}\b/g,
    replacement: "[redacted-secret]",
  },
  {
    pattern: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,
    replacement: "[redacted-secret]",
  },
  {
    pattern: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g,
    replacement: "[redacted-secret]",
  },
  {
    pattern: /\bAKIA[0-9A-Z]{16}\b/g,
    replacement: "[redacted-secret]",
  },
  {
    pattern: /\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/gi,
    replacement: "Bearer [redacted-secret]",
  },
  {
    pattern:
      /\b(?:api[_-]?key|secret|token|password|passwd|credential)\s*[:=]\s*["']?[^\s"'\\]{8,}["']?/gi,
    replacement: "[redacted-secret]",
  },
  {
    pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    replacement: "[redacted-email]",
  },
];

/** Residual scan: any of these still present means quarantine. */
const RESIDUAL_PATTERNS: readonly RegExp[] = [
  /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/,
  /\bsk-[a-zA-Z0-9]{20,}\b/,
  /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bBearer\s+[A-Za-z0-9\-._~+/]{12,}/i,
];

/**
 * Step 5 — local regex secret/PII scrub. Must run before any LLM call.
 * Pure string transform; residualSecret → QUARANTINED (never reach LLM).
 */
export const scrubProjectHistorySkillgenSecrets = (
  text: string,
): ScrubProjectHistorySkillgenSecretsResult => {
  let scrubbed = text;
  let replacementCount = 0;
  for (const rule of SCRUB_RULES) {
    const next = scrubbed.replace(rule.pattern, () => {
      replacementCount += 1;
      return rule.replacement;
    });
    scrubbed = next;
  }
  const residualSecret = RESIDUAL_PATTERNS.some((re) => re.test(scrubbed));
  return { scrubbed, residualSecret, replacementCount };
};

/** True when scrubbed text still looks like it contains a secret. */
export const projectHistorySkillgenTextHasResidualSecret = (
  text: string,
): boolean => RESIDUAL_PATTERNS.some((re) => re.test(text));
