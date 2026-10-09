/** Allowlisted summary field tokens for project.updated (comma-joined after prefix). */
export const PROJECT_UPDATED_SUMMARY_FIELDS = [
  "knowledge",
  "folder_refs",
  "repo_urls",
  "project_info",
  "definition_of_done",
] as const;

export type ProjectUpdatedSummaryField =
  (typeof PROJECT_UPDATED_SUMMARY_FIELDS)[number];

/**
 * Wake owns the debounce timer (default 5s) on write hooks; export so Wake can
 * import the same named default instead of hard-coding.
 */
export const PROJECT_UPDATED_DEBOUNCE_MS = 5_000;
