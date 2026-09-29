const TITLE_LIMIT = 72;

export const promptSdlcLocalHistoryTitle = (goal: string): string => {
  const compact = goal.trim().replaceAll(/\s+/g, " ");
  const clause = compact.split(/[,.!?]/)[0]?.trim() ?? "";
  const title = clause.length > 0 ? clause : "Untitled run";
  return title.length <= TITLE_LIMIT
    ? title
    : `${title.slice(0, TITLE_LIMIT - 1).trimEnd()}…`;
};
