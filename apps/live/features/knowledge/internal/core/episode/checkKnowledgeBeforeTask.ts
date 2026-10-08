import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import redactTextForProjectKnowledge from "../../../../projects/internal/core/knowledge/redactTextForProjectKnowledge";
import { buildKnowledgeQuery } from "./buildKnowledgeQuery";
import {
  embedKnowledgeQuery,
  embedKnowledgeText,
  KNOWLEDGE_INDEX_EMBED_TIMEOUT_MS,
  resolveKnowledgeEmbedModel,
} from "./embedKnowledgeText";
import { getKnowledgeDb, type KnowledgeDatabase } from "./knowledgeDb";
import type { KnowledgeTaskClass } from "./episode.types";
import type { KnowledgePlan } from "./knowledgePlan";
import { takeCorrectableKnowledgeRun } from "./knowledgeRunTracker";
import {
  bumpCorrectionTurns,
  incrementEpisodeCounter,
  insertKnowledgeEvent,
  listEpisodesMissingVectors,
  listEpisodesWithVectors,
  listInjectedEpisodeIds,
  recordInjections,
  setEpisodeVector,
  upsertEpisode,
} from "./knowledgeStore";
import {
  deriveCorrectionTakeaway,
  isUserCorrection,
} from "./detectKnowledgeSignals";
import { packKnowledgeCardsToBudget } from "./packKnowledgeCards";
import {
  scoreKnowledgeCards,
  selectDiverseKnowledgeCards,
} from "./scoreKnowledgeCards";

const BACKFILL_BATCH = 5;

export type KnowledgeCheckResult = {
  readonly contextText: string;
  readonly cardCount: number;
  readonly injectedTokens: number;
};

const EMPTY_RESULT: KnowledgeCheckResult = {
  contextText: "",
  cardCount: 0,
  injectedTokens: 0,
};

/** Embed cards that were stored while Ollama was unavailable (best effort). */
export const backfillMissingKnowledgeVectors = async (
  db: KnowledgeDatabase,
  projectKey: string,
): Promise<void> => {
  for (const card of listEpisodesMissingVectors(
    db,
    projectKey,
    BACKFILL_BATCH,
  )) {
    const embedding = await embedKnowledgeText(
      `${card.request}\n${card.takeaway}`,
      KNOWLEDGE_INDEX_EMBED_TIMEOUT_MS,
    );
    if (embedding === null) {
      return;
    }
    setEpisodeVector(db, card.id, embedding, resolveKnowledgeEmbedModel());
  }
};

/** If the user is pushing back on the previous result, remember it as a mistake. */
export const registerKnowledgeUserCorrection = (input: {
  readonly db: KnowledgeDatabase;
  readonly projectKey: string;
  readonly userPrompt: string;
}): void => {
  const previous = takeCorrectableKnowledgeRun(input.projectKey);
  if (previous === null || !isUserCorrection(input.userPrompt)) {
    return;
  }
  upsertEpisode(input.db, {
    projectKey: input.projectKey,
    kind: "mistake",
    request: previous.request,
    takeaway: deriveCorrectionTakeaway({
      request: previous.request,
      correction: redactTextForProjectKnowledge(input.userPrompt),
    }),
    outcome: "failed",
    costTokens: previous.costTokens,
    sourceRunId: previous.runId,
  });
  bumpCorrectionTurns(input.db, previous.runId);
  for (const episodeId of listInjectedEpisodeIds(input.db, previous.runId)) {
    incrementEpisodeCounter(input.db, episodeId, "ineffective_count");
  }
};

/** Retrieve, budget and format project notes. Fail-open: never throws. */
export const checkKnowledgeBeforeTask = async (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly projectKey: string;
  readonly runId: string;
  readonly userPrompt: string;
  readonly promptText: string;
  readonly plan: KnowledgePlan;
  readonly taskClass: KnowledgeTaskClass;
  readonly holdout: boolean;
}): Promise<KnowledgeCheckResult> => {
  const startedAt = performance.now();
  const db = getKnowledgeDb(input.layout);
  if (db === null) {
    return EMPTY_RESULT;
  }

  try {
    registerKnowledgeUserCorrection({
      db,
      projectKey: input.projectKey,
      userPrompt: input.userPrompt,
    });

    const skipped = input.plan.mode === "skip" || input.holdout;
    let degraded: string | null = null;
    let result = EMPTY_RESULT;
    let injected: { episodeId: string; score: number }[] = [];

    if (!skipped) {
      const query = buildKnowledgeQuery(input.userPrompt);
      const cards = listEpisodesWithVectors(db, input.projectKey, {
        withVectors: input.plan.mode === "hybrid",
      });
      const queryVector =
        input.plan.mode === "hybrid" && cards.length > 0
          ? await embedKnowledgeQuery(query.text, input.plan.embedTimeoutMs)
          : null;
      if (
        input.plan.mode === "hybrid" &&
        cards.length > 0 &&
        queryVector === null
      ) {
        degraded = "embed";
      }

      const scored = scoreKnowledgeCards({
        cards,
        query,
        queryVector,
        mode: input.plan.mode,
        kinds: input.plan.kinds,
      });
      const packed = packKnowledgeCardsToBudget({
        cards: selectDiverseKnowledgeCards(scored, input.plan.minScore),
        tokenBudget: input.plan.tokenBudget,
        maxCards: input.plan.maxCards,
        promptText: input.promptText,
      });
      injected = packed.cards.map((entry) => ({
        episodeId: entry.card.id,
        score: entry.score,
      }));
      result = {
        contextText: packed.text,
        cardCount: packed.cards.length,
        injectedTokens: packed.tokens,
      };
    }

    recordInjections(db, input.runId, injected);
    insertKnowledgeEvent(db, {
      runId: input.runId,
      projectKey: input.projectKey,
      taskClass: input.taskClass,
      mode: input.holdout ? "holdout" : input.plan.mode,
      holdout: input.holdout,
      cardsInjected: result.cardCount,
      injectedTokens: result.injectedTokens,
      checkLatencyMs: Math.round(performance.now() - startedAt),
      degraded,
    });
    void backfillMissingKnowledgeVectors(db, input.projectKey).catch(
      () => undefined,
    );
    return result;
  } catch {
    return EMPTY_RESULT;
  }
};
