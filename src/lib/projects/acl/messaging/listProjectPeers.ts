import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { isAgentAccessSyntheticEmail } from "@/lib/agentAccess/isAgentAccessSyntheticEmail";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectPeer = {
  readonly projectDisplayName: string | null;
  readonly teamLabel: string | null;
  readonly isAgent: boolean;
};

export type ListProjectPeersResult =
  | { readonly ok: true; readonly peers: readonly ProjectPeer[] }
  | { readonly ok: false; readonly code: "forbidden" };

export const listProjectPeers = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ListProjectPeersResult> => {
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (membership === null) {
    return { ok: false, code: "forbidden" };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT m.project_display_name, m.team_label, u.email
      FROM project_memberships m
      JOIN users u ON u.id = m.user_id
      WHERE m.project_id = ${input.projectId}
        AND m.status = 'active'
        AND m.user_id <> ${input.actorUserId}
      ORDER BY m.project_display_name ASC NULLS LAST
    `,
  );
  return {
    ok: true,
    peers: rows.map((row) => ({
      projectDisplayName: row.project_display_name
        ? String(row.project_display_name)
        : null,
      teamLabel: row.team_label ? String(row.team_label) : null,
      isAgent:
        typeof row.email === "string" &&
        isAgentAccessSyntheticEmail(String(row.email)),
    })),
  };
};
