interface ParagraphState {
  readonly out: readonly string[];
  readonly paragraph: readonly string[];
  readonly seen: ReadonlySet<string>;
}

const normalize = (lines: readonly string[]): string =>
  lines
    .map((line) => line.trim())
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

const isDedupedParagraph = (
  lines: readonly string[],
  normalized: string,
): boolean =>
  lines.length >= 2 ||
  normalized.length >= 40 ||
  /^#{1,6}\s/.test(normalized) ||
  normalized.startsWith("Agent asks: ");

const flush = (state: ParagraphState): ParagraphState => {
  if (state.paragraph.length === 0) {
    return state;
  }
  const normalized = normalize(state.paragraph);
  if (!isDedupedParagraph(state.paragraph, normalized)) {
    return { ...state, out: [...state.out, ...state.paragraph], paragraph: [] };
  }
  if (state.seen.has(normalized)) {
    return { ...state, paragraph: [] };
  }
  return {
    out: [...state.out, ...state.paragraph],
    paragraph: [],
    seen: new Set([...state.seen, normalized]),
  };
};

/**
 * 85e73e72: a checkpoint continuation re-prints the earlier block. Drop a
 * paragraph identical to an earlier one when it is 2+ lines, 40+ chars, a
 * heading, or an "Agent asks" line; short lines (prompts, "Done.") stay.
 */
export const dropRepeatedAgentLiveTerminalParagraphs = (
  lines: readonly string[],
): readonly string[] =>
  flush(
    lines.reduce<ParagraphState>(
      (state, line) => {
        if (line.trim().length > 0) {
          return { ...state, paragraph: [...state.paragraph, line] };
        }
        const flushed = flush(state);
        return { ...flushed, out: [...flushed.out, line] };
      },
      { out: [], paragraph: [], seen: new Set<string>() },
    ),
  ).out;
