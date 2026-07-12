import { getHarnessManifestPath, getHarnessSetDir } from "./getHarnessPaths";
import type HarnessRequestSpec from "./types/HarnessRequestSpec.type";

const buildHarnessCreateSetPrompt = (
  spec: Pick<HarnessRequestSpec, "name" | "slug">,
): string => {
  const setDir = getHarnessSetDir(spec.slug ?? "");
  const manifestPath = getHarnessManifestPath();

  return [
    "You are creating a new Agent Witch harness set on the local machine.",
    "Do not modify project repositories or replace existing personal agent root harness files.",
    "",
    "Harness set:",
    `- Name: ${spec.name}`,
    `- Slug: ${spec.slug}`,
    `- Set directory: ${setDir}`,
    "",
    "Required filesystem work:",
    `1. Create ${setDir} and subfolders rules/, skills/, commands/, instructions/ as needed.`,
    "2. Update the local manifest at:",
    `   ${manifestPath}`,
    "",
    "Manifest rules:",
    "- version must be 1",
    "- hostname must be the current machine hostname",
    "- updatedAt must be an ISO-8601 timestamp",
    `- activeSetSlugs must include "${spec.slug}"`,
    `- sets["${spec.slug}"] must contain slug, name, version, updatedAt, and items: []`,
    "- Preserve existing sets and shared items in the manifest when updating",
    "- Do not add harness items in this request; only create the empty set entry",
    "",
    "When finished, reply with a short summary and include the final manifest JSON inside:",
    "HARNESS_MANIFEST_JSON_START",
    "{ ... }",
    "HARNESS_MANIFEST_JSON_END",
  ].join("\n");
};

export default buildHarnessCreateSetPrompt;
