import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const AGENT_ACCESS_PROJECT_CLAIM_TOOL: AgentAccessToolDefinition = {
  name: "mint_allow_claim",
  description:
    "Mint a short-lived ACL allow-claim for local peer sync gating. Not a content token. Validation re-checks membership.",
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string" },
    },
    required: ["projectId"],
    additionalProperties: false,
  },
};
