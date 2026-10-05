import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const ISSUE_BOT_CLAIM_CODE_TOOL: AgentAccessToolDefinition = {
  name: "issue_bot_claim_code",
  description:
    "Issue a short-lived (10 min), single-use claim code for THIS bot's agent-access token so a signed-in human can claim ownership on Projects (Claim). Agent-access Bearer only; awc_proj_ keys are rejected. Issuing a new code supersedes any earlier unused code. Fails with already_claimed while owner_user_id is set. Returns the plaintext code once; store only the hash server-side.",
  inputSchema: {
    type: "object",
    properties: {},
    additionalProperties: false,
  },
};
