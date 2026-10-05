import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import { decideProjectSkillPublishTransition } from "@/features/project-skill-share/internal/core/decideProjectSkillPublishTransition";
import { measureProjectSkillBodyBytes } from "@/features/project-skill-share/internal/core/measureProjectSkillBodyBytes";
import type {
  ProjectSkillFailure,
  ProjectSkillRecord,
} from "@/features/project-skill-share/internal/core/projectSkill.type";
import { validateProjectSkillBody } from "@/features/project-skill-share/internal/core/validateProjectSkillBody";
import { insertProjectSkillVersionWithSkill } from "@/features/project-skill-share/internal/infrastructure/db/insertProjectSkillVersionWithSkill";
import type { PublishProjectSkillTarget } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolvePublishProjectSkillTarget";

export type StoredProjectSkillVersion = {
  readonly ok: true;
  readonly record: ProjectSkillRecord;
  readonly version: number;
  readonly body: string;
  readonly contentHash: string;
};

/** AWC always stores the capped body + meta + contentHash (History ON or OFF). */
export const storeProjectSkillVersion = async (input: {
  readonly target: PublishProjectSkillTarget;
  readonly body: string;
  readonly actorUserId: string;
}): Promise<StoredProjectSkillVersion | ProjectSkillFailure> => {
  const invalid = validateProjectSkillBody(input.body);
  if (invalid !== null) {
    return { ok: false, code: invalid };
  }
  const { target } = input;
  const asDraft = target.args.asDraft === true;
  const expectedLatestVersion = target.existing?.latestVersion ?? 0;
  const version = expectedLatestVersion + 1;
  const contentHash = computeProjectSkillContentHash(input.body);
  const record = await insertProjectSkillVersionWithSkill({
    projectId: target.args.projectId,
    skillId: target.skillId,
    name: target.name,
    description:
      target.args.description ?? target.existing?.description ?? null,
    actorUserId: input.actorUserId,
    expectedLatestVersion,
    version,
    body: input.body,
    contentHash,
    byteSize: measureProjectSkillBodyBytes(input.body),
    asDraft,
    transition: decideProjectSkillPublishTransition({
      existing: target.existing,
      newVersion: version,
      asDraft,
      contentHash,
    }),
  });
  if (record === null) {
    return { ok: false, code: "version_conflict" };
  }
  return { ok: true, record, version, body: input.body, contentHash };
};
