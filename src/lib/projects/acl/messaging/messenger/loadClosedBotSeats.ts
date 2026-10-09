import { asRowArray, getSql } from "@/lib/db";

/** Closed assistants of a project: membership id → who invited it. */
export const loadClosedBotSeats = async (
  projectId: string,
): Promise<ReadonlyMap<string, string | null>> => {
  const rows = asRowArray(
    await getSql()`
      SELECT id, invited_by_user_id FROM project_memberships
      WHERE project_id = ${projectId} AND member_kind = 'bot'
        AND status = 'active' AND closed_to_others = TRUE
    `,
  );
  return new Map(
    rows.map((row) => [
      String(row.id),
      row.invited_by_user_id ? String(row.invited_by_user_id) : null,
    ]),
  );
};
