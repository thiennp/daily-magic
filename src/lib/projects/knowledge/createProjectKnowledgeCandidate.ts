import { randomUUID } from "node:crypto";

import { asRowArray, getSql } from "@/lib/db";

const createProjectKnowledgeCandidate = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly sourceRunId?: string | null;
  readonly kind: "lesson" | "fact" | "decision";
  readonly summaryForCloud?: string | null;
}): Promise<string | null> => {
  const sql = getSql();
  const projectRows = asRowArray(
    await sql`
      SELECT id
      FROM user_projects
      WHERE id = ${input.projectId}
        AND owner_user_id = ${input.ownerUserId}
      LIMIT 1
    `,
  );

  if (projectRows.length === 0) {
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

  return id;
};

export default createProjectKnowledgeCandidate;
