# mcp (AWL)

Local MCP server for Agent Witch Local.

## Owns

- Shared JSON-RPC core `handleMcpJsonRpcRequest` (initialize, ping,
  notifications, tools/list, tools/call, errors)
- Transports over that core: stdio (`agent-witch mcp`, Content-Length framed)
  and HTTP `POST /mcp` on the local app
- `createAwlMcpServer` — composes the AWL tool list from feature-owned handlers

## Does not own

- Tool domain logic (e.g. `check_context` lives in `token-saver`)

## Public API

- `@agent-witch/live-mcp` — core, server factory, stdio runner, HTTP tryHandle
- `@agent-witch/live-mcp/types` — `McpServerDefinition`, `McpTool`
