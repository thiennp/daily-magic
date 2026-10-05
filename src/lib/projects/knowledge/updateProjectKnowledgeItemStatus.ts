import { asRowArray, getSql } from "@/lib/db";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";

const updateProjectKnowledgeItemStatus = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
  readonly itemId: string;
  readonly status: "accepted" | "rejected" | "promoted";
  readonly body?: string | null;
  readonly syncState?: "local" | "shared";
}): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_knowledge_items pki
      SET
        status = ${input.status},
        body = COALESCE(${input.body ?? null}, pki.body),
        sync_state = COALESCE(${input.syncState ?? null}, pki.sync_state),
        updated_at = NOW()
      FROM user_projects up
      WHERE pki.id = ${input.itemId}
        AND pki.project_id = ${input.projectId}
        AND up.id = pki.project_id
        AND up.owner_user_id = ${input.ownerUserId}
      RETURNING pki.id
    `,
  );

  if (rows.length === 0) {
    return false;
  }

  await scheduleProjectUpdatedNotify({
    projectId: input.projectId,
    fields: ["knowledge"],
    actorUserId: input.ownerUserId,
  });

  return true;
};

export default updateProjectKnowledgeItemStatus;
