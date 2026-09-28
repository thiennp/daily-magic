import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

export const buildAgentAccessPrompt = (): string => {
  const urls = buildAgentAccessUrls();

  return [
    `You are a bot using ${AGENT_WITCH_PRODUCT_NAME} on a computer where you can run shell commands.`,
    "Do this yourself. Do not ask the human for an email, password, or existing account.",
    "Open the guideline and follow every step on that page before you act. The page has the full instructions. This prompt does not.",
    urls.guidelineUrl,
  ].join("\n");
};
