import { ensureAgentAccessSchema } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { asRowArray, getSql } from "@/lib/db";

export type AddableOwnedBot = {
  readonly userId: string;
  readonly label: string;
  /** Name it already uses in another project; prefilled, editable. */
  readonly suggestedName: string | null;
};

/** Assistants `actorUserId` owns that are not yet in (or waiting to join) this project. */
export const listAddableOwnedBots = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<readonly AddableOwnedBot[]> => {
  await ensureAgentAccessSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT u.id, u.name,
        (SELECT m.project_display_name FROM project_memberships m
          WHERE m.user_id = u.id AND m.project_display_name IS NOT NULL
          ORDER BY m.created_at DESC LIMIT 1) AS project_name
      FROM users u
      WHERE u.id IN (
        SELECT user_id FROM agent_access_tokens
        WHERE owner_user_id = ${input.actorUserId} AND revoked_at IS NULL
          AND (expires_at IS NULL OR expires_at > NOW())
      )
      AND NOT EXISTS (
        SELECT 1 FROM project_memberships pm
        WHERE pm.project_id = ${input.projectId} AND pm.user_id = u.id
          AND pm.status IN ('active', 'naming_required')
      )
      AND NOT EXISTS (
        SELECT 1 FROM project_access_requests r
        WHERE r.project_id = ${input.projectId} AND r.requester_user_id = u.id
          AND r.status = 'pending'
      )
      ORDER BY u.name
    `,
  );
  return rows.map((row) => {
    const projectName = row.project_name ? String(row.project_name) : null;
    return {
      userId: String(row.id),
      label: projectName ?? (row.name ? String(row.name) : "Assistant"),
      suggestedName: projectName,
    };
  });
};
