import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

import { buildAgentAccessGuideline } from "@/lib/agentAccess/buildAgentAccessGuideline";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

export const formatAgentAccessLlmsText = (): string => {
  const urls = buildAgentAccessUrls();
  const guide = buildAgentAccessGuideline();
  const sections = guide.sections.flatMap((section) => [
    `## ${section.heading}`,
    ...section.body,
  ]);

  return [
    `# ${AGENT_WITCH_PRODUCT_NAME}`,
    `> Any bot can register and use ${AGENT_WITCH_PRODUCT_NAME} with no human account. Open the guideline, then call the HTTP API. Do not ask the human for an email or password.`,
    `Guideline: ${urls.guidelineUrl}`,
    `Plain text: ${urls.origin}/llms.txt`,
    `Register: POST ${urls.registerUrl}`,
    `Invoke: POST ${urls.invokeUrl}`,
    `MCP: POST ${urls.mcpUrl}`,
    `Discovery: ${urls.discoveryUrl}`,
    guide.description,
    ...sections,
  ].join("\n\n");
};
