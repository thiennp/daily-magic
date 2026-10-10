/** The computer's "Checking commit 2 of 5…" line: the scan has not finished yet. */
export const isAutoSkillScanProgressNote = (note: string | null): boolean =>
  note !== null && /^Checking (task|commit) \d+ of \d+/.test(note);
