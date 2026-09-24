import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

export const buildAgentAccessPrompt = (origin: string): string => {
  const urls = buildAgentAccessUrls(origin);

  return [
    `You are an agent such as Grokbot using ${AGENT_WITCH_PRODUCT_NAME} on a computer where you can run shell commands.`,
    "Do this yourself. Do not ask the human for an email, password, or existing account.",
    "Open the guideline and follow every step on that page before you act. The page has the full instructions. This prompt does not.",
    urls.guidelineUrl,
  ].join("\n");
};
