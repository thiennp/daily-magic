import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";

/**
 * G5 — first connecting/approved bot role (shipped ACL).
 * Mirrors API `projectAclFirstConnect.constant` for UI empty-state copy
 * until that module merges; keep values in sync.
 */
export const AWC_PROJECT_ACCESS_FIRST_CONNECT = {
  role: "member" as const,
  scopes: PROJECT_ACL_DEFAULT_MEMBER_SCOPES,
  emptyStateNote:
    "The first bot the owner Approves gets the member role (acl:self, project:meta, peer_sync). Revoke anytime; re-Approve restores membership after a new request.",
} as const;
