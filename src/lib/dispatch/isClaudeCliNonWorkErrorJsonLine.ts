const readNonNegativeInt = (value: unknown): number | null => {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return null;
  }
  return Math.trunc(value);
};

/** Claude `--output-format json` lines that report auth/API failure without repo work. */
export const isClaudeCliNonWorkErrorJsonLine = (trimmed: string): boolean => {
  if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) {
    return false;
  }
  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    if (parsed.is_error !== true) {
      return false;
    }
    const usage = parsed.usage;
    if (usage === null || typeof usage !== "object") {
      return false;
    }
    const outputTokens = readNonNegativeInt(
      (usage as Record<string, unknown>).output_tokens,
    );
    return outputTokens === 0;
  } catch {
    return false;
  }
};
