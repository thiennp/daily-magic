import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { validateProjectDisplayName } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type RenameDisplayNameResult =
  | { readonly ok: true; readonly membership: ProjectMembershipRecord }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "forbidden"
        | "display_name_invalid"
        | "display_name_reserved"
        | "display_name_taken"
        | "not_active";
    };

export const renameProjectMembershipDisplayName = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly ownerUserId: string;
  readonly projectDisplayName: unknown;
}): Promise<RenameDisplayNameResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }
  const validated = validateProjectDisplayName(input.projectDisplayName);
  if (!validated.ok) {
    return {
      ok: false,
      code:
        validated.code === "reserved"
          ? "display_name_reserved"
          : "display_name_invalid",
    };
  }

  await ensureProjectAclSchema();
  const sql = getSql();
  let rows: Record<string, unknown>[] = [];
  try {
    rows = asRowArray(
      await sql`
        UPDATE project_memberships
        SET project_display_name = ${validated.name}
        WHERE id = ${input.membershipId}
          AND project_id = ${input.projectId}
          AND status = 'active'
          AND role = 'member'
        RETURNING *
      `,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (
      message.includes("project_memberships_display_name_active_idx") ||
      message.includes("unique") ||
      message.includes("duplicate")
    ) {
      return { ok: false, code: "display_name_taken" };
    }
    throw error;
  }
  if (rows.length === 0) {
    return { ok: false, code: "not_active" };
  }
  const membership = mapProjectMembershipRow(rows[0]);
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "membership.rename_display",
    targetUserId: membership.userId,
    detail: {
      membershipId: membership.id,
      projectDisplayName: validated.name,
      previous: rows[0].project_display_name
        ? String(rows[0].project_display_name)
        : null,
    },
  });
  return { ok: true, membership };
};
