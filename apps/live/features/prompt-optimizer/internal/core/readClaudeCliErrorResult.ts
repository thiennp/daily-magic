const MAX_ERROR_LENGTH = 400;

/**
 * DF-035 (a): Claude CLI `-p --output-format json` error envelope →
 * verbatim CLI message (trimmed), else null.
 */
export const readClaudeCliErrorResult = (stdout: string): string | null => {
  const trimmed = stdout.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start < 0 || end <= start) {
    return null;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed.slice(start, end + 1));
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null) {
    return null;
  }
  const record = parsed as Record<string, unknown>;
  if (record.is_error !== true) {
    return null;
  }
  const result =
    typeof record.result === "string" && record.result.trim().length > 0
      ? record.result.trim()
      : typeof record.subtype === "string"
        ? `Claude CLI error: ${record.subtype}`
        : "Claude CLI returned an error without a message.";
  const message = result.startsWith("Claude CLI")
    ? result
    : `Claude CLI: ${result}`;
  return message.length > MAX_ERROR_LENGTH
    ? `${message.slice(0, MAX_ERROR_LENGTH - 3)}...`
    : message;
};
