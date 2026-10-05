import { pullPublishedProjectSkillsToMirror as pullPublishedProjectSkillsToMirrorShared } from "@agent-witch/shared/projectSkills";
import type { PullPublishedProjectSkillsToMirrorResult } from "@/features/project-skill-share/internal/core/projectSkillResults.type";
import { createDbProjectSkillAwcPublishedSource } from "@/features/project-skill-share/internal/infrastructure/awc/createDbProjectSkillAwcPublishedSource";
import { PROJECT_SKILL_HISTORY_STUB_PORT } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryStubPort.constant";
import type { ProjectSkillShareDeps } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareDeps.type";

/**
 * Share-owned pull entry: injects AWC Neon + History stub defaults, then
 * delegates to the shared port-injected algorithm.
 */
export const pullPublishedProjectSkillsToMirror = async (input: {
  readonly projectId: string;
  readonly deps?: ProjectSkillShareDeps;
}): Promise<PullPublishedProjectSkillsToMirrorResult> =>
  pullPublishedProjectSkillsToMirrorShared({
    projectId: input.projectId,
    deps: {
      history: input.deps?.history ?? PROJECT_SKILL_HISTORY_STUB_PORT,
      awcPublished:
        input.deps?.awcPublished ?? createDbProjectSkillAwcPublishedSource(),
    },
  });
