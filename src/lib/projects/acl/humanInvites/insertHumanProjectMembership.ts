import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import type { HumanInviteRole } from "@/lib/projects/acl/humanInvites/humanInvite.constants";
import { asRowArray, getSql } from "@/lib/db";
import { randomUUID } from "node:crypto";

export type InsertHumanMembershipResult =
  | { readonly ok: true; readonly membership: ProjectMembershipRecord }
  | { readonly ok: false; readonly code: "already_member" };

/** Insert an active human seat (member_kind=human). Unique active seat per user. */
export const insertHumanProjectMembership = async (input: {
  readonly projectId: string;
  readonly userId: string;
  readonly role: HumanInviteRole;
}): Promise<InsertHumanMembershipResult> => {
  const sql = getSql();
  const membershipId = randomUUID();
  try {
    const rows = asRowArray(
      await sql`
        INSERT INTO project_memberships (
          id, project_id, user_id, role, status, team_label, scopes,
          project_display_name, member_kind
        )
        VALUES (
          ${membershipId},
          ${input.projectId},
          ${input.userId},
          ${input.role},
          'active',
          NULL,
          ${[]},
          NULL,
          'human'
        )
        RETURNING *
      `,
    );
    if (rows.length === 0) {
      return { ok: false, code: "already_member" };
    }
    return { ok: true, membership: mapProjectMembershipRow(rows[0]) };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (
      message.includes("project_memberships_project_user_active_idx") ||
      message.includes("unique") ||
      message.includes("duplicate")
    ) {
      return { ok: false, code: "already_member" };
    }
    throw error;
  }
};
