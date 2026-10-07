import type {
  ProjectSkillActorRole,
  ProjectSkillRecord,
  ProjectSkillView,
} from "@/features/project-skill-share/internal/core/projectSkill.type";
import { decideProjectSkillRevokeAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillRevokeAccess";

/** Meta-only view for one actor (never the body). */
export const toProjectSkillView = (input: {
  readonly record: ProjectSkillRecord;
  readonly role: ProjectSkillActorRole;
  readonly actorUserId: string;
}): ProjectSkillView => ({
  skillId: input.record.skillId,
  kind: input.record.kind,
  name: input.record.name,
  description: input.record.description,
  state: input.record.state,
  publishedVersion: input.record.publishedVersion,
  latestVersion: input.record.latestVersion,
  contentHash: input.record.contentHash,
  updatedAt: input.record.updatedAt,
  isPublisher: input.record.publisherUserId === input.actorUserId,
  canRevoke:
    input.record.state !== "revoked" &&
    decideProjectSkillRevokeAccess({
      role: input.role,
      actorUserId: input.actorUserId,
      publisherUserId: input.record.publisherUserId,
    }),
});
