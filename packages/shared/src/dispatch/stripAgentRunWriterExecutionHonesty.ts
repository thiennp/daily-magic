import { AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER } from "./agentRunWriterExecutionHonesty.constant";

const FIELD_LINE = /^agentRunWriterExecution\w*=/;

/**
 * Removes the writer-execution header (marker line plus its key=value lines)
 * so users see the run's own output. The marker is a machine signal only.
 */
export const stripAgentRunWriterExecutionHonesty = (output: string): string => {
  if (!output.includes(AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER)) {
    return output;
  }
  const kept: string[] = [];
  let inHeader = false;
  for (const line of output.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER) {
      inHeader = true;
      continue;
    }
    if (inHeader && FIELD_LINE.test(trimmed)) continue;
    inHeader = false;
    kept.push(line);
  }
  return kept.join("\n").trim();
};
