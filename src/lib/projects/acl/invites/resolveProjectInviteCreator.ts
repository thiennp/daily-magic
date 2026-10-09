import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import {
  PROJECT_ACL_DEFAULT_MEMBER_SCOPES,
  type ProjectAclScope,
} from "@/lib/projects/acl/projectAclScopes.constant";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export type ProjectInviteCreator =
  | { readonly ok: true; readonly isOwner: true }
  | {
      readonly ok: true;
      readonly isOwner: false;
      /** Most a member may grant: default member scopes ∩ their own. */
      readonly grantableScopes: readonly ProjectAclScope[];
    }
  | { readonly ok: false };

/** Owner, or an active human member (never a viewer), may create assistant invites. */
export const resolveProjectInviteCreator = async (
  project: UserProjectRecord,
  actorUserId: string,
): Promise<ProjectInviteCreator> => {
  if (project.ownerUserId === actorUserId) return { ok: true, isOwner: true };
  const membership = await getActiveProjectMembership(project.id, actorUserId);
  if (
    membership === null ||
    membership.role !== "member" ||
    (membership.memberKind ?? "bot") !== "human"
  ) {
    return { ok: false };
  }
  return {
    ok: true,
    isOwner: false,
    grantableScopes: PROJECT_ACL_DEFAULT_MEMBER_SCOPES.filter((scope) =>
      membership.scopes.includes(scope),
    ),
  };
};
