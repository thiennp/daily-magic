/**
 * 9b3947bc (Testi recheck @300): a quota failure showed the raw
 * "error: Individual quota reached… AGY_ERROR:{…}" JSON as the report's
 * "What happened" and as the host summary. Known agent CLI errors map to one
 * plain sentence; callers keep the raw text only in details.
 */
const ANTIGRAVITY_QUOTA =
  /individual quota reached|AGY_ERROR[^\n]*RESOURCE_EXHAUSTED|AGY_ERROR[^\n]*\b429\b/i;
const GENERIC_RESOURCE_EXHAUSTED = /\bRESOURCE_EXHAUSTED\b/;
const CLAUDE_SESSION_LIMIT = /you(?:'|’)ve hit your (?:session|usage) limit/i;
const RESETS_IN =
  /resets?\s+in\s+((?:\d+\s*h)?\s*(?:\d+\s*m(?!s))?\s*(?:\d+\s*s)?)/i;
const RESETS_AT =
  /resets?\s+(?:at\s+)?([0-9]{1,2}(?::[0-9]{2})?\s*(?:am|pm)?[^\n.]*)/i;

const formatResetIn = (raw: string): string | null => {
  const hours = Number(/(\d+)\s*h/i.exec(raw)?.[1] ?? 0);
  const minutes = Number(/(\d+)\s*m/i.exec(raw)?.[1] ?? 0);
  const seconds = Number(/(\d+)\s*s/i.exec(raw)?.[1] ?? 0);
  if (hours === 0 && minutes === 0 && seconds === 0) {
    return null;
  }
  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return minutes > 0 ? `${minutes}m` : "under a minute";
};

const resetSuffix = (output: string): string => {
  const resetIn = RESETS_IN.exec(output)?.[1];
  const formatted =
    resetIn !== undefined ? formatResetIn(resetIn.trim()) : null;
  return formatted !== null ? `; resets in ${formatted}` : "";
};

export const summarizeKnownWriterError = (output: string): string | null => {
  const text = output.trim();
  if (text.length === 0) {
    return null;
  }
  if (ANTIGRAVITY_QUOTA.test(text)) {
    return `Antigravity quota reached${resetSuffix(text)}.`;
  }
  if (CLAUDE_SESSION_LIMIT.test(text)) {
    const at = RESETS_AT.exec(
      text.slice(text.search(CLAUDE_SESSION_LIMIT)),
    )?.[1]?.trim();
    return at !== undefined && at.length > 0
      ? `Claude usage limit reached; resets ${at.replace(/[·\s]+$/, "")}.`
      : "Claude usage limit reached.";
  }
  if (GENERIC_RESOURCE_EXHAUSTED.test(text)) {
    return `The agent's provider quota was reached${resetSuffix(text)}.`;
  }
  return null;
};
