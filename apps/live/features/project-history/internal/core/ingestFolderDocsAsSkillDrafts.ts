import type { AutoSkillCloud } from "./autoSkillCloud";
import { collectDocSources } from "./collectDocSources";
import {
  DOC_INGEST_MAX_BACKFILLED,
  DOC_INGEST_MAX_LIBRARY,
  DOC_INGEST_MAX_PER_PASS,
  DOC_INGEST_MAX_QUESTIONS_PER_PASS,
} from "./docIngest.constants";
import { evaluateDocSource, type DocEvaluation } from "./evaluateDocSource";

export type DocIngestResult = {
  readonly outcome: "disabled" | "done";
  readonly scanned: number;
  readonly eligible: number;
  readonly asked: number;
  readonly skipped: Readonly<Record<string, number>>;
};

type Candidate = Extract<DocEvaluation, { kind: "candidate" }>;

const countSkips = (
  evaluations: readonly DocEvaluation[],
): Readonly<Record<string, number>> =>
  evaluations.reduce<Record<string, number>>(
    (acc, row) =>
      row.kind === "skip"
        ? { ...acc, [row.reason]: (acc[row.reason] ?? 0) + 1 }
        : acc,
    {},
  );

/**
 * One deterministic pass over the folder's skills, commands and Q&A docs. No
 * model runs. Each eligible doc becomes an owner question (Save / Not now /
 * Never) through the same cloud port as auto skills; nothing is published
 * here. Bounded by per-pass, library and backfill caps.
 */
export const ingestFolderDocsAsSkillDrafts = async (input: {
  readonly projectId: string;
  readonly folderPath: string;
  readonly cloud: Pick<AutoSkillCloud, "getSettings" | "postSuggestion">;
  /** Names and ids of the skills the project already has (published and draft). */
  readonly existingNames: readonly string[];
  /** Skills already created by a doc pass (`origin: folder-doc`). */
  readonly backfilledCount: number;
}): Promise<DocIngestResult> => {
  const settings = await input.cloud.getSettings(input.projectId);
  const sources = collectDocSources(input.folderPath);
  if (!settings.enabled) {
    return {
      outcome: "disabled",
      scanned: sources.length,
      eligible: 0,
      asked: 0,
      skipped: {},
    };
  }
  const evaluations = sources.map((source) =>
    evaluateDocSource(source, input.existingNames),
  );
  const blocked = new Set([
    ...settings.neverClusterIds,
    ...settings.savedClusterIds,
    ...settings.pendingClusterIds,
  ]);
  const candidates = evaluations
    .filter((row): row is Candidate => row.kind === "candidate")
    .filter((row) => !blocked.has(row.clusterId))
    .sort((a, b) => b.stepCount - a.stepCount);
  const room = Math.max(
    0,
    Math.min(
      DOC_INGEST_MAX_PER_PASS,
      DOC_INGEST_MAX_LIBRARY - input.existingNames.length,
      DOC_INGEST_MAX_BACKFILLED - input.backfilledCount,
    ),
  );
  const toAsk = candidates
    .slice(0, room)
    .slice(0, DOC_INGEST_MAX_QUESTIONS_PER_PASS);
  await Promise.all(
    toAsk.map((row) =>
      input.cloud.postSuggestion(input.projectId, {
        clusterId: row.clusterId,
        title: `Save ${row.draft.relPath} as a skill?`,
        prompt: row.draft.relPath,
        occurrences: 1,
        matches: [],
        draftName: row.draft.name,
        draftBody: row.markdown,
        judgeLabel: `Drafted without AI from ${row.draft.relPath}. The text is stored in your AgentWitch cloud until you answer.`,
        kind: "skill",
      }),
    ),
  );
  return {
    outcome: "done",
    scanned: sources.length,
    eligible: candidates.length,
    asked: toAsk.length,
    skipped: countSkips(evaluations),
  };
};
