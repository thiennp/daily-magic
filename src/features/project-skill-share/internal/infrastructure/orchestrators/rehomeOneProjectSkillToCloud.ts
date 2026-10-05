import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import { decideProjectSkillRehomeAction } from "@/features/project-skill-share/internal/core/decideProjectSkillRehomeAction";
import { measureProjectSkillBodyBytes } from "@/features/project-skill-share/internal/core/measureProjectSkillBodyBytes";
import type { ProjectSkillRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";
import type { ProjectSkillRehomeRow } from "@/features/project-skill-share/internal/core/projectSkillResults.type";
import { selectProjectSkillVersionRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionRow";
import { upsertProjectSkillVersionBody } from "@/features/project-skill-share/internal/infrastructure/db/upsertProjectSkillVersionBody";
import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";
import { readProjectSkillVersion } from "@/features/project-skill-share/internal/infrastructure/history/readProjectSkillVersion";

/** Verify one published skill in AWC; restore exact bytes from the AWL mirror if needed. */
export const rehomeOneProjectSkillToCloud = async (input: {
  readonly port: ProjectSkillHistoryPort;
  readonly record: ProjectSkillRecord & {
    readonly publishedVersion: number;
    readonly contentHash: string;
  };
  readonly actorUserId: string;
}): Promise<ProjectSkillRehomeRow> => {
  const { record } = input;
  const ref = { skillRowId: record.rowId, version: record.publishedVersion };
  const row = { skillId: record.skillId, version: record.publishedVersion };
  const awc = await selectProjectSkillVersionRow(ref);
  const local = await readProjectSkillVersion({
    port: input.port,
    projectId: record.projectId,
    skillId: record.skillId,
    version: record.publishedVersion,
  });
  const action = decideProjectSkillRehomeAction({
    expectedHash: record.contentHash,
    awcBody: awc?.body ?? null,
    local,
  });
  if (action !== "upload_from_local") {
    return { ...row, action };
  }
  if (local === null) {
    return { ...row, action: "missing" };
  }
  await upsertProjectSkillVersionBody({
    ...ref,
    body: local.body,
    contentHash: record.contentHash,
    byteSize: measureProjectSkillBodyBytes(local.body),
    actorUserId: input.actorUserId,
  });
  const verify = await selectProjectSkillVersionRow(ref);
  const ok =
    verify !== null &&
    computeProjectSkillContentHash(verify.body) === record.contentHash;
  return { ...row, action: ok ? "uploaded" : "upload_failed" };
};
