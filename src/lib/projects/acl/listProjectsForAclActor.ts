import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { asRowArray, getSql } from "@/lib/db";

export interface ProjectAclListItem {
  readonly id: string;
  readonly name: string;
  readonly relation: "owner" | "member";
}

/** id + name only for owner ∪ active members. */
export const listProjectsForAclActor = async (
  actorUserId: string,
): Promise<readonly ProjectAclListItem[]> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const owned = asRowArray(
    await sql`
      SELECT id, name
      FROM user_projects
      WHERE owner_user_id = ${actorUserId}
      ORDER BY last_used_at DESC NULLS LAST, created_at DESC
    `,
  );
  const member = asRowArray(
    await sql`
      SELECT p.id, p.name
      FROM project_memberships m
      INNER JOIN user_projects p ON p.id = m.project_id
      WHERE m.user_id = ${actorUserId}
        AND m.status = 'active'
        AND p.owner_user_id <> ${actorUserId}
      ORDER BY m.created_at DESC
    `,
  );

  const items: ProjectAclListItem[] = [
    ...owned.map((row) => ({
      id: String(row.id),
      name: String(row.name),
      relation: "owner" as const,
    })),
    ...member.map((row) => ({
      id: String(row.id),
      name: String(row.name),
      relation: "member" as const,
    })),
  ];
  return items;
};
