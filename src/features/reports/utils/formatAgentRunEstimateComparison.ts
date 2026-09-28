const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  if (minutes < 60) {
    return remainder === 0 ? `${minutes} min` : `${minutes} min ${remainder}s`;
  }

  const hours = Math.floor(minutes / 60);
  const minuteRemainder = minutes % 60;
  return minuteRemainder === 0
    ? `${hours} hr`
    : `${hours} hr ${minuteRemainder} min`;
};

export const formatAgentRunEstimateComparison = (input: {
  readonly estimateSeconds?: number | null;
  readonly actualSeconds?: number | null;
}): string | null => {
  const estimate =
    typeof input.estimateSeconds === "number" ? input.estimateSeconds : null;
  const actual =
    typeof input.actualSeconds === "number" ? input.actualSeconds : null;
  if (estimate === null && actual === null) {
    return null;
  }

  const parts: string[] = [];
  if (estimate !== null) {
    parts.push(`Estimated ${formatDuration(estimate)}`);
  }
  if (actual !== null) {
    parts.push(`Actual ${formatDuration(actual)}`);
  }
  if (estimate !== null && actual !== null) {
    const delta = actual - estimate;
    if (delta === 0) {
      parts.push("on estimate");
    } else if (delta < 0) {
      parts.push(`${formatDuration(-delta)} under`);
    } else {
      parts.push(`${formatDuration(delta)} over`);
    }
  }

  return parts.join(" · ");
};
