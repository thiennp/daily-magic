import type { ProjectSkillFailure } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { promoteProjectSkillDraftVersion } from "@/features/project-skill-share/internal/infrastructure/db/promoteProjectSkillDraftVersion";
import { selectProjectSkillVersionRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionRow";
import type { PublishProjectSkillTarget } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolvePublishProjectSkillTarget";
import type { StoredProjectSkillVersion } from "@/features/project-skill-share/internal/infrastructure/orchestrators/storeProjectSkillVersion";

/** Publish without body = promote the latest draft version (draft → published). */
export const promoteLatestProjectSkillDraft = async (input: {
  readonly target: PublishProjectSkillTarget;
}): Promise<StoredProjectSkillVersion | ProjectSkillFailure> => {
  const existing = input.target.existing;
  if (existing === null || input.target.args.asDraft === true) {
    return { ok: false, code: "body_required" };
  }
  const latest = await selectProjectSkillVersionRow({
    skillRowId: existing.rowId,
    version: existing.latestVersion,
  });
  if (latest === null || !latest.isDraft) {
    return { ok: false, code: "no_draft" };
  }
  const record = await promoteProjectSkillDraftVersion({
    skillRowId: existing.rowId,
    version: latest.version,
  });
  if (record === null) {
    return { ok: false, code: "version_conflict" };
  }
  return {
    ok: true,
    record,
    version: latest.version,
    body: latest.body,
    contentHash: latest.contentHash,
  };
};
