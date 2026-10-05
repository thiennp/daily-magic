/**
 * Every table whose rows are removed when an owner deletes a project, in the
 * exact order the DB-only delete transaction runs (leaf rows first).
 * Source of truth: db/migrations 021, 031–033, 041, 044, 045, 050, 052, 053.
 * Every FK below is also ON DELETE CASCADE, so the explicit deletes and the
 * cascades agree.
 */
export const PROJECT_DELETE_TABLES_IN_ORDER = [
  "project_message_deliveries",
  "project_grok_routine_wake_attempts",
  "project_api_keys",
  "project_membership_webhooks",
  "project_membership_grok_routine_webhooks",
  "project_membership_display_name_aliases",
  "project_messages",
  "project_access_requests",
  "project_invites",
  "project_folder_refs",
  "project_knowledge_items",
  "project_composition_snapshots",
  "project_components",
  "project_device_bindings",
  "project_memberships",
  "user_projects",
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
