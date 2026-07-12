import { getHarnessManifestPath, getHarnessRootDir } from "./getHarnessPaths";
import resolveHarnessSharedItemPath from "./resolveHarnessSharedItemPath";
import type HarnessItemWriteSpec from "./types/HarnessItemWriteSpec.type";

const buildHarnessItemListing = (
  items: readonly HarnessItemWriteSpec[],
): string =>
  items
    .map((item) => {
      const sharedPath = resolveHarnessSharedItemPath(
        item.id,
        item.kind,
        item.title,
      );

      return [
        `### Item ${item.id} (${item.kind})`,
        `- Title: ${item.title}`,
        `- Shared path (relative to harness root): ${sharedPath}`,
        `- Include in sets: ${item.setSlugs.join(", ")}`,
        "",
        "```",
        item.content,
        "```",
      ].join("\n");
    })
    .join("\n\n");

const buildHarnessWriteItemsPrompt = (
  items: readonly HarnessItemWriteSpec[],
): string => {
  const harnessRoot = getHarnessRootDir();
  const manifestPath = getHarnessManifestPath();
  const itemListing = buildHarnessItemListing(items);

  return [
    "You are writing Agent Witch harness items on the local machine.",
    "Do not modify project repositories or replace existing personal agent root harness files.",
    "",
    "Shared item storage:",
    `- Harness root: ${harnessRoot}`,
    "- Write each item once under shared/items/{itemId}/... inside the harness root",
    "- The same item id and shared path may appear in multiple harness sets",
    "",
    "Required filesystem work:",
    "1. Write each item file to its shared path under the harness root.",
    "2. Update the local manifest at:",
    `   ${manifestPath}`,
    "",
    "Manifest rules:",
    "- version must be 1",
    "- hostname must be the current machine hostname",
    "- updatedAt must be an ISO-8601 timestamp",
    "- For each item, add one manifest entry per target set slug listed below",
    "- Each set items[] entry must include id, kind, title, and the shared path",
    "- Multiple sets may reference the same item id and shared path",
    "- Preserve existing sets and items in the manifest when updating",
    "- Ensure each target set slug exists in sets[] before attaching items",
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

export default buildHarnessWriteItemsPrompt;
