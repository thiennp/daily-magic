import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { FEATURE_KNOWLEDGE_DOC_FILENAMES } from "@/lib/featureKnowledge/featureKnowledgePaths.constant";
import registryData from "@/features/_registry/features.registry.json";
import type { FeatureRegistryEntry } from "@/features/_registry/featureRegistry.types";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

const SLUG_TO_FOLDER: Readonly<Record<string, string>> = {
  agent: "agent",
  "mac-devices": "macDevices",
  "agent-witch": "agent-witch",
  marketplace: "marketplace",
};

const resolveFeatureDir = (entry: FeatureRegistryEntry): string => {
  const folder =
    SLUG_TO_FOLDER[entry.slug] ??
    entry.featurePath.replace(/^src\/features\//, "");
  return join(repoRoot, "src/features", folder);
};

const scaffoldFile = (
  featureDir: string,
  filename: string,
  content: string,
): boolean => {
  const target = join(featureDir, filename);
  if (existsSync(target)) {
    return false;
  }

  mkdirSync(featureDir, { recursive: true });
  writeFileSync(target, content, "utf8");
  return true;
};

const buildReadme = (entry: FeatureRegistryEntry): string =>
  `# ${entry.title}\n\n${entry.purpose}\n\n` +
  `## Registry\n\n- **Slug:** \`${entry.slug}\`\n` +
  `- **Feature path:** \`${entry.featurePath}\`\n` +
  (entry.libPath ? `- **Lib path:** \`${entry.libPath}\`\n` : "") +
  `- **Migration:** ${entry.migrationStatus}\n\n` +
  `## Routes\n\n${entry.routePaths.length > 0 ? entry.routePaths.map((route) => `- \`${route}\``).join("\n") : "_None wired in this feature folder._"}\n\n` +
  `## APIs\n\n${entry.apiPaths.length > 0 ? entry.apiPaths.map((route) => `- \`${route}\``).join("\n") : "_None._"}\n\n` +
  `## Dependencies\n\n${entry.dependsOn.map((slug) => `- \`${slug}\``).join("\n") || "_None._"}\n\n` +
  `Query: \`npm run feature-knowledge:query -- "..." --feature=${entry.slug}\`\n`;

const buildAgents = (entry: FeatureRegistryEntry): string =>
  `# ${entry.title} — agent instructions\n\n` +
  `1. Query feature knowledge: \`npm run feature-knowledge:query -- "symptom" --feature=${entry.slug}\`\n` +
  `2. Read \`KNOWN_ISSUES.md\` before changing behavior.\n` +
  `3. Add a regression test for every bug fix; document it in \`KNOWN_ISSUES.md\`.\n` +
  `4. Re-index: \`npm run feature-knowledge:index\`.\n`;

const buildKnownIssues = (entry: FeatureRegistryEntry): string =>
  `# ${entry.title} — known issues\n\n` +
  `_No documented issues yet. Use IDs like \`${entry.slug.toUpperCase().replace(/-/g, "_")}-001\`._\n`;

const entries = registryData.features as FeatureRegistryEntry[];
const writtenPaths = new Set<string>();
let created = 0;

for (const entry of entries) {
  const featureDir = resolveFeatureDir(entry);
  if (writtenPaths.has(featureDir)) {
    continue;
  }
  writtenPaths.add(featureDir);

  for (const filename of FEATURE_KNOWLEDGE_DOC_FILENAMES) {
    const content =
      filename === "README.md"
        ? buildReadme(entry)
        : filename === "AGENTS.md"
          ? buildAgents(entry)
          : buildKnownIssues(entry);

    if (scaffoldFile(featureDir, filename, content)) {
      created += 1;
      console.log(
        `created ${path.relative(repoRoot, join(featureDir, filename))}`,
      );
    }
  }
}

console.log(`Scaffold complete (${created} files created).`);
