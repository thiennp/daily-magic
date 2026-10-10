import type {
  ProjectSkillActorRole,
  ProjectSkillRecord,
  ProjectSkillView,
} from "@/features/project-skill-share/internal/core/projectSkill.type";
import { decideProjectSkillRevokeAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillRevokeAccess";
import type { ProjectSkillMemberRights } from "@/features/project-skill-share/internal/core/projectSkillMemberRights.type";

/** Meta-only view for one actor (never the body). */
export const toProjectSkillView = (input: {
  readonly record: ProjectSkillRecord;
  readonly role: ProjectSkillActorRole;
  readonly actorUserId: string;
  readonly rights: ProjectSkillMemberRights;
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
  canPublish:
    input.role === "owner" ||
    (input.role === "member" &&
      (input.rights.publish ||
        input.record.publisherUserId === input.actorUserId)),
  latestAuthorName: input.record.latestAuthorName ?? null,
  canRevoke:
    input.record.state !== "revoked" &&
    decideProjectSkillRevokeAccess({
      role: input.role,
      memberMayDelete: input.rights.delete,
    }),
});
