const MINUTE_SEC = 60;
const HOUR_SEC = 3_600;

/** Elapsed time since last heartbeat — ticks every second in the local UI. */
export const formatAgentWitchHeartbeatElapsed = (
  value: string | null,
  nowMs: number = Date.now(),
): string => {
  if (value === null) {
    return "never";
  }

  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) {
    return "unknown";
  }

  const elapsedSec = Math.max(0, Math.floor((nowMs - timestamp) / 1_000));

  if (elapsedSec < MINUTE_SEC) {
    return `${elapsedSec}s`;
  }

  const totalMinutes = Math.floor(elapsedSec / MINUTE_SEC);
  const remainingSeconds = elapsedSec % MINUTE_SEC;

  if (totalMinutes < 60) {
    return remainingSeconds > 0
      ? `${totalMinutes}m ${remainingSeconds}s`
      : `${totalMinutes}m`;
  }

  const totalHours = Math.floor(elapsedSec / HOUR_SEC);
  const remainingMinutes = Math.floor((elapsedSec % HOUR_SEC) / MINUTE_SEC);

  return remainingMinutes > 0
    ? `${totalHours}h ${remainingMinutes}m`
    : `${totalHours}h`;
};
