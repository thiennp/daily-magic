import type { AutoSkillRunRecord } from "./autoSkill.types";
import { listClusterOccurrences } from "./autoSkillModuleClusterDb";
import type { AutoSkillModuleDb } from "./autoSkillModuleDb";

const DRAFT_OCCURRENCES = 6;
const SNIPPET_CAP = 300;

/**
 * One pseudo-run per occurrence of the repeated step: the step text plus the
 * snippet of the prompt it came from and that run's result (previews only
 * for runs stored redacted). Scrubbed again by the draft path.
 */
export const buildClusterDraftRuns = (
  db: AutoSkillModuleDb,
  clusterId: string,
  knownRuns: readonly AutoSkillRunRecord[],
  currentRun: AutoSkillRunRecord,
): AutoSkillRunRecord[] => {
  const byId = new Map(
    [...knownRuns, currentRun].map((r) => [r.runId, r] as const),
  );
  return listClusterOccurrences(db, clusterId, DRAFT_OCCURRENCES)
    .reverse()
    .map(({ runId, text }) => {
      const run = byId.get(runId);
      return {
        runId,
        prompt: `Step: ${text}\nFrom request: ${(run?.prompt ?? "").slice(0, SNIPPET_CAP)}`,
        resultSummary: run?.resultSummary ?? "",
        completedAt: run?.completedAt ?? currentRun.completedAt,
        writerAgent: run?.writerAgent ?? null,
      };
    });
};
