import { asRowArray, getSql } from "@/lib/db";

/** Access-request ids whose invite was created by `userId` (any status). */
export const listInviterRequestIds = async (input: {
  readonly projectId: string;
  readonly userId: string;
}): Promise<ReadonlySet<string>> => {
  const rows = asRowArray(
    await getSql()`
      SELECT r.id FROM project_access_requests AS r
      JOIN project_invites AS i ON i.id = r.invite_id
      WHERE r.project_id = ${input.projectId}
        AND i.created_by_user_id = ${input.userId}
    `,
  );
  return new Set(rows.map((row) => String(row.id)));
};
