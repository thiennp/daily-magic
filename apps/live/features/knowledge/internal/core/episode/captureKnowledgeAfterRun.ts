import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import redactTextForProjectKnowledge from "../../../../projects/internal/core/knowledge/redactTextForProjectKnowledge";
import { backfillMissingKnowledgeVectors } from "./checkKnowledgeBeforeTask";
import {
  deriveFixTakeaway,
  deriveMistakeTakeaway,
  findFirstErrorLine,
  findVerifyFailureLine,
  isRevertSubject,
  normalizeKnowledgeRequest,
  parseRevertedSha,
} from "./detectKnowledgeSignals";
import {
  embedKnowledgeText,
  KNOWLEDGE_INDEX_EMBED_TIMEOUT_MS,
  resolveKnowledgeEmbedModel,
} from "./embedKnowledgeText";
import { estimateKnowledgeTokens } from "./estimateKnowledgeTokens";
import { fingerprintKnowledgeText } from "./knowledgeProjectKey";
import { getKnowledgeDb, type KnowledgeDatabase } from "./knowledgeDb";
import { rememberKnowledgeRun } from "./knowledgeRunTracker";
import {
  finishKnowledgeEvent,
  findEpisodeByFingerprint,
  findEpisodesByCommit,
  getEpisode,
  incrementEpisodeCounter,
  listInjectedEpisodeIds,
  markEpisodeSuperseded,
  pruneEpisodes,
  recordMistakeHit,
  setEpisodeVector,
  upsertEpisode,
} from "./knowledgeStore";
import { reconcileUnverifiedKnowledgeFixes } from "./reconcileUnverifiedKnowledgeFixes";
import { readGitRunChanges, type GitRunChanges } from "./readGitRunChanges";

const MAX_COST_TOKENS = 20_000;
const MAX_COMMITS_ON_CARD = 5;

export type KnowledgeRunGitBefore = {
  readonly headSha: string | null;
  readonly porcelainLineCount: number;
};

const embedCard = async (
  db: KnowledgeDatabase,
  card: {
    readonly id: string;
    readonly request: string;
    readonly takeaway: string;
  },
): Promise<void> => {
  const embedding = await embedKnowledgeText(
    `${card.request}\n${card.takeaway}`,
    KNOWLEDGE_INDEX_EMBED_TIMEOUT_MS,
  );
  if (embedding !== null) {
    setEpisodeVector(db, card.id, embedding, resolveKnowledgeEmbedModel());
  }
};

const recordReverts = (input: {
  readonly db: KnowledgeDatabase;
  readonly projectKey: string;
  readonly changes: GitRunChanges;
  readonly request: string;
  readonly runId: string;
}): string[] => {
  const createdIds: string[] = [];
  for (const commit of input.changes.commits) {
    const revertedSha = isRevertSubject(commit.subject)
      ? parseRevertedSha(commit.body)
      : null;
    if (revertedSha === null) {
      continue;
    }
    const reverted = findEpisodesByCommit(
      input.db,
      input.projectKey,
      revertedSha,
    );
    for (const card of reverted) {
      markEpisodeSuperseded(input.db, card.id);
    }
    const result = upsertEpisode(input.db, {
      projectKey: input.projectKey,
      kind: "mistake",
      request: input.request,
      takeaway: `Approach was reverted: ${commit.subject.slice(0, 160)}${reverted[0] !== undefined ? ` (was: ${reverted[0].takeaway.slice(0, 80)})` : ""}`,
      outcome: "failed",
      commitShas: [commit.sha],
      sourceRunId: input.runId,
    });
    createdIds.push(result.id);
  }
  return createdIds;
};

const applyRunFeedback = (input: {
  readonly db: KnowledgeDatabase;
  readonly runId: string;
  readonly passed: boolean;
  readonly mistakeFingerprint: string | null;
}): void => {
  for (const episodeId of listInjectedEpisodeIds(input.db, input.runId)) {
    const card = getEpisode(input.db, episodeId);
    if (card === null) {
      continue;
    }
    const repeatedThisMistake =
      input.mistakeFingerprint !== null &&
      card.fingerprint === input.mistakeFingerprint;
    if (repeatedThisMistake) {
      incrementEpisodeCounter(input.db, episodeId, "ineffective_count");
      recordMistakeHit(input.db, {
        episodeId,
        runId: input.runId,
        prevented: false,
      });
      continue;
    }
    if (input.passed) {
      incrementEpisodeCounter(input.db, episodeId, "useful_count");
      if (card.kind === "mistake") {
        recordMistakeHit(input.db, {
          episodeId,
          runId: input.runId,
          prevented: true,
        });
      }
    }
  }
};

/** Turn a finished run into episode cards, commit links and feedback. Never throws. */
export const captureKnowledgeAfterRun = async (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly projectKey: string;
  readonly projectFolderPath: string;
  readonly runId: string;
  readonly prompt: string;
  readonly output: string;
  readonly exitCode: number | null | undefined;
  readonly gitBefore: KnowledgeRunGitBefore | undefined;
}): Promise<void> => {
  const db = getKnowledgeDb(input.layout);
  if (db === null) {
    return;
  }

  try {
    const prompt = redactTextForProjectKnowledge(input.prompt);
    const output = redactTextForProjectKnowledge(input.output);
    const request = normalizeKnowledgeRequest(prompt);
    const failed =
      input.exitCode !== undefined &&
      input.exitCode !== null &&
      input.exitCode !== 0;
    const verifyLine = failed ? null : findVerifyFailureLine(output);
    const evidence = failed ? findFirstErrorLine(output) : verifyLine;
    const costTokens = Math.min(
      MAX_COST_TOKENS,
      estimateKnowledgeTokens(prompt) + estimateKnowledgeTokens(output),
    );
    const newCardIds: string[] = [];
    let mistakeFingerprint: string | null = null;
    let repeatedMistake = false;

    if (evidence !== null && evidence.length > 0) {
      mistakeFingerprint = fingerprintKnowledgeText(evidence);
      repeatedMistake =
        findEpisodeByFingerprint(db, input.projectKey, mistakeFingerprint) !==
        null;
      const result = upsertEpisode(db, {
        projectKey: input.projectKey,
        kind: "mistake",
        request,
        takeaway: deriveMistakeTakeaway({ request, evidence }),
        outcome: "failed",
        fingerprint: mistakeFingerprint,
        costTokens,
        sourceRunId: input.runId,
      });
      if (result.created) {
        newCardIds.push(result.id);
      }
    }

    const changes = await readGitRunChanges({
      projectFolderPath: input.projectFolderPath,
      headBefore: input.gitBefore?.headSha ?? null,
    });
    const hasCommits = changes.commits.length > 0;
    const dirtyBefore = input.gitBefore?.porcelainLineCount ?? 0;
    const files = hasCommits
      ? changes.committedFiles
      : changes.dirtyFiles.length > dirtyBefore
        ? changes.dirtyFiles
        : [];

    if (!failed && (hasCommits || files.length > 0)) {
      const result = upsertEpisode(db, {
        projectKey: input.projectKey,
        kind: "fix",
        request,
        takeaway: deriveFixTakeaway({
          request,
          commitSubject: changes.commits[0]?.subject ?? null,
          fileCount: files.length,
        }),
        files,
        commitShas: changes.commits
          .slice(0, MAX_COMMITS_ON_CARD)
          .map((commit) => commit.sha),
        branch: changes.branch,
        outcome: hasCommits && verifyLine === null ? "verified" : "unverified",
        costTokens,
        sourceRunId: input.runId,
      });
      if (result.created) {
        newCardIds.push(result.id);
      }
    }

    newCardIds.push(
      ...recordReverts({
        db,
        projectKey: input.projectKey,
        changes,
        request,
        runId: input.runId,
      }),
    );

    applyRunFeedback({
      db,
      runId: input.runId,
      passed: !failed && verifyLine === null,
      mistakeFingerprint,
    });
    finishKnowledgeEvent(db, {
      runId: input.runId,
      outcome: failed || verifyLine !== null ? "fail" : "pass",
      repeatedMistake,
      createdMistake: mistakeFingerprint !== null,
    });
    rememberKnowledgeRun(input.projectKey, {
      runId: input.runId,
      request,
      costTokens,
      passed: !failed && verifyLine === null,
    });
    pruneEpisodes(db, input.projectKey);

    for (const cardId of newCardIds) {
      const card = getEpisode(db, cardId);
      if (card !== null) {
        await embedCard(db, card);
      }
    }
    await reconcileUnverifiedKnowledgeFixes({
      db,
      projectKey: input.projectKey,
      projectFolderPath: input.projectFolderPath,
    });
    await backfillMissingKnowledgeVectors(db, input.projectKey);
  } catch {
    // knowledge capture must never affect the run
  }
};
