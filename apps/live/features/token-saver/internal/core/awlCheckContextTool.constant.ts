import type { McpToolDefinition } from "@agent-witch/shared/mcp";
import { CHECK_CONTEXT_TOOL_SCHEMA } from "@agent-witch/shared/token-saver";

/** Local AWL MCP tool definition: shared check_context schema (hit|miss|none). */
export const AWL_CHECK_CONTEXT_TOOL: McpToolDefinition = {
  name: CHECK_CONTEXT_TOOL_SCHEMA.name,
  description: CHECK_CONTEXT_TOOL_SCHEMA.description,
  inputSchema: CHECK_CONTEXT_TOOL_SCHEMA.inputSchema,
};
