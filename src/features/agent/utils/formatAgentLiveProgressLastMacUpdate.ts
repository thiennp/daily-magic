export const formatAgentLiveProgressLastMacUpdate = (
  msSinceLastActivity: number | null,
): string | null => {
  if (msSinceLastActivity === null) {
    return null;
  }

  if (msSinceLastActivity < 5_000) {
    return "just now";
  }

  const seconds = Math.floor(msSinceLastActivity / 1_000);
  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};
