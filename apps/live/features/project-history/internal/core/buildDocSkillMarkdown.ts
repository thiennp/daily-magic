import { DOC_SKILL_ORIGIN } from "./docIngest.constants";
import type { DocSkillDraft } from "./convertDocToSkillDraft";

/** SKILL.md with the provenance stamp (`source: path@sha`, `origin: folder-doc`). */
export const buildDocSkillMarkdown = (
  draft: DocSkillDraft,
  updatesSkillId?: string,
): string =>
  [
    "---",
    `name: ${draft.name}`,
    `description: ${draft.description}`,
    ...(draft.keywords.length > 0
      ? [`keywords: ${draft.keywords.join(", ")}`]
      : []),
    "version: 0.1.0",
    "status: draft",
    `source: ${draft.relPath}@${draft.sha}`,
    `origin: ${DOC_SKILL_ORIGIN}`,
    ...(updatesSkillId === undefined ? [] : [`updates: ${updatesSkillId}`]),
    "---",
    "",
    draft.body,
    "",
  ].join("\n");
