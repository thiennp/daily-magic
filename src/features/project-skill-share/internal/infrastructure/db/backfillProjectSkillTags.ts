import { extractSkillTags } from "@/features/project-skill-share/internal/core/extractSkillTags";
import { asRowArray, getSql } from "@/lib/db";

const BATCH = 100;
const MAX_BATCHES = 50;

const backfillBatch = async (batch: number): Promise<void> => {
  if (batch >= MAX_BATCHES) {
    return;
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT s.id, v.body
      FROM project_skills s
      LEFT JOIN project_skill_versions v
        ON v.skill_row_id = s.id
       AND v.version = COALESCE(s.published_version, s.latest_version)
      WHERE s.tags IS NULL
      LIMIT ${BATCH}
    `,
  );
  if (rows.length === 0) {
    return;
  }
  for (const row of rows) {
    const tags = extractSkillTags(String(row.body ?? ""));
    await sql`
      UPDATE project_skills SET tags = ${[...tags]}::text[]
      WHERE id = ${String(row.id)}
    `;
  }
  await backfillBatch(batch + 1);
};

/**
 * Fill `tags` for rows saved before the column existed (NULL = not scanned,
 * empty array = scanned, none). Reads the published (else latest) body.
 * Best effort: a failure leaves the rows NULL, which reads as no tags.
 */
export const backfillProjectSkillTags = async (): Promise<void> => {
  try {
    await backfillBatch(0);
  } catch {
    // tags are an optional ranking signal; never block the skill tools
  }
};
