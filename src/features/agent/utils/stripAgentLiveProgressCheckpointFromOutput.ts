import { AGENT_RUN_INPUT_MARKER } from "@/lib/dispatch/agentRunInputGuardrails.constant";

import { AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER } from "@/features/agent/utils/agentLiveProgressCheckpoint.constant";

const SHELL_PROMPT_LINE = /agent-witch@(?:mac|linux)\s+~\s+[%$]/;

const endsCheckpointBlock = (line: string): boolean => {
  const trimmed = line.trim();
  return (
    trimmed.length === 0 ||
    trimmed.startsWith("[[") ||
    SHELL_PROMPT_LINE.test(trimmed)
  );
};

/** Lines a marker block at `index` covers (marker included). */
const markerBlockLength = (lines: readonly string[], index: number): number => {
  const trimmed = (lines[index] ?? "").trim();
  if (trimmed.startsWith(AGENT_RUN_INPUT_MARKER)) {
    // Marker on its own line + the question line, or "[[AWAITING_INPUT]] Q?".
    return trimmed === AGENT_RUN_INPUT_MARKER ? 2 : 1;
  }
  if (!trimmed.startsWith(AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER)) {
    return 0;
  }
  const end = lines.findIndex(
    (line, lineIndex) => lineIndex > index && endsCheckpointBlock(line),
  );
  return (end < 0 ? lines.length : end) - index;
};

/**
 * db0bd005 (Testi run 4 @298): drop only the ask block (marker + question)
 * and the answered checkpoint block (marker + Q:/A: lines). The old version
 * dropped everything after the marker up to the next [[PROGRESS]], which was
 * already stripped, so a finished run's final answer vanished from Reports.
 */
export const stripAgentLiveProgressCheckpointFromOutput = (
  output: string,
): string => {
  const lines = output.split(/\r?\n/);
  return lines
    .reduce<{ readonly kept: readonly string[]; readonly skip: number }>(
      (state, line, index) => {
        if (state.skip > 0) {
          return { kept: state.kept, skip: state.skip - 1 };
        }
        const blockLength = markerBlockLength(lines, index);
        return blockLength > 0
          ? { kept: state.kept, skip: blockLength - 1 }
          : { kept: [...state.kept, line], skip: 0 };
      },
      { kept: [], skip: 0 },
    )
    .kept.join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
