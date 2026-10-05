/**
 * AWL slice `mcp` — local MCP transports (stdio `agent-witch mcp`, HTTP
 * `POST /mcp`) over the shared JSON-RPC core in `@agent-witch/shared/mcp`.
 * Tool domain logic lives in the owning feature (e.g. token-saver `check_context`).
 */
export { createAwlMcpServer } from "../internal/core/createAwlMcpServer";
export { runAwlMcpStdio } from "../internal/core/runAwlMcpStdio";
export { tryHandleAwlMcpHttpRequest } from "../internal/core/tryHandleAwlMcpHttpRequest";
