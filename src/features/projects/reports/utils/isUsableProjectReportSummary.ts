const isStaleLiveSummary = (summary: string): boolean =>
  /^(?:Waiting for|Working on your computer|Task started|Continuing after your answer)/i.test(
    summary.trim(),
  );

/**
 * A finished run never shows a live-only summary. 7daeea78: the bare
 * "Finished on your computer." gives way to the run output when there is one.
 */
export const isUsableProjectReportSummary = (
  summary: string,
  input: { readonly isTerminal: boolean; readonly fallbackOutput: string },
): boolean => {
  if (summary.length === 0) {
    return false;
  }
  if (input.isTerminal && isStaleLiveSummary(summary)) {
    return false;
  }
  return !(
    /^Finished on your computer\.?$/i.test(summary.trim()) &&
    input.fallbackOutput.trim().length > 0
  );
};
