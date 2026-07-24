export const formatAgentRunEstimateSummary = (
  estimateSeconds: number | null,
): string => {
  if (estimateSeconds === null || estimateSeconds <= 0) {
    return "Estimate saved locally. Starting work on your Mac…";
  }

  if (estimateSeconds < 60) {
    return `Estimated ~${estimateSeconds}s. Starting work on your Mac…`;
  }

  const minutes = Math.max(1, Math.round(estimateSeconds / 60));
  return `Estimated ~${minutes} min. Starting work on your Mac…`;
};
