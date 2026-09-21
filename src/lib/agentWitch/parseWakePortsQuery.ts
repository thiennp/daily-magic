const parseWakePortSegment = (value: string): number | null => {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const parsed = Number.parseInt(trimmed, 10);
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65_535) {
    return null;
  }

  return parsed;
};

export const parseWakePortQuery = (value: string | null): number | null => {
  if (value === null) {
    return null;
  }

  return parseWakePortSegment(value);
};

export const parseWakePortsQuery = (
  value: string | null,
): readonly number[] | null => {
  if (value === null || value.trim().length === 0) {
    return null;
  }

  const ports: number[] = [];
  const seen = new Set<number>();

  value.split(",").forEach((segment) => {
    const parsed = parseWakePortSegment(segment);
    if (parsed !== null && !seen.has(parsed)) {
      seen.add(parsed);
      ports.push(parsed);
    }
  });

  return ports.length > 0 ? ports : null;
};
