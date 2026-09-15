import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import {
  chunkMarkdownByHeading,
  type RawFeatureKnowledgeChunk,
} from "@/lib/featureKnowledge/chunkMarkdownByHeading";
import {
  FEATURE_KNOWLEDGE_DOCS_ROOT,
  FEATURE_KNOWLEDGE_DOCS_SLUG,
} from "@/lib/featureKnowledge/featureKnowledgePaths.constant";

const collectMarkdownFiles = (
  absoluteDir: string,
  prefix: string,
  files: string[],
): void => {
  const entries = readdirSync(absoluteDir, { withFileTypes: true });

  for (const entry of entries) {
    const rel = prefix.length > 0 ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      collectMarkdownFiles(join(absoluteDir, entry.name), rel, files);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(rel);
    }
  }
};

const listDocMarkdownFiles = (
  repoRoot: string,
  relativeDir: string,
): readonly string[] => {
  const absoluteDir = join(repoRoot, relativeDir);
  const files: string[] = [];

  try {
    collectMarkdownFiles(absoluteDir, "", files);
  } catch {
    return files;
  }

  return files;
};

export const readDocsKnowledge = (
  repoRoot: string,
): readonly RawFeatureKnowledgeChunk[] => {
  const docFiles = listDocMarkdownFiles(repoRoot, FEATURE_KNOWLEDGE_DOCS_ROOT);
  const chunks: RawFeatureKnowledgeChunk[] = [];

  for (const relativeFile of docFiles) {
    const absolutePath = join(
      repoRoot,
      FEATURE_KNOWLEDGE_DOCS_ROOT,
      relativeFile,
    );
    const content = readFileSync(absolutePath, "utf8");
    const sourcePath = join(FEATURE_KNOWLEDGE_DOCS_ROOT, relativeFile);
    const sections = chunkMarkdownByHeading(content);

    sections.forEach((section, index) => {
      chunks.push({
        id: `${FEATURE_KNOWLEDGE_DOCS_SLUG}:${relativeFile}:${index}`,
        featureSlug: FEATURE_KNOWLEDGE_DOCS_SLUG,
        sourcePath,
        section: section.section,
        text: section.text,
      });
    });
  }

  return chunks;
};
