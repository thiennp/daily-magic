import { AGENT_ACCESS_TOOL_CATALOG } from "@/lib/agentAccess/agentAccessToolCatalog.constant";
import { AGENT_ACCESS_WORKFLOW_TOOLS } from "@/lib/agentAccess/agentAccessWorkflowToolCatalog.constant";

export const AGENT_ACCESS_TOOLS = [
  ...AGENT_ACCESS_TOOL_CATALOG,
  ...AGENT_ACCESS_WORKFLOW_TOOLS,
] as const;
