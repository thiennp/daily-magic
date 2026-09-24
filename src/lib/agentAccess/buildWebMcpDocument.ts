import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { AGENT_ACCESS_TOOL_CATALOG } from "@/lib/agentAccess/agentAccessToolCatalog.constant";
import { buildAgentAccessPrompt } from "@/lib/agentAccess/buildAgentAccessPrompt";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

export interface WebMcpDocument {
  readonly name: string;
  readonly description: string;
  readonly prompt: string;
  readonly registration: {
    readonly methods: readonly ["none", "agentmail"];
    readonly registerUrl: string;
  };
  readonly mcp: {
    readonly transport: "http";
    readonly url: string;
    readonly invokeUrl: string;
  };
  readonly tools: typeof AGENT_ACCESS_TOOL_CATALOG;
}

export const buildWebMcpDocument = (origin: string): WebMcpDocument => {
  const urls = buildAgentAccessUrls(origin);

  return {
    name: AGENT_WITCH_PRODUCT_NAME,
    description:
      "Register an AI account without a human email, or with Agent Mail, then send Tasks to paired Macs and read Runs.",
    prompt: buildAgentAccessPrompt(origin),
    registration: {
      methods: ["none", "agentmail"],
      registerUrl: urls.registerUrl,
    },
    mcp: {
      transport: "http",
      url: urls.mcpUrl,
      invokeUrl: urls.invokeUrl,
    },
    tools: AGENT_ACCESS_TOOL_CATALOG,
  };
};
