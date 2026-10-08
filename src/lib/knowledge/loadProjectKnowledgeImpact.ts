import { asRowArray, getSql } from "@/lib/db";
import {
  buildProjectKnowledgeImpactView,
  type KnowledgeDailyRow,
  type ProjectKnowledgeImpactView,
} from "@/lib/knowledge/buildProjectKnowledgeImpactView";
import { ensureProjectKnowledgeSchema } from "@/lib/knowledge/ensureProjectKnowledgeSchema";
import { loadKnowledgeSharedCards } from "@/lib/knowledge/loadKnowledgeSharedCards";
import { loadKnowledgeComputers } from "@/lib/knowledge/loadKnowledgeComputers";

const DEFAULT_WINDOW_DAYS = 30;

const toCount = (value: unknown): number => Number(value ?? 0);

const loadDailyRows = async (
  projectId: string,
  windowDays: number,
): Promise<KnowledgeDailyRow[]> =>
  asRowArray(
    await getSql()`
      SELECT to_char(day, 'YYYY-MM-DD') AS day, device_id, runs, holdout_runs,
             runs_with, repeats_with, repeats_holdout, cards_injected,
             injected_tokens, mistakes_avoided, est_tokens_saved, correction_turns
      FROM project_knowledge_daily
      WHERE project_id = ${projectId}
        AND day >= (CURRENT_DATE - ${windowDays}::int)
      ORDER BY day ASC
    `,
  ).map((row) => ({
    day: String(row.day),
    deviceId: String(row.device_id),
    runs: toCount(row.runs),
    holdoutRuns: toCount(row.holdout_runs),
    runsWith: toCount(row.runs_with),
    repeatsWith: toCount(row.repeats_with),
    repeatsHoldout: toCount(row.repeats_holdout),
    cardsInjected: toCount(row.cards_injected),
    injectedTokens: toCount(row.injected_tokens),
    mistakesAvoided: toCount(row.mistakes_avoided),
    estTokensSaved: toCount(row.est_tokens_saved),
    correctionTurns: toCount(row.correction_turns),
  }));

export const loadProjectKnowledgeImpact = async (input: {
  readonly projectId: string;
  readonly includeComputers: boolean;
  readonly windowDays?: number;
}): Promise<ProjectKnowledgeImpactView> => {
  await ensureProjectKnowledgeSchema();
  const windowDays = input.windowDays ?? DEFAULT_WINDOW_DAYS;
  const [rows, computers] = await Promise.all([
    loadDailyRows(input.projectId, windowDays),
    loadKnowledgeComputers(input.projectId),
  ]);
  const view = buildProjectKnowledgeImpactView({
    rows,
    computers,
    windowDays,
    includeComputers: input.includeComputers,
  });
  return input.includeComputers
    ? { ...view, sharedCards: await loadKnowledgeSharedCards(input.projectId) }
    : view;
};
