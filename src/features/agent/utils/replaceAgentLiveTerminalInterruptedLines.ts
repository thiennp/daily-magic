const INTERRUPTED_LINE = /^error:\s*interrupted[\s\p{P}]*$/iu;
const STOPPED_BY_USER = "Stopped by user.";
const STOPPED = "Stopped.";

const isStoppedLine = (line: string | undefined): boolean => {
  const trimmed = line?.trim() ?? "";
  return trimmed === STOPPED_BY_USER || trimmed === STOPPED;
};

/**
 * 85e73e72: a cancelled run printed raw "error: interrupted". Hide it when a
 * "Stopped by user." line follows, else show "Stopped."; never repeat the
 * stopped line back to back.
 */
export const replaceAgentLiveTerminalInterruptedLines = (
  lines: readonly string[],
): readonly string[] => {
  const hasStoppedByUser = lines.some(
    (line) => line.trim() === STOPPED_BY_USER,
  );
  return lines.reduce<readonly string[]>((out, line) => {
    const lastNonEmpty = out.findLast((entry) => entry.trim().length > 0);
    if (INTERRUPTED_LINE.test(line.trim())) {
      return hasStoppedByUser || isStoppedLine(lastNonEmpty)
        ? out
        : [...out, STOPPED];
    }
    if (line.trim() === STOPPED_BY_USER && isStoppedLine(lastNonEmpty)) {
      return out;
    }
    return [...out, line];
  }, []);
};
