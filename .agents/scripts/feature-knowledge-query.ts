import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  loadFeatureKnowledgeIndex,
  searchFeatureKnowledge,
} from "@/lib/featureKnowledge/searchFeatureKnowledge";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

const args = process.argv.slice(2);
const featureSlugFlag = args.find((arg) => arg.startsWith("--feature="));
const featureSlug = featureSlugFlag?.slice("--feature=".length);
const query = args
  .filter((arg) => !arg.startsWith("--"))
  .join(" ")
  .trim();

if (!query) {
  console.error(
    'Usage: npm run feature-knowledge:query -- "your question" [--feature=home]',
  );
  process.exit(1);
}

const index = loadFeatureKnowledgeIndex(repoRoot);
if (!index) {
  console.error("Index missing. Run `npm run feature-knowledge:index` first.");
  process.exit(1);
}

const result = searchFeatureKnowledge(index, query, { featureSlug, limit: 5 });
console.log(result.context);
