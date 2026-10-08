/** Report detail status labels (FAIL2 a76d46ac, b8c56ef0). */
const STATUS_LABELS: Readonly<Record<string, string>> = {
  completed: "Done",
  failed: "Failed",
  stopped: "Stopped",
  expired: "Timed out",
  denied: "Denied",
  running: "Running",
  "in progress": "Running",
  "pending approval": "Waiting for approval",
};

/** Persisted host report field, else the browser run cache (b8c56ef0). */
export const pickReportField = (
  persisted: string | null | undefined,
  cached: string | null | undefined,
): string | null => {
  if ((persisted?.trim() ?? "").length > 0) {
    return persisted ?? null;
  }
  return (cached?.trim() ?? "").length > 0 ? (cached ?? null) : null;
};

/** Status key (run or host report) → user-facing label. */
export const toProjectReportStatusLabel = (key: string): string | null => {
  const normalized = key.trim().toLowerCase().replaceAll("_", " ");
  return normalized.length > 0
    ? (STATUS_LABELS[normalized] ?? normalized)
    : null;
};
