import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectKnowledgeSchema } from "@/lib/knowledge/ensureProjectKnowledgeSchema";
import { saveKnowledgeSharedCards } from "@/lib/knowledge/saveKnowledgeSharedCards";
import type { KnowledgeHeartbeatReport } from "@/lib/knowledge/knowledgeHeartbeat.type";

/** Projects among `projectIds` the device owner owns or is an active member of. */
const listAuthorizedProjectIds = async (
  userId: string,
  projectIds: readonly string[],
): Promise<ReadonlySet<string>> => {
  if (projectIds.length === 0) {
    return new Set();
  }
  const rows = asRowArray(
    await getSql()`
      SELECT id AS project_id
      FROM user_projects
      WHERE owner_user_id = ${userId}
        AND id = ANY(${[...projectIds]}::text[])
      UNION
      SELECT project_id
      FROM project_memberships
      WHERE user_id = ${userId}
        AND status = 'active'
        AND project_id = ANY(${[...projectIds]}::text[])
    `,
  );
  return new Set(rows.map((row) => String(row.project_id)));
};

/** Store computer capabilities and upsert daily aggregates for member projects. */
export const saveKnowledgeHeartbeat = async (input: {
  readonly userId: string;
  readonly deviceId: string;
  readonly report: KnowledgeHeartbeatReport;
}): Promise<void> => {
  await ensureProjectKnowledgeSchema();
  const sql = getSql();
  await sql`
    UPDATE agent_witch_devices
    SET knowledge_capabilities = ${JSON.stringify(input.report.capabilities)}::jsonb,
        knowledge_capabilities_at = NOW()
    WHERE id = ${input.deviceId}
      AND revoked_at IS NULL
      AND (
        knowledge_capabilities IS DISTINCT FROM ${JSON.stringify(input.report.capabilities)}::jsonb
        OR knowledge_capabilities_at IS NULL
        OR knowledge_capabilities_at < NOW() - INTERVAL '10 minutes'
      )
  `;

  const authorized = await listAuthorizedProjectIds(input.userId, [
    ...new Set([
      ...input.report.daily.map((row) => row.projectId),
      ...input.report.cards.map((card) => card.projectId),
      ...input.report.shareOffProjectIds,
    ]),
  ]);
  await saveKnowledgeSharedCards({
    deviceId: input.deviceId,
    authorizedProjectIds: authorized,
    cards: input.report.cards,
    shareOffProjectIds: input.report.shareOffProjectIds,
  });
  for (const row of input.report.daily) {
    if (!authorized.has(row.projectId)) {
      continue;
    }
    await sql`
      INSERT INTO project_knowledge_daily (
        project_id, device_id, day, runs, holdout_runs, runs_with, repeats_with,
        repeats_holdout, cards_injected, injected_tokens, mistakes_avoided,
        est_tokens_saved, correction_turns, updated_at
      ) VALUES (
        ${row.projectId}, ${input.deviceId}, ${row.day}::date, ${row.runs},
        ${row.holdoutRuns}, ${row.runsWith}, ${row.repeatsWith},
        ${row.repeatsHoldout}, ${row.cardsInjected}, ${row.injectedTokens},
        ${row.mistakesAvoided}, ${row.estTokensSaved}, ${row.correctionTurns}, NOW()
      )
      ON CONFLICT (project_id, device_id, day) DO UPDATE SET
        runs = EXCLUDED.runs,
        holdout_runs = EXCLUDED.holdout_runs,
        runs_with = EXCLUDED.runs_with,
        repeats_with = EXCLUDED.repeats_with,
        repeats_holdout = EXCLUDED.repeats_holdout,
        cards_injected = EXCLUDED.cards_injected,
        injected_tokens = EXCLUDED.injected_tokens,
        mistakes_avoided = EXCLUDED.mistakes_avoided,
        est_tokens_saved = EXCLUDED.est_tokens_saved,
        correction_turns = EXCLUDED.correction_turns,
        updated_at = NOW()
    `;
  }
};
