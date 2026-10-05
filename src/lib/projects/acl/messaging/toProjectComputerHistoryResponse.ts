import type { ProjectComputerHistoryCommandResult } from "@/lib/projects/acl/messaging/projectComputerHistoryCommand.types";
import { PROJECT_COMPUTER_HISTORY_HTTP_STATUS } from "@/lib/projects/acl/messaging/projectComputerHistoryHttpStatus.constant";

/** Orchestrator result → JSON response for the history routes. */
export const toProjectComputerHistoryResponse = (
  result: ProjectComputerHistoryCommandResult,
): Response =>
  result.ok
    ? Response.json(result)
    : Response.json(
        { ok: false, errorMessage: result.code, state: result.state ?? null },
        { status: PROJECT_COMPUTER_HISTORY_HTTP_STATUS[result.code] },
      );
