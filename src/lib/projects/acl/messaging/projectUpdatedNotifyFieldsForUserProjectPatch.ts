import type { ProjectUpdatedSummaryField } from "@/lib/projects/acl/messaging/projectUpdated.constants";

/**
 * Map a successful user_projects patch input to project.updated summary tags.
 * name / deviceId / folder path → project_info; repo URLs / default branch → repo_urls.
 */
export const projectUpdatedNotifyFieldsForUserProjectPatch = (input: {
  readonly name?: string;
  readonly deviceId?: string | null;
  readonly folderPath?: string;
  readonly repoUrls?: readonly string[];
  readonly defaultBranch?: string | null;
}): readonly ProjectUpdatedSummaryField[] => {
  const fields: ProjectUpdatedSummaryField[] = [];
  if (
    input.name !== undefined ||
    input.deviceId !== undefined ||
    input.folderPath !== undefined
  ) {
    fields.push("project_info");
  }
  if (input.repoUrls !== undefined || input.defaultBranch !== undefined) {
    fields.push("repo_urls");
  }
  return fields;
};
