import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type ListProjectInvitesResult =
  | { readonly ok: true; readonly invites: readonly ProjectInviteRecord[] }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

export const listProjectInvites = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
}): Promise<ListProjectInvitesResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM project_invites
      WHERE project_id = ${input.projectId}
      ORDER BY created_at DESC
      LIMIT 100
    `,
  );
  return { ok: true, invites: rows.map((row) => mapProjectInviteRow(row)) };
};
