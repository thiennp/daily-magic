const REASON_SPLIT = /\n+|;\s+/;
const MAX_AVOID_ITEMS = 12;
const MAX_REASON_LENGTH = 280;

const clipReason = (reason: string): string =>
  reason.length > MAX_REASON_LENGTH
    ? `${reason.slice(0, MAX_REASON_LENGTH - 1)}…`
    : reason;

/** Turns judge reasons into a short list, newest input first, without repeats. */
export const reconcilePromptSdlcAvoidReasons = (
  reasons: readonly string[],
): readonly string[] =>
  reasons.reduce<readonly string[]>((kept, raw) => {
    if (kept.length >= MAX_AVOID_ITEMS) {
      return kept;
    }

    const next = raw
      .split(REASON_SPLIT)
      .map((item) => item.replace(/^[-*]\s*/, "").trim())
      .filter((item) => item.length > 0)
      .reduce<readonly string[]>((lines, item) => {
        if (kept.length + lines.length >= MAX_AVOID_ITEMS) {
          return lines;
        }
        const key = item.toLowerCase();
        const seen = [...kept, ...lines].some(
          (existing) => existing.toLowerCase() === key,
        );
        return seen ? lines : [...lines, clipReason(item)];
      }, []);

    return [...kept, ...next];
  }, []);

export const formatPromptSdlcAvoidList = (
  reasons: readonly string[],
): string | null => {
  const lines = reconcilePromptSdlcAvoidReasons(reasons);
  return lines.length === 0
    ? null
    : lines.map((reason) => `- ${reason}`).join("\n");
};
