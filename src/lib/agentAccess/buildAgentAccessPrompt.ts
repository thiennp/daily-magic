import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

export const buildAgentAccessPrompt = (origin: string): string => {
  const urls = buildAgentAccessUrls(origin);

  return [
    `You are connecting to ${AGENT_WITCH_PRODUCT_NAME} so you can register an account and use its features for the human who pasted this prompt.`,
    "",
    "Registration does not need a human email. Choose one method:",
    '- method "none": token-only account. There is no mailbox.',
    '- method "agentmail": Agent Witch creates an Agent Mail inbox and uses that address as the account email.',
    "",
    "1. Register",
    `POST ${urls.registerUrl}`,
    "Content-Type: application/json",
    'Body: {"method":"none","displayName":"a short name for you"}',
    "Use method agentmail instead of none when the human asked for Agent Mail.",
    "Save the token from the JSON response. It is shown once.",
    "",
    "2. Call tools with that token",
    `Authorization: Bearer <token>`,
    `Prefer MCP: POST ${urls.mcpUrl}`,
    "JSON-RPC 2.0 methods: initialize, tools/list, tools/call.",
    `Or REST: POST ${urls.invokeUrl}`,
    'Body: {"name":"<tool>","arguments":{...}}',
    "",
    "Tools:",
    "- whoami — account email, id, and registration method.",
    "- list_macs — Macs paired to this account.",
    "- send_task — start a Task on a paired Mac. arguments: { prompt, targetDeviceId? }.",
    "- list_runs — recent Runs (Reports).",
    "- get_run — one Run by id. arguments: { runId }.",
    "",
    "A Task runs on a Mac this account has paired. If list_macs is empty, ask the human to install Agent Witch on their Mac from the homepage and pair it, then call send_task.",
    "Do not invent a token. Do not ask the human for a password.",
    `Discovery: ${urls.discoveryUrl}`,
  ].join("\n");
};
