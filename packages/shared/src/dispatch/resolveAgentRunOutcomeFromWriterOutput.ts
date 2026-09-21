import {
  AgentRunOutcomeCode,
  type AgentRunOutcomeCodeValue,
} from "./agentRunOutcome.constant";

const SESSION_LIMIT_PATTERN = /you(?:'|')ve hit your session limit/i;

const PROVIDER_QUOTA_PATTERNS: readonly RegExp[] = [
  /\brate limit(?:ed)?\b/i,
  /\busage limit\b/i,
  /\bquota exceeded\b/i,
  /\bexceeded your .* quota\b/i,
];

const SESSION_LIMIT_RESET_PATTERN =
  /session limit[^.\n]*\s+resets?\s+([^\n]+)/i;

export interface ResolvedAgentRunOutcome {
  readonly code: AgentRunOutcomeCodeValue;
  readonly resetHint: string | null;
  readonly matchedLine: string | null;
}

const firstMatchingLine = (output: string, pattern: RegExp): string | null => {
  for (const line of output.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length > 0 && pattern.test(trimmed)) {
      return trimmed;
    }
  }

  return pattern.test(output)
    ? (output.trim().split(/\r?\n/)[0]?.trim() ?? null)
    : null;
};

const parseSessionLimitResetHint = (output: string): string | null => {
  const match = SESSION_LIMIT_RESET_PATTERN.exec(output);
  if (match === null) {
    return null;
  }

  const hint = match[1]?.trim() ?? "";
  return hint.length > 0 ? hint : null;
};

export const resolveAgentRunOutcomeFromWriterOutput = (
  output: string,
): ResolvedAgentRunOutcome | null => {
  const normalized = output.trim();
  if (normalized.length === 0) {
    return null;
  }

  if (SESSION_LIMIT_PATTERN.test(normalized)) {
    return {
      code: AgentRunOutcomeCode.SESSION_LIMIT,
      resetHint: parseSessionLimitResetHint(normalized),
      matchedLine: firstMatchingLine(normalized, SESSION_LIMIT_PATTERN),
    };
  }

  for (const pattern of PROVIDER_QUOTA_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        code: AgentRunOutcomeCode.PROVIDER_QUOTA,
        resetHint: null,
        matchedLine: firstMatchingLine(normalized, pattern),
      };
    }
  }

  return null;
};
