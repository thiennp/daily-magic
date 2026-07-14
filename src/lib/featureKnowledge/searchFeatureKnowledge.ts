import { readFileSync } from "node:fs";
import { join } from "node:path";

import { buildTfIdfVector } from "@/lib/featureKnowledge/chunkMarkdownByHeading";
import { FEATURE_KNOWLEDGE_INDEX_PATH } from "@/lib/featureKnowledge/featureKnowledgePaths.constant";
import type {
  FeatureKnowledgeIndex,
  FeatureKnowledgeQueryResult,
  FeatureKnowledgeSearchHit,
} from "@/lib/featureKnowledge/featureKnowledge.types";
import { cosineSimilarity } from "@/lib/featureKnowledge/tokenizeFeatureText";

export const loadFeatureKnowledgeIndex = (
  repoRoot: string,
): FeatureKnowledgeIndex | null => {
  try {
    const raw = readFileSync(
      join(repoRoot, FEATURE_KNOWLEDGE_INDEX_PATH),
      "utf8",
    );
    return JSON.parse(raw) as FeatureKnowledgeIndex;
  } catch {
    return null;
  }
};

const formatContext = (hits: readonly FeatureKnowledgeSearchHit[]): string => {
  if (hits.length === 0) {
    return "No matching feature knowledge found. Run `npm run feature-knowledge:index`.";
  }

  return hits
    .map(
      (hit, index) =>
        `### ${index + 1}. ${hit.chunk.featureSlug} — ${hit.chunk.section}\n` +
        `Source: ${hit.chunk.sourcePath}\n` +
        `Score: ${hit.score.toFixed(3)}\n\n` +
        hit.chunk.text,
    )
    .join("\n\n---\n\n");
};

export const searchFeatureKnowledge = (
  index: FeatureKnowledgeIndex,
  query: string,
  options?: { readonly featureSlug?: string; readonly limit?: number },
): FeatureKnowledgeQueryResult => {
  const limit = options?.limit ?? 5;
  const queryVector = buildTfIdfVector(query, index.idf);

  const hits = index.chunks
    .filter(
      (chunk) =>
        !options?.featureSlug || chunk.featureSlug === options.featureSlug,
    )
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(queryVector, chunk.vector),
    }))
    .filter((hit) => hit.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);

  return {
    query,
    hits,
    context: formatContext(hits),
  };
};
