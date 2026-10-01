import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export type ProjectAclAccess =
  | {
      readonly ok: true;
      readonly project: UserProjectRecord;
      readonly isOwner: boolean;
      readonly membership: ProjectMembershipRecord | null;
      readonly scopes: readonly ProjectAclScope[];
    }
  | { readonly ok: false; readonly reason: "not_found" | "forbidden" };

export const resolveProjectAclAccess = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly requiredScopes?: readonly ProjectAclScope[];
}): Promise<ProjectAclAccess> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, reason: "not_found" };
  }

  const isOwner = project.ownerUserId === input.actorUserId;
  if (isOwner) {
    return {
      ok: true,
      project,
      isOwner: true,
      membership: null,
      scopes: ["acl:self", "project:meta", "peer_sync", "folder_ref:propose"],
    };
  }

  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (membership === null) {
    return { ok: false, reason: "forbidden" };
  }

  const required = input.requiredScopes ?? [];
  const missing = required.filter(
    (scope) => !membership.scopes.includes(scope),
  );
  if (missing.length > 0) {
    return { ok: false, reason: "forbidden" };
  }

  return {
    ok: true,
    project,
    isOwner: false,
    membership,
    scopes: membership.scopes,
  };
};
