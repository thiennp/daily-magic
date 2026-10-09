import type { AutoSkillModuleDb } from "./autoSkillModuleDb";

/**
 * True when this run already fed the module store (it has at least one
 * occurrence). A rescan then skips extraction, matching and judging for it,
 * so "Scan past tasks" costs nothing for runs it has seen. A run that was
 * only recorded (judge paused, store unavailable) has no occurrence yet and
 * is still processed.
 */
export const hasProcessedAutoSkillRun = (
  db: AutoSkillModuleDb,
  runId: string,
): boolean =>
  db
    .prepare("SELECT 1 FROM module_occurrence WHERE run_id = ? LIMIT 1")
    .get(runId) !== undefined;
