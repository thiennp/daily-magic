import type { ProjectComputerHistoryErrorCode } from "@/lib/projects/acl/messaging/projectComputerHistoryCommand.types";

export const PROJECT_COMPUTER_HISTORY_HTTP_STATUS: Readonly<
  Record<ProjectComputerHistoryErrorCode, number>
> = {
  not_found: 404,
  forbidden: 403,
  no_project_computer: 409,
  illegal_transition: 409,
  backlog_pending: 409,
};
