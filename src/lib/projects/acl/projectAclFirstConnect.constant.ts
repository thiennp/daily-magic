import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";

/**
 * G5 — first connecting/approved bot role (shipped ACL).
 * Product can bind empty-state copy from this constant / API meta.
 */
export const PROJECT_ACL_FIRST_CONNECT = {
  role: "member" as const,
  scopes: PROJECT_ACL_DEFAULT_MEMBER_SCOPES,
  emptyStateNote:
    "The first bot the owner Approves gets the member role after a project nickname is set. Revoke anytime; re-Approve restores membership after a new request.",
} as const;
