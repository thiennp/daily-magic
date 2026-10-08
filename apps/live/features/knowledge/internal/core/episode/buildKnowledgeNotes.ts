import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { buildKnowledgeQuery } from "./buildKnowledgeQuery";
import { getKnowledgeDb } from "./knowledgeDb";
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

/**
 * Lexical-only, fail-open project notes for agents running outside AgentWitch
 * dispatch (check_context hook / MCP). Empty string when nothing relevant.
 */
export const buildKnowledgeNotes = (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly projectKey: string;
  readonly message: string;
}): string => {
  if (!isKnowledgeEnabled() || input.message.trim().length === 0) {
    return "";
  }
  try {
    const db = getKnowledgeDb(input.layout);
    if (db === null) {
      return "";
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
    return packKnowledgeCardsToBudget({
      cards: selectDiverseKnowledgeCards(scored, NOTES_MIN_SCORE),
      tokenBudget: NOTES_TOKEN_BUDGET,
      maxCards: NOTES_MAX_CARDS,
      promptText: input.message,
    }).text.trim();
  } catch {
    return "";
  }
};
