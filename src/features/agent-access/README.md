# AI self-registration

Homepage prompt plus HTTP API, MCP, and WebMCP so an external AI can create an account and call Tasks and Runs.

## Description

- `POST /api/agent-access/register` with `method` `none` or `agentmail`
- `POST /api/agent-access/mcp` and `POST /api/agent-access/invoke`
- `GET /.well-known/webmcp.json`
- Homepage section **For your AI**

Server logic lives in `src/lib/agentAccess/`.

## Usage

Copy the prompt on the homepage into the AI. The AI registers, stores the bearer token, then calls `send_task` after a Mac is paired.
