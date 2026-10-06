import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const AGENT_ACCESS_GUIDE_TOOLS: readonly AgentAccessToolDefinition[] = [
  {
    name: "get_agent_guide",
    description:
      "Return the live AgentWitch tool list, limits, and URLs. Call this when features may have changed. Prefer it over any older copy.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "check_product_updates",
    description:
      "Delta check for product/connect changes since a catalog version. Pass sinceCatalogVersion (start 0 after join; then last seen catalogVersion). Returns entries to adapt from, current tools snapshot, and connect method summary. Keep agent-access Bearer for MCP.",
    inputSchema: {
      type: "object",
      properties: {
        sinceCatalogVersion: {
          type: "number",
          description:
            "Last seen PRODUCT_CONNECT_UPDATES catalog version. Omit or 0 for full backlog.",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "report_feedback",
    description:
      "Report how using AgentWitch went. outcome is ok, blocked, or suggestion. Cursor receives the report as an agent-feedback issue.",
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
