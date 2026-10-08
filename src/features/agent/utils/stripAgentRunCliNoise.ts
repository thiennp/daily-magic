const WRITER_EXECUTION_MARKER = "[[AGENT_RUN_WRITER_EXECUTION]]";
const CLI_BANNER_START = /^OpenAI Codex v/;
const CLI_RULE_LINE = /^-{4,}$/;
const CLI_LOG_LINE =
  /^\d{4}-\d{2}-\d{2}T[\d:.]+Z\s+(?:ERROR|WARN|INFO|DEBUG)\b/;
const CLI_STDIN_NOTICE = /^Reading additional input from stdin/;
const WRITER_EXECUTION_FIELD = /^agentRunWriterExecution\w*=/;
const CLI_REPLY_START = /^(?:codex|assistant)$/;

/** Drops text before the writer-execution marker (a truncated earlier chunk). */
const dropLeadingFragment = (lines: readonly string[]): readonly string[] => {
  const markerIndex = lines.findIndex(
    (line) => line.trim() === WRITER_EXECUTION_MARKER,
  );
  return markerIndex < 0 ? lines : lines.slice(markerIndex);
};

/** Drops the CLI banner (version, workdir, model, ...) up to its closing rule. */
const dropBanner = (lines: readonly string[]): readonly string[] => {
  const start = lines.findIndex((line) => CLI_BANNER_START.test(line.trim()));
  if (start < 0) return lines;
  const rules = lines
    .map((line, index) => (CLI_RULE_LINE.test(line.trim()) ? index : -1))
    .filter((index) => index > start);
  const end = rules[1] ?? lines.length - 1;
  return [...lines.slice(0, start), ...lines.slice(end + 1)];
};

/** Drops the echoed prompt (`user` line) up to the agent's reply, if any. */
const dropPromptEcho = (lines: readonly string[]): readonly string[] => {
  const start = lines.findIndex((line) => line.trim() === "user");
  if (start < 0) return lines;
  const reply = lines.findIndex(
    (line, index) => index > start && CLI_REPLY_START.test(line.trim()),
  );
  return [
    ...lines.slice(0, start),
    ...(reply < 0 ? [] : lines.slice(reply + 1)),
  ];
};

/**
 * Removes writer-CLI chatter (banner, log lines, execution markers, echoed
 * prompt) so the "Context so far" preview only shows what the agent did.
 */
export const stripAgentRunCliNoise = (output: string): string =>
  dropPromptEcho(dropBanner(dropLeadingFragment(output.split("\n"))))
    .filter((line) => {
      const trimmed = line.trim();
      return (
        trimmed !== WRITER_EXECUTION_MARKER &&
        !WRITER_EXECUTION_FIELD.test(trimmed) &&
        !CLI_LOG_LINE.test(trimmed) &&
        !CLI_STDIN_NOTICE.test(trimmed)
      );
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
