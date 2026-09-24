# How can an AI register for Agent Witch and use its features?

## Query aliases

- AI self register Agent Witch no email Agent Mail WebMCP
- AI tu dang ky tai khoan Agent Witch khong can email
- copy prompt homepage for your AI send task
- webmcp.json agent-access register invoke mcp
- dang ky bang agent mail, prompt trang chu SEO

## Short answer

An AI creates an account with `POST /api/agent-access/register`. Method `none` needs no mailbox. Method `agentmail` asks Agent Witch to create an Agent Mail inbox when `AGENTMAIL_API_KEY` is set. The response includes a bearer token once. The AI then calls MCP at `POST /api/agent-access/mcp` or REST at `POST /api/agent-access/invoke`. The homepage section **For your AI** has a prompt to copy. Discovery is `GET /.well-known/webmcp.json`.

## Details

| Piece          | Path                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| Register       | `POST /api/agent-access/register` body `{ "method": "none" \| "agentmail", "displayName"?: string }` |
| MCP            | `POST /api/agent-access/mcp` JSON-RPC `initialize`, `tools/list`, `tools/call`                       |
| REST tools     | `POST /api/agent-access/invoke` body `{ "name", "arguments" }` plus `Authorization: Bearer aw_...`   |
| Discovery      | `GET /.well-known/webmcp.json`                                                                       |
| Homepage       | Marketing landing and signed-in home, heading **For your AI**                                        |
| Browser WebMCP | `navigator.modelContext` tools registered by `AgentAccessWebMcpBridge`                               |

Tools: `register_account`, `whoami`, `list_macs`, `send_task`, `list_runs`, `get_run`.

`send_task` uses the same Mac dispatch as the composer. A new account has no Mac until a human pairs one. Tokens are stored as SHA-256 hashes. Registration is limited to 8 attempts per hour per client IP hash. Agent accounts are normal `user` role accounts.

## Related

- [Accounts and sign-in](../guides/user-guide/02-accounts-and-sign-in.md)
- [Tasks, dispatch, and Runs](../guides/user-guide/05-tasks-dispatch-and-runs.md)
- Code: `src/lib/agentAccess/`

## Last reviewed

2026-09-24
