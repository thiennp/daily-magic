/**
 * Exhaustive AWC cowork allowlist for this feature.
 * Anything not listed must not be stored or returned as shared cowork data.
 */
export const PROJECT_ACL_AWC_ALLOWLIST_TABLES = [
  "user_projects",
  "project_folder_refs",
  "project_memberships",
  "project_access_requests",
  "project_access_audit",
] as const;

export const PROJECT_ACL_USER_PROJECT_FIELDS = [
  "id",
  "owner_user_id",
  "name",
  "created_at",
  "updated_at",
] as const;

export const PROJECT_ACL_FOLDER_REF_FIELDS = [
  "id",
  "project_id",
  "machine_or_device_ref",
  "folder_path",
  "created_at",
  "updated_at",
] as const;

export const PROJECT_ACL_MEMBERSHIP_FIELDS = [
  "id",
  "project_id",
  "user_id",
  "role",
  "status",
  "team_label",
  "scopes",
  "created_at",
  "revoked_at",
] as const;
