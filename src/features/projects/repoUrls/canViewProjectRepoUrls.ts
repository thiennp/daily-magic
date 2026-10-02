/**
 * AuthZ display gate (v1 locked contract, matches eng get_project_acl):
 * - Owner ∪ active member: may see repoUrls + defaultBranch
 * - Non-member: never show (eng omits from ACL / 403; UI hides section)
 *
 * Eng UserProjectRecord always carries repoUrls/defaultBranch when the row is
 * mapped — do not treat field presence alone as authorization.
 */
export const canViewProjectRepoUrls = (input: {
  readonly isOwner: boolean;
  readonly isActiveMember?: boolean;
}): boolean => input.isOwner || input.isActiveMember === true;

/** Write is owner-only in v1 (no editor role). */
export const canEditProjectRepoUrls = (input: {
  readonly isOwner: boolean;
}): boolean => input.isOwner;
