/** Same ceiling the computer applies (MAX_SCAN_COMMITS in apps/live project-history). */
export const DEEP_SCAN_MAX_COMMITS = 2_000;

const PRESETS: readonly number[] = [250, 500, 1_000, 2_000];

export interface DeepScanChoices {
  /** Most commits one scan can read. */
  readonly max: number;
  /** Quick picks, all deeper than the last scan. */
  readonly presets: readonly number[];
}

/** Quick picks for "scan deeper": counts above `scanned`, the full history when it fits under the ceiling. */
export const buildDeepScanChoices = (
  total: number,
  scanned: number,
): DeepScanChoices => {
  const max = Math.min(total, DEEP_SCAN_MAX_COMMITS);
  const picks = PRESETS.filter((count) => count > scanned && count < max);
  return { max, presets: [...picks, ...(max > scanned ? [max] : [])] };
};
