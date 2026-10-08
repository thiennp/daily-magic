const MARKER_FRAGMENT_PATTERNS: readonly RegExp[] = [
  // Whole or cut markers, also with a stray list number glued on ("3.[PROGRESS]]").
  /(?:\d+\.)?\[{0,2}(?:WAVE_PLAN|WAVE_STATUS|PROGRESS|AWAITING_INPUT|NEXT_ACTIONS|CHECKPOINT_QA|WORKING_ESTIMATE|MARKETPLACE_PLAN_ESTIMATE)\]{0,2}/g,
  // Whole wave / action tokens: W|1|title|30, |1.1|title|working.
  /(?:^|\s)\|?[WA]?\|?\d+(?:\.\d+)?\|[^|\n]*\|(?:\d+|pending|working|done)\b/g,
  // Status-only tokens: 2.1|pending.
  /(?:^|\s)\d+(?:\.\d+)?\|(?:pending|working|done)\b/g,
  // A token cut off at the end of the text (120-char Neon meta): A|2.1|Add f…
  /(?:^|\s)(?:[WA]\|)?\|?\d+(?:\.\d+)?\|[^|\n]*$/g,
];

/**
 * b8c56ef0: Reports "What happened" showed marker leftovers the CLI-chrome
 * strip misses (the 120-char Neon meta cuts markers and wave tokens mid-way,
 * and the terminal mirror interleaves them). Drop them and empty lines.
 */
export const stripAgentRunReportMarkerFragments = (text: string): string =>
  MARKER_FRAGMENT_PATTERNS.reduce(
    (current, pattern) => current.replace(pattern, ""),
    text ?? "",
  )
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n");
