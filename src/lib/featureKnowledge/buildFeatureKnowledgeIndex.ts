import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import {
  chunkMarkdownByHeading,
  computeIdf,
  buildTfIdfVector,
  type RawFeatureKnowledgeChunk,
} from "@/lib/featureKnowledge/chunkMarkdownByHeading";
import {
  FEATURE_KNOWLEDGE_DOC_FILENAMES,
  FEATURE_KNOWLEDGE_FEATURES_ROOT,
} from "@/lib/featureKnowledge/featureKnowledgePaths.constant";
import type { FeatureKnowledgeIndex } from "@/lib/featureKnowledge/featureKnowledge.types";

const listFeatureSlugs = (repoRoot: string): readonly string[] => {
  const featuresDir = join(repoRoot, FEATURE_KNOWLEDGE_FEATURES_ROOT);
  return readdirSync(featuresDir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith("_") &&
        !entry.name.startsWith("."),
    )
    .map((entry) => entry.name);
};

const readFeatureDocs = (
  repoRoot: string,
  featureSlug: string,
): readonly RawFeatureKnowledgeChunk[] => {
  const featureDir = join(
    repoRoot,
    FEATURE_KNOWLEDGE_FEATURES_ROOT,
    featureSlug,
  );
  const chunks: RawFeatureKnowledgeChunk[] = [];

  for (const filename of FEATURE_KNOWLEDGE_DOC_FILENAMES) {
    const absolutePath = join(featureDir, filename);
    try {
      if (!statSync(absolutePath).isFile()) {
        continue;
      }
    } catch {
      continue;
    }

    const content = readFileSync(absolutePath, "utf8");
    const relativePath = relative(repoRoot, absolutePath);
    const sections = chunkMarkdownByHeading(content);

    sections.forEach((section, index) => {
      chunks.push({
        id: `${featureSlug}:${filename}:${index}`,
        featureSlug,
        sourcePath: relativePath,
        section: section.section,
        text: section.text,
      });
    });
  }

  return chunks;
};

export const buildFeatureKnowledgeIndex = (
  repoRoot: string,
): FeatureKnowledgeIndex => {
  const featureSlugs = listFeatureSlugs(repoRoot);
  const rawChunks = featureSlugs.flatMap((slug) =>
    readFeatureDocs(repoRoot, slug),
  );
  const idf = computeIdf(rawChunks);

  const chunks = rawChunks.map((chunk) => ({
    ...chunk,
    vector: buildTfIdfVector(chunk.text, idf),
  }));

  return {
    version: 1,
    builtAt: new Date().toISOString(),
    idf,
    chunks,
  };
};
