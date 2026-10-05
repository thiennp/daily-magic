import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import { decideProjectSkillPullAction } from "@/features/project-skill-share/internal/core/decideProjectSkillPullAction";
import type {
  ProjectSkillPublishedMeta,
  ProjectSkillPullRow,
} from "@/features/project-skill-share/internal/core/projectSkillPull.type";
import type { ProjectSkillAwcPublishedSource } from "@/features/project-skill-share/internal/infrastructure/awc/projectSkillAwcPublishedSource.type";
import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";
import { readProjectSkillVersion } from "@/features/project-skill-share/internal/infrastructure/history/readProjectSkillVersion";
import { writeProjectSkillVersion } from "@/features/project-skill-share/internal/infrastructure/history/writeProjectSkillVersion";

/** Compare local meta to AWC; fetch body and write via History helpers only. */
export const pullOnePublishedProjectSkillToMirror = async (input: {
  readonly projectId: string;
  readonly meta: ProjectSkillPublishedMeta;
  readonly port: ProjectSkillHistoryPort;
  readonly awc: ProjectSkillAwcPublishedSource;
}): Promise<ProjectSkillPullRow> => {
  const { meta, projectId } = input;
  const row = {
    skillId: meta.skillId,
    version: meta.publishedVersion,
  };
  const local = await readProjectSkillVersion({
    port: input.port,
    projectId,
    skillId: meta.skillId,
    version: meta.publishedVersion,
  });
  const action = decideProjectSkillPullAction({
    expectedHash: meta.contentHash,
    localContentHash: local?.contentHash ?? null,
  });
  if (action === "skip") {
    return { ...row, action: "skipped" };
  }
  const published = await input.awc.getPublishedBody({
    projectId,
    skillId: meta.skillId,
    version: meta.publishedVersion,
    skillRowId: meta.skillRowId,
  });
  if (published === null) {
    return { ...row, action: "missing_awc" };
  }
  if (
    published.contentHash !== meta.contentHash ||
    computeProjectSkillContentHash(published.body) !== meta.contentHash
  ) {
    return { ...row, action: "hash_mismatch" };
  }
  const written = await writeProjectSkillVersion({
    port: input.port,
    projectId,
    skillId: meta.skillId,
    version: meta.publishedVersion,
    body: published.body,
  });
  if (!written.ok) {
    return {
      ...row,
      action:
        written.code === "hash_mismatch" ? "hash_mismatch" : "unavailable",
    };
  }
  return written.contentHash === meta.contentHash
    ? { ...row, action: "mirrored" }
    : { ...row, action: "hash_mismatch" };
};
