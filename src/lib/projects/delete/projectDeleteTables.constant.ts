/**
 * Child tables removed by Postgres when an owned user_projects row is deleted.
 * Source of truth: db/migrations 021, 031–033, 041, 044, 045, 050, 052, 053,
 * 056, 058, 059–060, 062, 065, 067, 068 and ensureProjectAclSchema / ensureProjectInviteHooksSchema /
 * ensureProjectComputerHistorySchema.
 * Direct FKs to user_projects are ON DELETE CASCADE; deeper children cascade
 * through project_memberships / project_messages.
 */
export const PROJECT_DELETE_CASCADE_CHILD_TABLES = [
  "project_memberships",
  "project_access_requests",
  "project_folder_refs",
  "project_human_invites",
  "project_invites",
  "project_api_keys",
  "project_membership_webhooks",
  "project_membership_grok_routine_webhooks",
  "project_membership_display_name_aliases",
  "project_messages",
  "project_skill_versions",
  "project_skills",
  "project_message_deliveries",
  "project_grok_routine_wake_attempts",
  "project_message_outcomes",
  "project_message_computer_acks",
  "project_knowledge_items",
  "project_composition_snapshots",
  "project_components",
  "project_device_bindings",
  "project_computer_history_settings",
  "project_pitfall_hits",
  "project_pitfalls",
  "project_messenger_thread_reads",
  "agent_runs",
  "published_capabilities",
] as const;

/**
 * FKs that point at deleted rows with ON DELETE SET NULL. Those rows are kept
 * (automations; run↔snapshot links) and only lose the link to the deleted row.
 */
export const PROJECT_DELETE_SET_NULL_REFERENCES = [
  // agent_runs.project_id is CASCADE as of 068 (reports removed with the project).
  "agent_runs.composition_snapshot_id",
  "agent_automations.project_id",
] as const;
