/** ACL scopes only — never grant AWC content reads. */
export const PROJECT_ACL_SCOPES = [
  "acl:self",
  "project:meta",
  "peer_sync",
  "folder_ref:propose",
] as const;

export type ProjectAclScope = (typeof PROJECT_ACL_SCOPES)[number];

export const PROJECT_ACL_DEFAULT_MEMBER_SCOPES: readonly ProjectAclScope[] = [
  "acl:self",
  "project:meta",
  "peer_sync",
] as const;

export const isProjectAclScope = (value: string): value is ProjectAclScope =>
  (PROJECT_ACL_SCOPES as readonly string[]).includes(value);
