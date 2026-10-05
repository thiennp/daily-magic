import type { ProjectSkillPullAction } from "@/features/project-skill-share/internal/core/projectSkillPull.type";

/**
 * Skip when local meta contentHash already matches AWC; otherwise fetch+write.
 * Hash compare only — never trust a local body without matching meta hash.
 */
export const decideProjectSkillPullAction = (input: {
  readonly expectedHash: string;
  readonly localContentHash: string | null;
}): ProjectSkillPullAction =>
  input.localContentHash === input.expectedHash ? "skip" : "fetch_write";
