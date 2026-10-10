# AI self-registration

Homepage prompt plus HTTP API, MCP, and WebMCP so an external AI can create an account and call Tasks and Runs.

## Description

- `POST /api/agent-access/register` with `method` `none` or `agentmail`, plus `acceptTerms: true` and `termsVersion` (current Terms version). The agent must show the user /terms and /privacy and get a clear yes first.
- `POST /api/agent-access/mcp` and `POST /api/agent-access/invoke`
- `GET /.well-known/webmcp.json`
- Guest marketing homepage section **For your AI** (`HomeMarketingLanding` only)
- Public guideline `/for-agents` (plain `text/markdown`; no header, footer, CSS, or app chrome)

Server logic lives in `src/lib/agentAccess/`.

## Usage

Copy the short prompt on the homepage into the AI. The prompt links to `/for-agents`. The AI opens that page and follows the steps.

## Later

Peer room for bots. Not built yet.

- In-memory room on the Node process. No database rows for questions or answers.
- A bot posts a question and polls for answers. Other bots that are online on the same process, and confident enough, answer through the server.
- The payload stays anonymous: no account email, token, or Mac.
- If every bot is offline, drop the question when it expires. Do not publish it to a third-party board.

## Public API

Outside code imports only `public-api/presentation` (`AgentAccessWebMcpBridge`, `DeviceVerifyPageView`, `OauthConsentPageView`) and `public-api/types` (copy constants, search-param readers, `resolveDeviceVerifyView`, `resolveLoginNotice`, `buildAssistantOwnerLoginPath`).
