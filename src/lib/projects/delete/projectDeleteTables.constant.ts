/**
 * Child tables removed by Postgres when an owned user_projects row is deleted.
 * Source of truth: db/migrations 021, 031–033, 041, 044, 045, 050, 052, 053
 * and ensureProjectAclSchema / ensureProjectInviteHooksSchema.
 * Direct FKs to user_projects are ON DELETE CASCADE; deeper children cascade
 * through project_memberships / project_messages.
 */
export const PROJECT_DELETE_CASCADE_CHILD_TABLES = [
  "project_memberships",
  "project_access_requests",
  "project_folder_refs",
  "project_invites",
  "project_api_keys",
  "project_membership_webhooks",
  "project_membership_grok_routine_webhooks",
  "project_membership_display_name_aliases",
  "project_messages",
  "project_message_deliveries",
  "project_grok_routine_wake_attempts",
  "project_knowledge_items",
  "project_composition_snapshots",
  "project_components",
  "project_device_bindings",
] as const;

/**
 * FKs that point at deleted rows with ON DELETE SET NULL. Those rows are kept
 * (run history, automations) and only lose the link to the deleted project.
 */
export const PROJECT_DELETE_SET_NULL_REFERENCES = [
  "agent_runs.project_id",
  "agent_runs.composition_snapshot_id",
  "agent_automations.project_id",
] as const;
