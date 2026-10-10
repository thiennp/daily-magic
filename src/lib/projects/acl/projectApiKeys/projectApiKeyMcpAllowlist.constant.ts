/** Tools an active awc_proj_ Bearer may call on MCP (project-scoped only). */
export const PROJECT_API_KEY_MCP_TOOLS = [
  "list_project_peers",
  "get_project_acl",
  "get_my_project_access",
  "project_dispatch",
  "project_messenger_reply",
  "list_project_inbox",
  "register_project_webhook",
  "ack_project_message",
  "create_project_task",
  "update_project_task",
  "list_project_tasks",
  "split_project_task",
  "claim_project_task",
  "release_project_task",
  "list_project_task_blockers",
  "rotate_project_api_key",
  "check_membership",
  "publish_project_skill",
  "list_project_skills",
  "get_project_skill",
  "revoke_project_skill",
] as const;

export type ProjectApiKeyMcpTool = (typeof PROJECT_API_KEY_MCP_TOOLS)[number];

export const isProjectApiKeyMcpTool = (
  name: string,
): name is ProjectApiKeyMcpTool =>
  (PROJECT_API_KEY_MCP_TOOLS as readonly string[]).includes(name);
