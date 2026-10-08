const ELLIPSIS = /(?:…|\.\.\.)$/;
const PREPARE_PREFIX = /^Failed to prepare [\w-]+:\s*/i;

const normalize = (line: string): string => line.trim().replace(/\s+/g, " ");

const startsLonger = (other: string, stem: string): boolean =>
  stem.length > 0 && other.length > stem.length && other.startsWith(stem);

const isCoveredTruncation = (
  stem: string,
  others: readonly string[],
): boolean =>
  others.some(
    (other) =>
      startsLonger(other, stem) ||
      startsLonger(
        other.replace(PREPARE_PREFIX, ""),
        stem.replace(PREPARE_PREFIX, ""),
      ),
  );

/**
 * d591ae31: "Failed to prepare codex: …" showed in full, then again cut off
 * with "…" (a 120-char summary echo). Drop exact repeats, lines equal to the
 * sentence shown above (`references`), and cut-off copies of a longer line.
 */
export const dropRedundantAgentRunDetailLines = (
  text: string,
  references: readonly (string | null | undefined)[],
): string => {
  const refs = references
    .map((ref) => normalize(ref ?? ""))
    .filter((ref) => ref.length > 0);
  const lines = text.split("\n").map(normalize);
  const seen = new Set<string>();
  return lines
    .filter((line) => {
      if (line.length === 0) {
        return true;
      }
      if (seen.has(line) || refs.includes(line)) {
        return false;
      }
      seen.add(line);
      if (!ELLIPSIS.test(line)) {
        return true;
      }
      const stem = line.replace(ELLIPSIS, "").trim();
      return !isCoveredTruncation(stem, [
        ...refs,
        ...lines.filter((l) => l !== line),
      ]);
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
