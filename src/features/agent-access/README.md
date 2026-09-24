# AI self-registration

Homepage prompt plus HTTP API, MCP, and WebMCP so an external AI can create an account and call Tasks and Runs.

## Description

- `POST /api/agent-access/register` with `method` `none` or `agentmail`
- `POST /api/agent-access/mcp` and `POST /api/agent-access/invoke`
- `GET /.well-known/webmcp.json`
- Homepage section **For your AI** (short prompt)
- Public guideline `/for-agents`

Server logic lives in `src/lib/agentAccess/`.

## Usage

Copy the short prompt on the homepage into the AI. The prompt links to `/for-agents`. The AI opens that page and follows the steps.
