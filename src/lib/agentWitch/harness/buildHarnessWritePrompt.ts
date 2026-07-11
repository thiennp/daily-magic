import { getHarnessManifestPath, getHarnessSetDir } from "./getHarnessPaths";
import resolveHarnessItemPath from "./resolveHarnessItemPath";
import type HarnessSetSpec from "./types/HarnessSetSpec.type";

const buildHarnessItemListing = (spec: HarnessSetSpec): string =>
  spec.items
    .map((item) => {
      const relativePath = resolveHarnessItemPath(item.kind, item.title);
      return [
        `### Item ${item.id} (${item.kind})`,
        `- Title: ${item.title}`,
        `- Relative path: ${relativePath}`,
        "",
        "```",
        item.content,
        "```",
      ].join("\n");
    })
    .join("\n\n");

const buildHarnessWritePrompt = (spec: HarnessSetSpec): string => {
  const setDir = getHarnessSetDir(spec.slug);
  const manifestPath = getHarnessManifestPath();
  const itemListing = buildHarnessItemListing(spec);

  return [
    "You are writing a supplementary Agent Witch harness set on the local machine.",
    "Do not modify project repositories or replace existing personal agent root harness files.",
    "",
    "Harness set:",
    `- Name: ${spec.name}`,
    `- Slug: ${spec.slug}`,
    `- Set directory: ${setDir}`,
    "",
    "Required filesystem work:",
    `1. Create ${setDir} and subfolders rules/, skills/, commands/, instructions/ as needed.`,
    "2. Write each harness item to the relative path listed below inside the set directory.",
    "3. Update the local manifest at:",
    `   ${manifestPath}`,
    "",
    "Manifest rules:",
    "- version must be 1",
    `- hostname must be the current machine hostname`,
    "- updatedAt must be an ISO-8601 timestamp",
    `- activeSetSlugs must include "${spec.slug}"`,
    `- sets["${spec.slug}"] must contain slug, name, version, updatedAt, and items[]`,
    "- Each items[] entry must include id, kind, title, and the relative path you wrote",
    "- Preserve existing sets in the manifest when updating",
    "",
    "Items to write:",
    itemListing,
    "",
    "When finished, reply with a short summary and include the final manifest JSON inside:",
    "HARNESS_MANIFEST_JSON_START",
    "{ ... }",
    "HARNESS_MANIFEST_JSON_END",
  ].join("\n");
};

export default buildHarnessWritePrompt;
