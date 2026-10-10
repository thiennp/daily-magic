import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectBotKnowledgeSchema } from "@/lib/knowledge/bots/ensureProjectBotKnowledgeSchema";
import type { KnowledgeDailyRow } from "@/lib/knowledge/knowledgeImpactView.type";

const toCount = (value: unknown): number => Number(value ?? 0);

/**
 * Assistant claims as the same daily rows computers report. "With notes" =
 * claimed right after a skill lookup that returned results; the others take
 * the holdout column. That split is not randomized, so the page calls it an
 * estimate. Notes tokens and avoided mistakes are not measurable here yet (0).
 */
export const loadBotKnowledgeDailyRows = async (
  projectId: string,
  windowDays: number,
): Promise<KnowledgeDailyRow[]> => {
  await ensureProjectBotKnowledgeSchema();
  return asRowArray(
    await getSql()`
      SELECT to_char(claimed_at::date, 'YYYY-MM-DD') AS day,
             membership_id,
             COUNT(*) AS runs,
             COUNT(*) FILTER (WHERE NOT had_lookup) AS holdout_runs,
             COUNT(*) FILTER (WHERE had_lookup) AS runs_with,
             COUNT(*) FILTER (WHERE had_lookup AND repeated_mistake) AS repeats_with,
             COUNT(*) FILTER (WHERE NOT had_lookup AND repeated_mistake) AS repeats_holdout,
             COUNT(*) FILTER (WHERE had_lookup AND skill_id IS NOT NULL) AS cards_injected
      FROM project_bot_knowledge_events
      WHERE project_id = ${projectId}
        AND claimed_at >= (CURRENT_DATE - ${windowDays}::int)
      GROUP BY claimed_at::date, membership_id
      ORDER BY day ASC`,
  ).map((row) => ({
    day: String(row.day),
    deviceId: `bot:${String(row.membership_id)}`,
    runs: toCount(row.runs),
    holdoutRuns: toCount(row.holdout_runs),
    runsWith: toCount(row.runs_with),
    repeatsWith: toCount(row.repeats_with),
    repeatsHoldout: toCount(row.repeats_holdout),
    cardsInjected: toCount(row.cards_injected),
    injectedTokens: 0,
    mistakesAvoided: 0,
    estTokensSaved: 0,
    correctionTurns: 0,
  }));
};
