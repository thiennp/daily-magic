import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { buildFeatureKnowledgeIndex } from "@/lib/featureKnowledge/buildFeatureKnowledgeIndex";
import { FEATURE_KNOWLEDGE_INDEX_PATH } from "@/lib/featureKnowledge/featureKnowledgePaths.constant";

export const writeFeatureKnowledgeIndex = (
  repoRoot: string,
): { readonly chunkCount: number; readonly indexPath: string } => {
  const index = buildFeatureKnowledgeIndex(repoRoot);
  const indexPath = join(repoRoot, FEATURE_KNOWLEDGE_INDEX_PATH);
  mkdirSync(dirname(indexPath), { recursive: true });
  writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, "utf8");

  return { chunkCount: index.chunks.length, indexPath };
};
