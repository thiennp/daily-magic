export const formatPromptSdlcLocalRelativeTime = (
  isoTimestamp: string,
  nowMs: number = Date.now(),
): string => {
  const parsed = Date.parse(isoTimestamp);
  if (Number.isNaN(parsed)) {
    return "";
  }
  const deltaSec = Math.max(0, Math.floor((nowMs - parsed) / 1000));
  if (deltaSec < 60) {
    return "Just now";
  }
  const deltaMin = Math.floor(deltaSec / 60);
  if (deltaMin < 60) {
    return `${deltaMin} min ago`;
  }
  const deltaHours = Math.floor(deltaMin / 60);
  if (deltaHours < 48) {
    return `${deltaHours} h ago`;
  }
  const deltaDays = Math.floor(deltaHours / 24);
  return `${deltaDays} d ago`;
};
