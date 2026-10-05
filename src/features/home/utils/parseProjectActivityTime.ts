/**
 * Parses an ISO-ish timestamp from a project record into epoch ms.
 * Returns null for missing or unparseable values so callers can sort them last.
 */
export default function parseProjectActivityTime(
  value: string | null | undefined,
): number | null {
  if (value === null || value === undefined || value.trim().length === 0) {
    return null;
  }

  const time = Date.parse(value);

  return Number.isNaN(time) ? null : time;
}
