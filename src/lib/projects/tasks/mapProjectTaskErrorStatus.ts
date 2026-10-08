import type { UpdateProjectTaskResult } from "@/lib/projects/tasks/updateProjectTask";

type ProjectTaskErrorCode = Extract<
  UpdateProjectTaskResult,
  { readonly ok: false }
>["code"];

const STATUS_BY_CODE: Readonly<Partial<Record<ProjectTaskErrorCode, number>>> =
  {
    viewer_read_only: 403,
    forbidden: 403,
    naming_required: 403,
    missing_scope: 403,
    not_found: 404,
    task_not_found: 404,
    invalid_transition: 409,
    update_conflict: 409,
  };

/** Update error code → HTTP status. Unlisted (invalid_*, owner_not_member, …) = 400. */
export const mapProjectTaskErrorStatus = (code: ProjectTaskErrorCode): number =>
  STATUS_BY_CODE[code] ?? 400;
