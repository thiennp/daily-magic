/** The computer's "Starting: …" and "Checking commit 2 of 5…" lines: the scan has not finished yet. */
export const isAutoSkillScanProgressNote = (note: string | null): boolean =>
  note !== null &&
  (/^Checking (task|commit) \d+ of \d+/.test(note) ||
    note.startsWith("Starting: "));
