import {
  PROJECT_ACL_DEFAULT_MEMBER_SCOPES,
  type ProjectAclScope,
} from "@/lib/projects/acl/projectAclScopes.constant";

const MSG_DISPATCH: ProjectAclScope = "msg:dispatch";

/**
 * Resolve membership scopes on Approve.
 * Prefer owner-passed scopes (intersected with DEFAULT), else pending
 * requestedScopes, else DEFAULT. Agents always get msg:dispatch so stale
 * pre-msg:dispatch requested_scopes cannot freeze a 3-scope membership.
 */
export const resolveApproveMembershipScopes = (input: {
  readonly ownerScopes?: readonly string[] | null;
  readonly requestedScopes: readonly ProjectAclScope[];
  readonly requesterIsAgent: boolean;
}): ProjectAclScope[] => {
  const fromOwner =
    Array.isArray(input.ownerScopes) && input.ownerScopes.length > 0
      ? PROJECT_ACL_DEFAULT_MEMBER_SCOPES.filter((scope) =>
          (input.ownerScopes as readonly string[]).includes(scope),
        )
      : null;
  const base =
    fromOwner !== null
      ? fromOwner
      : input.requestedScopes.length > 0
        ? [...input.requestedScopes]
        : [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  const scopes =
    base.length > 0 ? base : [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  if (!input.requesterIsAgent || scopes.includes(MSG_DISPATCH)) {
    return scopes;
  }
  return [...scopes, MSG_DISPATCH];
};
