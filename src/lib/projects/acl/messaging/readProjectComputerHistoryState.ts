import { asRowArray, getSql } from "@/lib/db";
import { parseProjectComputerHistoryState } from "@/lib/projects/acl/messaging/parseProjectComputerHistoryState";
import type { ProjectComputerHistoryState } from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";

/** Current history state for one project. No row means on_configuring (default ON). */
export const readProjectComputerHistoryState = async (
  projectId: string,
): Promise<ProjectComputerHistoryState> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT state FROM project_computer_history_settings
      WHERE project_id = ${projectId}
      LIMIT 1
    `,
  );
  return parseProjectComputerHistoryState(rows[0]?.state);
};
