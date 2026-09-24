import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const AGENT_ACCESS_GUIDE_TOOLS: readonly AgentAccessToolDefinition[] = [
  {
    name: "get_agent_guide",
    description:
      "Return the live Agent Witch tool list, limits, and URLs. Call this when features may have changed. Prefer it over any older copy.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "report_feedback",
    description:
      "Report how using Agent Witch went. outcome is ok, blocked, or suggestion. Cursor receives the report as an agent-feedback issue.",
    inputSchema: {
      type: "object",
      properties: {
        outcome: { type: "string", enum: ["ok", "blocked", "suggestion"] },
        summary: { type: "string" },
        detail: { type: "string" },
      },
      required: ["outcome", "summary"],
      additionalProperties: false,
    },
  },
];
