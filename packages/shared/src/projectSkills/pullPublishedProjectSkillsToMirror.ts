import { isProjectHistoryEnabled } from "./isProjectHistoryEnabled";
import { listProjectSkillIds } from "./listProjectSkillIds";
import { listPublishedProjectSkillsForPull } from "./listPublishedProjectSkillsForPull";
import type { ProjectSkillAwcPublishedSource } from "./projectSkillAwcPublishedSource.type";
import type { ProjectSkillHistoryPort } from "./projectSkillHistoryPort.type";
import type {
  ProjectSkillPullRow,
  PullPublishedProjectSkillsToMirrorResult,
} from "./projectSkillPull.type";
import { pullOnePublishedProjectSkillToMirror } from "./pullOnePublishedProjectSkillToMirror";
import { tombstoneOrphanMirroredProjectSkill } from "./tombstoneOrphanMirroredProjectSkill";

export type PullPublishedProjectSkillsToMirror = (input: {
  readonly projectId: string;
  readonly deps: {
    readonly history: ProjectSkillHistoryPort;
    readonly awcPublished: ProjectSkillAwcPublishedSource;
  };
}) => Promise<PullPublishedProjectSkillsToMirrorResult>;

const LOG_PREFIX = "[project-skill-pull-mirror]";

/**
 * Port-injected pull-on-tick: listPublished first; on list fail → early
 * return with zero History disk helpers. Else decide skip|fetch_write|remove;
 * write/tombstone only via History. Failures log + retry next tick.
 *
 * Callers MUST supply both ports (no Neon/stub defaults here).
 */
export const pullPublishedProjectSkillsToMirror = async (input: {
  readonly projectId: string;
  readonly deps: {
    readonly history: ProjectSkillHistoryPort;
    readonly awcPublished: ProjectSkillAwcPublishedSource;
  };
}): Promise<PullPublishedProjectSkillsToMirrorResult> => {
  const port = input.deps.history;
  const awc = input.deps.awcPublished;
  try {
    const enabled = await isProjectHistoryEnabled({
      port,
      projectId: input.projectId,
    });
    if (!enabled) {
      return { ok: true, skipped: true, skills: [] };
    }
    const listed = await listPublishedProjectSkillsForPull({
      awc,
      projectId: input.projectId,
    });
    if (!listed.ok) {
      console.warn(LOG_PREFIX, "list_failed", input.projectId);
      return { ok: false, skipped: false, skills: [] };
    }
    const publishedIds = new Set(listed.published.map((meta) => meta.skillId));
    const skills: ProjectSkillPullRow[] = [];
    for (const meta of listed.published) {
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
    const locals = await listProjectSkillIds({
      port,
      projectId: input.projectId,
    });
    for (const local of locals) {
      if (publishedIds.has(local.skillId)) {
        continue;
      }
      try {
        skills.push(
          await tombstoneOrphanMirroredProjectSkill({
            projectId: input.projectId,
            skillId: local.skillId,
            lastContentHash: local.contentHash,
            port,
          }),
        );
      } catch (error) {
        console.warn(LOG_PREFIX, "orphan_tombstone_failed", local.skillId, error);
        skills.push({ skillId: local.skillId, version: 0, action: "unavailable" });
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
