import { createHash } from "node:crypto";

import type { AutoSkillRunRecord } from "./autoSkill.types";
import { normalizeAutoSkillPrompt } from "./autoSkillPromptSimilarity";
import { scrubProjectHistorySkillgenSecrets } from "./scrubProjectHistorySkillgenSecrets";

/**
 * Privacy: when the owner's "Save message history on my computer" is OFF,
 * skillauto/state.json keeps only a hash and a short scrubbed preview of each
 * prompt (enough for Jaccard / judge similarity) and no result text. Drafts
 * for that case are generated from the live run held in memory.
 */
export const AUTO_SKILL_PREVIEW_CAP = 200;

export const hashAutoSkillPrompt = (prompt: string): string =>
  createHash("sha256")
    .update(normalizeAutoSkillPrompt(prompt) || prompt)
    .digest("hex")
    .slice(0, 24);

export const redactAutoSkillRun = (
  run: AutoSkillRunRecord,
): AutoSkillRunRecord =>
  run.redacted === true
    ? run
    : {
        ...run,
        prompt: scrubProjectHistorySkillgenSecrets(
          run.prompt.slice(0, AUTO_SKILL_PREVIEW_CAP),
        ).scrubbed,
        resultSummary: "",
        promptHash: run.promptHash ?? hashAutoSkillPrompt(run.prompt),
        redacted: true,
      };
