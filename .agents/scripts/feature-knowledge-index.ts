import path from "node:path";
import { fileURLToPath } from "node:url";

import { writeFeatureKnowledgeIndex } from "@/lib/featureKnowledge/writeFeatureKnowledgeIndex";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

const result = writeFeatureKnowledgeIndex(repoRoot);
console.log(
  `Feature knowledge: indexed ${result.chunkCount} chunks -> ${path.relative(repoRoot, result.indexPath)}`,
);
