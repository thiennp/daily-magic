/** Human “about …” fragment for Desi copy (`about 5 min`). */
export const formatWorkingEstimateDurationLabel = (
  estimateSeconds: number,
): string => {
  if (estimateSeconds < 60) {
    return `${estimateSeconds}s`;
  }

  const minutes = Math.round(estimateSeconds / 60);
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.round(minutes / 60);
  return `${hours} hr`;
};
