import { buildKnowledgeQuery } from "./buildKnowledgeQuery";
import type { EpisodeCard } from "./episode.types";
import type { KnowledgeDatabase } from "./knowledgeDb";
import { listEpisodesWithVectors } from "./knowledgeStore";
import {
  scoreKnowledgeCards,
  selectDiverseKnowledgeCards,
} from "./scoreKnowledgeCards";

const DEFAULT_LIST_LIMIT = 50;
const MIN_SEARCH_SCORE = 0.1;

/** Browse (empty query: newest first) or lexically search one project's cards. */
export const searchKnowledgeCards = (
  db: KnowledgeDatabase,
  input: {
    readonly projectKey: string;
    readonly query: string;
    readonly limit?: number;
  },
): EpisodeCard[] => {
  const limit = input.limit ?? DEFAULT_LIST_LIMIT;
  const cards = listEpisodesWithVectors(db, input.projectKey, {
    withVectors: false,
  });
  if (input.query.trim().length === 0) {
    return [...cards]
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .slice(0, limit);
  }
  const scored = scoreKnowledgeCards({
    cards,
    query: buildKnowledgeQuery(input.query),
    queryVector: null,
    mode: "fts",
    kinds: ["mistake", "fix", "decision", "lesson"],
  });
  return selectDiverseKnowledgeCards(scored, MIN_SEARCH_SCORE)
    .slice(0, limit)
    .map((entry) => entry.card);
};

/** Distinct project keys that have cards, newest activity first. */
export const listKnowledgeProjectKeys = (db: KnowledgeDatabase): string[] =>
  (
    db
      .prepare(
        "SELECT project_key FROM episodes GROUP BY project_key ORDER BY MAX(updated_at) DESC",
      )
      .all() as unknown as { project_key: string }[]
  ).map((row) => row.project_key);
