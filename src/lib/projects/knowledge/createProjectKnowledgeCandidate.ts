import { randomUUID } from "node:crypto";

import { getSql } from "@/lib/db";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";
import { canUserSubmitProjectKnowledgeCandidate } from "@/lib/projects/knowledge/canUserSubmitProjectKnowledgeCandidate";

const createProjectKnowledgeCandidate = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly deviceId?: string | null;
  readonly sourceRunId?: string | null;
  readonly kind: "lesson" | "fact" | "decision";
  readonly summaryForCloud?: string | null;
}): Promise<string | null> => {
  const sql = getSql();
  const allowed = await canUserSubmitProjectKnowledgeCandidate({
    projectId: input.projectId,
    userId: input.ownerUserId,
    deviceId: input.deviceId,
  });

  if (!allowed) {
    return null;
  }

  const id = randomUUID();
  await sql`
    INSERT INTO project_knowledge_items (
      id,
      project_id,
      source_run_id,
      kind,
      body,
      sync_state,
      status
    )
    VALUES (
      ${id},
      ${input.projectId},
      ${input.sourceRunId ?? null},
      ${input.kind},
      ${input.summaryForCloud ?? null},
      'local',
      'candidate'
    )
  `;

  await scheduleProjectUpdatedNotify({
    projectId: input.projectId,
    fields: ["knowledge"],
    actorUserId: input.ownerUserId,
  });

  return id;
};

export default createProjectKnowledgeCandidate;
