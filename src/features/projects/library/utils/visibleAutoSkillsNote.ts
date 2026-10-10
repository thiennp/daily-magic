import { isAutoSkillScanProgressNote } from "@/features/project-auto-skills/public-api/presentation";

/** A progress line this old with no scan running means the computer stopped (closed, restarted, crashed). */
const STALE_PROGRESS_MS = 3 * 60_000;

export const INTERRUPTED_SCAN_NOTE =
  "The last scan stopped before it finished. Scan again; commits already judged are skipped.";

/** The strip's note: a leftover progress line becomes an "interrupted" hint. */
export const visibleAutoSkillsNote = (input: {
  readonly note: string | null;
  readonly lastCheckedAt: string | null;
  readonly scanning: boolean;
  readonly nowMs: number;
}): string | null => {
  if (input.scanning || !isAutoSkillScanProgressNote(input.note)) {
    return input.note;
  }
  const checked =
    input.lastCheckedAt === null ? Number.NaN : Date.parse(input.lastCheckedAt);
  return Number.isNaN(checked) || input.nowMs - checked > STALE_PROGRESS_MS
    ? INTERRUPTED_SCAN_NOTE
    : input.note;
};
