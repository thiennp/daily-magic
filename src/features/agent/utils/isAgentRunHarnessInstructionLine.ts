const MARKER_TOKEN =
  /\[{0,2}(?:WAVE_PLAN|WAVE_STATUS|PROGRESS|AWAITING_INPUT|NEXT_ACTIONS|CHECKPOINT_QA|WORKING_ESTIMATE)\]{0,2}/i;

const NUMBERED_RULE = /^\d+\.\s+/;

/**
 * Harness / system-prompt lines that leak into partialOutput when the CLI
 * echoes the inject, or mid-sentence fragments from a truncated earlier chunk.
 */
export const isAgentRunHarnessInstructionLine = (line: string): boolean => {
  const trimmed = line.trim();
  if (trimmed.length === 0) {
    return false;
  }
  if (/^user$/i.test(trimmed)) {
    return true;
  }
  if (NUMBERED_RULE.test(trimmed) && MARKER_TOKEN.test(trimmed)) {
    return true;
  }
  if (
    MARKER_TOKEN.test(trimmed) &&
    /never use|do not nest|do not put|inside the estimate|inside wave blocks|proceed automatically|or \[\[AWAITING_INPUT\]\]/i.test(
      trimmed,
    )
  ) {
    return true;
  }
  // Truncated earlier chunk: ", [[NEXT_ACTIONS]], or …" / "finding so the operator…"
  if (/^[,;:]/.test(trimmed)) {
    return true;
  }
  if (
    /^[a-z]/.test(trimmed) &&
    /operator sees|estimate block|wave blocks|enriched results/i.test(trimmed)
  ) {
    return true;
  }
  return false;
};
