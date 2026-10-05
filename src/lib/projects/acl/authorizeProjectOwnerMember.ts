import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type AuthorizeProjectOwnerMemberResult =
  | { readonly ok: true; readonly membership: ProjectMembershipRecord }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/** Project owner only: load one active member (role member) of that project. */
export const authorizeProjectOwnerMember = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly actorUserId: string;
}): Promise<AuthorizeProjectOwnerMemberResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.actorUserId) {
    return { ok: false, code: "forbidden" };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM project_memberships
      WHERE id = ${input.membershipId}
        AND project_id = ${input.projectId}
        AND status = 'active'
        AND role = 'member'
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (row === undefined) {
    return { ok: false, code: "not_found" };
  }
  return { ok: true, membership: mapProjectMembershipRow(row) };
};
