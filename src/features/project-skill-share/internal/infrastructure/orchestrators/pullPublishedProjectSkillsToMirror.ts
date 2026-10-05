import type { ProjectSkillPullRow } from "@/features/project-skill-share/internal/core/projectSkillPull.type";
import type { PullPublishedProjectSkillsToMirrorResult } from "@/features/project-skill-share/internal/core/projectSkillResults.type";
import { createDbProjectSkillAwcPublishedSource } from "@/features/project-skill-share/internal/infrastructure/awc/createDbProjectSkillAwcPublishedSource";
import { isProjectHistoryEnabled } from "@/features/project-skill-share/internal/infrastructure/history/isProjectHistoryEnabled";
import { PROJECT_SKILL_HISTORY_STUB_PORT } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryStubPort.constant";
import type { ProjectSkillShareDeps } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareDeps.type";
import { pullOnePublishedProjectSkillToMirror } from "@/features/project-skill-share/internal/infrastructure/orchestrators/pullOnePublishedProjectSkillToMirror";

const LOG_PREFIX = "[project-skill-pull-mirror]";

/**
 * Share-owned pull-on-AWL-tick: list published from AWC, compare local meta,
 * fetch missing/changed, write only via History helpers. Failures log + surface
 * for next-tick retry; never throws into ack/delete paths.
 */
export const pullPublishedProjectSkillsToMirror = async (input: {
  readonly projectId: string;
  readonly deps?: ProjectSkillShareDeps;
}): Promise<PullPublishedProjectSkillsToMirrorResult> => {
  const port = input.deps?.history ?? PROJECT_SKILL_HISTORY_STUB_PORT;
  const awc =
    input.deps?.awcPublished ?? createDbProjectSkillAwcPublishedSource();
  try {
    const enabled = await isProjectHistoryEnabled({
      port,
      projectId: input.projectId,
    });
    if (!enabled) {
      return { ok: true, skipped: true, skills: [] };
    }
    const published = await awc.listPublished(input.projectId);
    const skills: ProjectSkillPullRow[] = [];
    for (const meta of published) {
      try {
        skills.push(
          await pullOnePublishedProjectSkillToMirror({
            projectId: input.projectId,
            meta,
            port,
            awc,
          }),
        );
      } catch (error) {
        console.warn(LOG_PREFIX, "skill_failed", meta.skillId, error);
        skills.push({
          skillId: meta.skillId,
          version: meta.publishedVersion,
          action: "unavailable",
        });
      }
    }
    const failed = skills.some(
      (row) =>
        row.action === "unavailable" ||
        row.action === "hash_mismatch" ||
        row.action === "missing_awc",
    );
    if (failed) {
      console.warn(LOG_PREFIX, "partial_failure", input.projectId, skills);
    }
    return { ok: !failed, skipped: false, skills };
  } catch (error) {
    console.warn(LOG_PREFIX, "tick_failed", input.projectId, error);
    return { ok: false, skipped: false, skills: [] };
  }
};
