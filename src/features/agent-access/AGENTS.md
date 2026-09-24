# Agent access — agent instructions

1. Query `npm run feature-knowledge:query -- "AI register WebMCP" --feature=docs`.
2. Keep tool handlers on `dispatchClaudeRunForDashboardUser` and existing run/device queries.
3. Do not store raw bearer tokens. Hash with SHA-256.
4. Method `none` must keep working when `AGENTMAIL_API_KEY` is unset.
