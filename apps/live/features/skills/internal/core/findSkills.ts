import { listSkillRows, readSkillIndexStamp } from "./skillIndexDb";
import type { SkillEmbedder, SkillHit, SkillIndexDb } from "./skillIndex.types";
import {
  buildSkillCorpus,
  searchSkillCorpus,
  type SkillCorpus,
} from "./searchCorpus";
import {
  isSkillRerankEnabled,
  rerankSkillHits,
  type SkillRerankCompleter,
} from "./skillRerank";

export const FIND_SKILLS_DEFAULT_K = 5;
export const FIND_SKILLS_MAX_K = 20;

const corpusCache = new Map<
  string,
  { readonly stamp: string; readonly corpus: SkillCorpus }
>();

const loadCorpus = (db: SkillIndexDb, projectId: string): SkillCorpus => {
  const stamp = readSkillIndexStamp(db, projectId);
  const cached = corpusCache.get(projectId);
  if (cached?.stamp === stamp) {
    return cached.corpus;
  }
  const corpus = buildSkillCorpus(listSkillRows(db, projectId));
  corpusCache.set(projectId, { stamp, corpus });
  return corpus;
};

export const clearSkillCorpusCacheForTests = (): void => corpusCache.clear();

export type FindSkillsInput = {
  readonly db: SkillIndexDb;
  readonly projectId: string;
  readonly query: string;
  readonly k?: number;
  readonly embed?: SkillEmbedder;
  /** Re-rank the top 8 with a local model; only when AGENT_WITCH_SKILLS_RERANK=1. */
  readonly rerank?: SkillRerankCompleter;
};

/**
 * Hybrid search over the project's indexed skills. Embeddings are optional
 * (keyword-only when absent or Ollama is down). Returns names only, no bodies.
 */
export const findSkills = async (
  input: FindSkillsInput,
): Promise<readonly SkillHit[]> => {
  const query = input.query.trim();
  const k = Math.min(
    Math.max(Math.floor(input.k ?? FIND_SKILLS_DEFAULT_K), 1),
    FIND_SKILLS_MAX_K,
  );
  if (query.length === 0) {
    return [];
  }
  const corpus = loadCorpus(input.db, input.projectId);
  if (corpus.skills.length === 0) {
    return [];
  }
  let queryVector: Float32Array | null = null;
  try {
    queryVector = input.embed === undefined ? null : await input.embed(query);
  } catch {
    queryVector = null;
  }
  const hits = searchSkillCorpus(corpus, { query, queryVector, k });
  const ranked =
    input.rerank !== undefined && isSkillRerankEnabled()
      ? await rerankSkillHits(query, hits, input.rerank)
      : hits;
  return ranked.slice(0, k);
};
