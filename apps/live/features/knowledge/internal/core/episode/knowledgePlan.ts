import type { EpisodeKind, KnowledgeTaskClass } from "./episode.types";

export type KnowledgeMode = "skip" | "fts" | "hybrid";

export type KnowledgePlan = {
  readonly mode: KnowledgeMode;
  readonly tokenBudget: number;
  readonly maxCards: number;
  readonly minScore: number;
  readonly kinds: readonly EpisodeKind[];
  readonly embedTimeoutMs: number;
};

const ALL_KINDS: readonly EpisodeKind[] = [
  "mistake",
  "fix",
  "decision",
  "lesson",
];

const SKIP_PLAN: KnowledgePlan = {
  mode: "skip",
  tokenBudget: 0,
  maxCards: 0,
  minScore: 1,
  kinds: [],
  embedTimeoutMs: 0,
};

export const KNOWLEDGE_EMBED_TIMEOUT_MS = 400;

export const resolveKnowledgePlan = (input: {
  readonly contextBudget: "minimal" | "standard" | "full";
  readonly continuationStrategy:
    "cli_continue" | "source_run_seed" | "transcript_seed" | "none";
  readonly taskClass: KnowledgeTaskClass;
}): KnowledgePlan => {
  if (
    input.continuationStrategy === "cli_continue" ||
    input.contextBudget === "minimal"
  ) {
    return SKIP_PLAN;
  }

  if (input.taskClass === "chat") {
    return {
      mode: "fts",
      tokenBudget: 150,
      maxCards: 2,
      minScore: 0.3,
      kinds: ALL_KINDS,
      embedTimeoutMs: 0,
    };
  }

  const isLarge =
    input.contextBudget === "full" ||
    input.continuationStrategy === "source_run_seed" ||
    input.continuationStrategy === "transcript_seed";

  return {
    mode: "hybrid",
    tokenBudget: isLarge ? 800 : 300,
    maxCards: isLarge ? 6 : 3,
    minScore: 0.3,
    kinds: ALL_KINDS,
    embedTimeoutMs: KNOWLEDGE_EMBED_TIMEOUT_MS,
  };
};
