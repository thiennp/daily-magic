/** Tools an active awc_proj_ Bearer may call on MCP (project-scoped only). */
export const PROJECT_API_KEY_MCP_TOOLS = [
  "list_project_peers",
  "get_project_acl",
  "get_my_project_access",
  "project_dispatch",
  "list_project_inbox",
  "register_project_webhook",
  "ack_project_message",
  "rotate_project_api_key",
  "check_membership",
] as const;

export type ProjectApiKeyMcpTool = (typeof PROJECT_API_KEY_MCP_TOOLS)[number];

export const isProjectApiKeyMcpTool = (
  name: string,
): name is ProjectApiKeyMcpTool =>
  (PROJECT_API_KEY_MCP_TOOLS as readonly string[]).includes(name);
