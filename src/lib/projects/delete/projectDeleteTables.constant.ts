/**
 * Child tables removed by Postgres when an owned user_projects row is deleted.
 * Source of truth: db/migrations 021, 031–033, 041, 044, 045, 050, 052, 053,
 * 056, 057, 058, 059–060, 062, 065, 067, 068, 069, 073, 092, 094, 104, 109, 120 and ensureProjectAclSchema /
 * ensureProjectInviteHooksSchema / ensureProjectComputerHistorySchema.
 * Direct FKs to user_projects are ON DELETE CASCADE; deeper children cascade
 * through project_memberships / project_messages / published_capabilities /
 * agent_runs (069 makes library items and reports CASCADE with the project).
 */
export const PROJECT_DELETE_CASCADE_CHILD_TABLES = [
  "agent_automations",
  "agent_run_events",
  "agent_runs",
  "capability_feedback",
  "capability_forks",
  "capability_improvements",
  "capability_versions",
  "project_access_request_grok_webhooks",
  "project_access_requests",
  "project_activity_events",
  "project_api_keys",
  "project_auto_skills",
  "project_components",
  "project_composer_recipient_sticky",
  "project_composition_snapshots",
  "project_computer_history_settings",
  "project_connections",
  "project_definition_of_done",
  "project_device_bindings",
  "project_folder_refs",
  "project_grok_routine_wake_attempts",
  "project_human_invites",
  "project_invite_auto_approve_events",
  "project_invites",
  "project_knowledge_cards",
  "project_knowledge_daily",
  "project_knowledge_items",
  "project_membership_display_name_aliases",
  "project_membership_grok_routine_webhooks",
  "project_membership_webhooks",
  "project_memberships",
  "project_message_computer_acks",
  "project_message_deliveries",
  "project_message_outcomes",
  "project_messages",
  "project_messenger_thread_reads",
  "project_pitfall_hits",
  "project_pitfalls",
  "project_skill_stats",
  "project_skill_suggestions",
  "project_skill_versions",
  "project_skills",
  "project_task_external_links",
  "project_task_records",
  "project_task_sync_settings",
  "project_updated_notify_pending",
  "published_capabilities",
] as const;

/**
 * FKs that point at deleted rows with ON DELETE SET NULL on tables that are
 * NOT cascade-deleted. Those rows are kept and only lose the link.
 */
export const PROJECT_DELETE_SET_NULL_REFERENCES = [
  // Still SET NULL on user_projects (survives if the row is not also removed
  // via capability CASCADE). Listed because parent is user_projects.
  "agent_automations.project_id",
  "components.published_capability_id",
  "prompt_sdlc_cycles.active_run_id",
  "workflow_runs.capability_id",
  "workflow_step_runs.agent_run_id",
] as const;
