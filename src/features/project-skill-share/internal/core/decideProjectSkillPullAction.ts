import type { ProjectSkillPullAction } from "@/features/project-skill-share/internal/core/projectSkillPull.type";

export type DecideProjectSkillPullActionInput =
  | {
      readonly onPublishedSet: true;
      readonly expectedHash: string;
      readonly localContentHash: string | null;
    }
  | {
      /** Local mirror exists but skill is not on the AWC published set (revoked/gone). */
      readonly onPublishedSet: false;
    };

/**
 * Pure pull decide:
 * - remove when local-only (not on AWC published set)
 * - skip when local meta contentHash already matches AWC
 * - fetch_write otherwise (missing or hash differs)
 */
export const decideProjectSkillPullAction = (
  input: DecideProjectSkillPullActionInput,
): ProjectSkillPullAction => {
  if (!input.onPublishedSet) {
    return "remove";
  }
  return input.localContentHash === input.expectedHash ? "skip" : "fetch_write";
};
