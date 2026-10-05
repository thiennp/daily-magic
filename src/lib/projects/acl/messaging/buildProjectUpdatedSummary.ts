import {
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
  PROJECT_UPDATED_SUMMARY_FIELDS,
  type ProjectUpdatedSummaryField,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

const ALLOWED: ReadonlySet<string> = new Set(PROJECT_UPDATED_SUMMARY_FIELDS);

/** True when the token is an allowlisted project.updated summary field. */
export const isProjectUpdatedSummaryField = (
  field: string,
): field is ProjectUpdatedSummaryField => ALLOWED.has(field);

/**
 * Keep allowlisted fields only, de-dupe, preserve first-seen order.
 * Unknown tokens are dropped (invalid for thin summary).
 */
export const filterProjectUpdatedSummaryFields = (
  fields: readonly string[],
): readonly ProjectUpdatedSummaryField[] => {
  const seen = new Set<ProjectUpdatedSummaryField>();
  const out: ProjectUpdatedSummaryField[] = [];
  for (const raw of fields) {
    const field = raw.trim();
    if (!isProjectUpdatedSummaryField(field) || seen.has(field)) continue;
    seen.add(field);
    out.push(field);
  }
  return out;
};

/**
 * Thin summary for project.updated fan-out, e.g.
 * `project updated: folder_refs,repo_urls` (≤200 chars).
 * Returns null when no allowlisted fields remain.
 */
export const buildProjectUpdatedSummary = (
  fields: readonly string[],
): string | null => {
  const allowed = filterProjectUpdatedSummaryFields(fields);
  if (allowed.length === 0) return null;
  return `project updated: ${allowed.join(",")}`.slice(
    0,
    PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
  );
};
