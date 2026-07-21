export const formatAgentLiveWorkingEstimateLabel = (
  estimateSeconds: number,
): string => {
  if (estimateSeconds < 60) {
    return `Est. ${estimateSeconds}s`;
  }

  const minutes = Math.round(estimateSeconds / 60);
  if (minutes < 60) {
    return `Est. ~${minutes} min`;
  }

  const hours = Math.round(minutes / 60);
  return `Est. ~${hours} hr`;
};
