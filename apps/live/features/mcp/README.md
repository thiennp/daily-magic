# mcp (AWL)

Local MCP server for Agent Witch Local.

## Owns

- Transports over the shared JSON-RPC core `handleMcpJsonRpcRequest`
  (`@agent-witch/shared/mcp`): stdio (`agent-witch mcp`, Content-Length
  framed) and HTTP `POST /mcp` on the local app
- `createAwlMcpServer` — composes the AWL tool list from feature-owned handlers

## Does not own

- Tool domain logic (e.g. `check_context` lives in `token-saver`)
- The JSON-RPC core, protocol version and server-info constant
  (`@agent-witch/shared/mcp`, shared with AWC)

## Public API

- `@agent-witch/live-mcp` — server factory, stdio runner, HTTP tryHandle
- `@agent-witch/live-mcp/types` — re-exports `McpServerDefinition`, `McpTool`
  from `@agent-witch/shared/mcp`
