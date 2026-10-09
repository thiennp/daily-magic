import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectDefinitionOfDoneSchema } from "@/lib/projects/definitionOfDone/ensureProjectDefinitionOfDoneSchema";

/** The project's definition of done, or null when the owner has not set one. */
export const getProjectDefinitionOfDone = async (
  projectId: string,
): Promise<string | null> => {
  await ensureProjectDefinitionOfDoneSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT body FROM project_definition_of_done WHERE project_id = ${projectId}
    `,
  );
  const body = rows[0]?.body;
  return typeof body === "string" ? body : null;
};

export const setProjectDefinitionOfDone = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly body: string | null;
}): Promise<void> => {
  await ensureProjectDefinitionOfDoneSchema();
  const sql = getSql();
  if (input.body === null) {
    await sql`
      DELETE FROM project_definition_of_done WHERE project_id = ${input.projectId}
    `;
    return;
  }
  await sql`
    INSERT INTO project_definition_of_done (project_id, body, updated_by_user_id)
    VALUES (${input.projectId}, ${input.body}, ${input.actorUserId})
    ON CONFLICT (project_id) DO UPDATE
      SET body = EXCLUDED.body,
          updated_by_user_id = EXCLUDED.updated_by_user_id,
          updated_at = NOW()
  `;
};
