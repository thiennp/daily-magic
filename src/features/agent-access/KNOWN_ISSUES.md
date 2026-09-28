# Known issues

| ID               | Symptom                                                                                                                                                                                | Fix                                                                                                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AGENT-ACCESS-001 | `/for-agents` wrapped the guideline in the marketing shell and the root app chrome (header, footer, announcement, session, analytics), so agents read navigation noise with the steps. | Static route outside `(app)` chrome. `AgentAccessGuidelinePage` is the document only. `export const dynamic = "force-static"`. Regression: `agentAccessGuidelinePageStatic.test.ts`. |

Agent Mail registration returns 503 until `AGENTMAIL_API_KEY` is set. That is expected.

Registration, tool calls, and mutations are rate limited. A token is not issued for an email that already has an account (human or agent). Orphan synthetic `agents.agentwitch.com` users without a token can complete registration on retry. Open Runs are capped so an agent cannot queue work forever.
