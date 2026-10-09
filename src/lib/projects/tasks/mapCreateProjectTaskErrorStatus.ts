import type { CreateProjectTaskResult } from "@/lib/projects/tasks/createProjectTask";

type CreateErrorCode = Extract<
  CreateProjectTaskResult,
  { readonly ok: false }
>["code"];

const STATUS_BY_CODE: Readonly<Partial<Record<CreateErrorCode, number>>> = {
  viewer_read_only: 403,
  forbidden: 403,
  naming_required: 403,
  missing_scope: 403,
  not_found: 404,
  task_cap_reached: 409,
  rate_limited: 429,
};

/** Create error code → HTTP status. Unlisted (invalid_*, title_*, owner_not_member, …) = 400. */
export const mapCreateProjectTaskErrorStatus = (
  code: CreateErrorCode,
): number => STATUS_BY_CODE[code] ?? 400;
