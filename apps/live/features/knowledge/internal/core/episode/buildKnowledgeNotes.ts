import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { buildKnowledgeQuery } from "./buildKnowledgeQuery";
import { getKnowledgeDb } from "./knowledgeDb";
import { isKnowledgeOnForFolder } from "./knowledgeProjectFlags";
import { isKnowledgeEnabled } from "./knowledgeProjectKey";
import { listEpisodesWithVectors } from "./knowledgeStore";
import { packKnowledgeCardsToBudget } from "./packKnowledgeCards";
import {
  scoreKnowledgeCards,
  selectDiverseKnowledgeCards,
} from "./scoreKnowledgeCards";

const NOTES_TOKEN_BUDGET = 150;
const NOTES_MAX_CARDS = 2;
const NOTES_MIN_SCORE = 0.3;

export type KnowledgeNotesResult = {
  readonly text: string;
  readonly cards: readonly {
    readonly episodeId: string;
    readonly score: number;
  }[];
  readonly tokens: number;
};

const NO_NOTES: KnowledgeNotesResult = { text: "", cards: [], tokens: 0 };

/**
 * Lexical-only, fail-open project notes for agents running outside AgentWitch
 * dispatch (check_context hook / MCP), with the cards used so a caller can
 * record the injection. Empty result when nothing relevant.
 */
export const selectKnowledgeNotes = (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly projectKey: string;
  readonly message: string;
  readonly projectFolderPath?: string;
}): KnowledgeNotesResult => {
  if (
    !isKnowledgeEnabled() ||
    input.message.trim().length === 0 ||
    (input.projectFolderPath !== undefined &&
      !isKnowledgeOnForFolder(input.projectFolderPath))
  ) {
    return NO_NOTES;
  }
  try {
    const db = getKnowledgeDb(input.layout);
    if (db === null) {
      return NO_NOTES;
    }
    const scored = scoreKnowledgeCards({
      cards: listEpisodesWithVectors(db, input.projectKey, {
        withVectors: false,
      }),
      query: buildKnowledgeQuery(input.message),
      queryVector: null,
      mode: "fts",
      kinds: ["mistake", "fix", "decision", "lesson"],
    });
    const packed = packKnowledgeCardsToBudget({
      cards: selectDiverseKnowledgeCards(scored, NOTES_MIN_SCORE),
      tokenBudget: NOTES_TOKEN_BUDGET,
      maxCards: NOTES_MAX_CARDS,
      promptText: input.message,
    });
    return {
      text: packed.text.trim(),
      cards: packed.cards.map((entry) => ({
        episodeId: entry.card.id,
        score: entry.score,
      })),
      tokens: packed.tokens,
    };
  } catch {
    return NO_NOTES;
  }
};

/** Notes text only (check_context / MCP callers that do not record a run). */
export const buildKnowledgeNotes = (
  input: Parameters<typeof selectKnowledgeNotes>[0],
): string => selectKnowledgeNotes(input).text;
