# How can an AI register for Agent Witch and use its features?

## Query aliases

- AI self register Agent Witch no email Agent Mail WebMCP
- AI tu tao workflow va cai harness tren may khong can tai khoan nguoi dung
- any bot agent witch llms.txt for-agents no human account
- grokbot agent witch install command create_workflow install_harness
- copy prompt homepage for your AI send task
- webmcp.json agent-access register invoke mcp
- dang ky bang agent mail, prompt trang chu SEO
- khong co danh ba bot, khong publish email token tai khoan

## Short answer

An AI creates an account with `POST /api/agent-access/register`. Method `none` needs no mailbox. Method `agentmail` asks Agent Witch to create an Agent Mail inbox when `AGENTMAIL_API_KEY` is set. The response includes a bearer token once. The AI then calls MCP at `POST /api/agent-access/mcp` or REST at `POST /api/agent-access/invoke`. The homepage section **For your AI** has a short prompt. That prompt links to `/for-agents`, which is the full guideline the agent must open and follow. Any bot can also read `GET /llms.txt` or call `get_agent_guide` for the live tool list. `report_feedback` records usage for Cursor. The GitHub issue, when opened, contains the report only and never an account email or token. There is no public directory of other people's bots, so Agent Witch does not contact them. A bot may still expose Agent Witch as its own tool named `use_agent_witch` and point at the public guideline. Discovery is `GET /.well-known/webmcp.json`.

## Details

| Piece          | Path                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| Register       | `POST /api/agent-access/register` body `{ "method": "none" \| "agentmail", "displayName"?: string }` |
| MCP            | `POST /api/agent-access/mcp` JSON-RPC `initialize`, `tools/list`, `tools/call`                       |
| REST tools     | `POST /api/agent-access/invoke` body `{ "name", "arguments" }` plus `Authorization: Bearer aw_...`   |
| Discovery      | `GET /.well-known/webmcp.json`                                                                       |
| Homepage       | Marketing landing and signed-in home, heading **For your AI** (short prompt)                         |
| Guideline      | `/for-agents` — full steps the homepage prompt tells the agent to open                               |
| Browser WebMCP | `navigator.modelContext` tools registered by `AgentAccessWebMcpBridge`                               |

Tools: `register_account`, `whoami`, `get_install_command`, `list_macs`, `list_workflow_templates`, `create_workflow`, `install_harness`, `list_workflows`, `run_workflow`, `send_task`, `list_runs`, `get_run`.

An agent such as Grok does this without a human mailbox: register with method `none`, run `get_install_command` in a shell on the computer it controls, wait until `list_macs` shows that computer, then `create_workflow` with a template id. That saves the workflow and writes the Playbook to `~/.agent-witch/harness/` on that computer. `run_workflow` starts it. If the computer is offline, `install_harness` retries the Playbook write.

Public pages (`/for-agents`, `/llms.txt`, `/.well-known/webmcp.json`) are how any bot learns the tools. Agent Witch does not keep a directory of other accounts and does not send a bot another person's email, token, or Mac.

Tokens are stored as SHA-256 hashes. Registration is limited to 8 attempts per hour per client IP hash and 60 per hour for the whole service. Each token is limited to 120 tool calls and 20 mutations per hour. An account can keep at most 3 open Runs and 20 workflows. A token is issued only for a new account, and the actor role is always `user`. Requests over 32 KB are rejected. `rate_limited` and `busy` mean stop and wait. Agent accounts are normal `user` role accounts and can only see their own Macs, workflows, and Runs.

## Related

- [Accounts and sign-in](../guides/user-guide/02-accounts-and-sign-in.md)
- [Tasks, dispatch, and Runs](../guides/user-guide/05-tasks-dispatch-and-runs.md)
- Code: `src/lib/agentAccess/`

## Last reviewed

2026-09-24
