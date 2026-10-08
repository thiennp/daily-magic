const MIN_DEDUPED_LINE_CHARS = 12;

const isDedupedLine = (line: string): boolean =>
  line.length >= MIN_DEDUPED_LINE_CHARS || /^#{1,6}\s/.test(line);

/**
 * 85e73e72 / db0bd005 (Testi run 4 @298): a checkpoint continuation re-prints
 * the earlier checkpoint block, so Reports "What happened" showed it twice.
 * Keep the first copy of every non-trivial line; short lines stay as is.
 */
export const dropRepeatedReportBodyLines = (text: string): string => {
  const seen = new Set<string>();
  return text
    .split("\n")
    .filter((line) => {
      const key = line.replace(/\s+/g, " ").trim();
      if (!isDedupedLine(key)) {
        return true;
      }
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .join("\n");
};
