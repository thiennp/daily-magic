/**
 * AWL slice `mcp` — local MCP server: one JSON-RPC core shared by the stdio
 * (`agent-witch mcp`) and HTTP (`POST /mcp`) transports. Tool domain logic
 * lives in the owning feature (e.g. token-saver `check_context`).
 */
export { handleMcpJsonRpcRequest } from "../internal/core/handleMcpJsonRpcRequest";
export { createAwlMcpServer } from "../internal/core/createAwlMcpServer";
export { runAwlMcpStdio } from "../internal/core/runAwlMcpStdio";
export { tryHandleAwlMcpHttpRequest } from "../internal/core/tryHandleAwlMcpHttpRequest";
