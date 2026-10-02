import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { isAgentAccessSyntheticEmail } from "@/lib/agentAccess/isAgentAccessSyntheticEmail";
import { asRowArray, getSql } from "@/lib/db";
import type { ProjectPeer } from "@/lib/projects/acl/messaging/projectPeer.types";

export const comparePeersByName = (a: ProjectPeer, b: ProjectPeer): number => {
  if (a.projectDisplayName === null && b.projectDisplayName === null) {
    return 0;
  }
  if (a.projectDisplayName === null) {
    return 1;
  }
  if (b.projectDisplayName === null) {
    return -1;
  }
  return a.projectDisplayName.localeCompare(b.projectDisplayName);
};

export const loadActiveMemberPeers = async (input: {
  readonly projectId: string;
  readonly excludeUserId: string;
}): Promise<ProjectPeer[]> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT m.id, m.project_display_name, m.team_label, u.email
      FROM project_memberships m
      JOIN users u ON u.id = m.user_id
      WHERE m.project_id = ${input.projectId}
        AND m.status = 'active'
        AND m.user_id <> ${input.excludeUserId}
    `,
  );
  return rows.map((row) => ({
    membershipId: row.id ? String(row.id) : null,
    projectDisplayName: row.project_display_name
      ? String(row.project_display_name)
      : null,
    teamLabel: row.team_label ? String(row.team_label) : null,
    isAgent:
      typeof row.email === "string" &&
      isAgentAccessSyntheticEmail(String(row.email)),
    isOwner: false,
  }));
};
