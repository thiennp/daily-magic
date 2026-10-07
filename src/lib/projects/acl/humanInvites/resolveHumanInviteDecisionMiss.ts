import { asRowArray, getSql } from "@/lib/db";

export type HumanInviteDecisionFailCode =
  | "not_found"
  | "forbidden"
  | "not_awaiting_approval"
  | "already_member"
  | "display_name_taken";

/** Decision UPDATE matched nothing: unknown invite vs already handled. */
export const resolveHumanInviteDecisionMiss = async (
  projectId: string,
  inviteId: string,
): Promise<"not_found" | "not_awaiting_approval"> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id FROM project_human_invites
      WHERE id = ${inviteId} AND project_id = ${projectId}
      LIMIT 1
    `,
  );
  return rows.length > 0 ? "not_awaiting_approval" : "not_found";
};
