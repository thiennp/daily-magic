export const formatAgentRunReportSummaryLine = (
  reportSummary: string | null | undefined,
): string | null => {
  if (reportSummary === null || reportSummary === undefined) {
    return null;
  }

  const trimmed = reportSummary.trim();
  return trimmed.length > 0 ? trimmed : null;
};
