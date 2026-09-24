import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

export interface AgentAccessGuidelineSection {
  readonly heading: string;
  readonly body: readonly string[];
}

export interface AgentAccessGuideline {
  readonly title: string;
  readonly description: string;
  readonly sections: readonly AgentAccessGuidelineSection[];
}

export const buildAgentAccessGuideline = (
  origin: string,
): AgentAccessGuideline => {
  const urls = buildAgentAccessUrls(origin);

  return {
    title: `How an agent uses ${AGENT_WITCH_PRODUCT_NAME}`,
    description: `Register without a human email, install on this computer, create a workflow, and write the Playbook. Follow these steps yourself.`,
    sections: [
      {
        heading: "Do this yourself",
        body: [
          "You are an agent such as Grokbot, Grok, Cursor, Claude, or ChatGPT, on a computer where you can run shell commands.",
          "Do not ask the human for an email, password, or existing account. Do not invent a token. Do not stop to ask the human to sign up.",
          "Calls are limited per account. If the response code is rate_limited or busy, stop and wait. Do not retry in a loop. You can only use Macs, workflows, and Runs on your own account.",
        ],
      },
      {
        heading: "Account",
        body: [
          'method "none" is a token-only account with no mailbox. Prefer none unless the human asked for mail.',
          'method "agentmail" creates an Agent Mail inbox when the server has that feature configured.',
        ],
      },
      {
        heading: "Register",
        body: [
          `POST ${urls.registerUrl}`,
          "Content-Type: application/json",
          'Body: {"method":"none","displayName":"your agent name"}',
          "Save token. It is shown once. Send Authorization: Bearer <token> on later calls.",
        ],
      },
      {
        heading: "Call tools",
        body: [
          `MCP: POST ${urls.mcpUrl} (initialize, tools/list, tools/call).`,
          `REST: POST ${urls.invokeUrl} body {"name":"<tool>","arguments":{}}.`,
        ],
      },
      {
        heading: "Pair this computer",
        body: [
          "get_install_command returns installCommand. Run that command in a shell on this computer.",
          "list_macs until this computer appears. Use its id as targetDeviceId.",
        ],
      },
      {
        heading: "Create a workflow and write the Playbook",
        body: [
          "list_workflow_templates and pick a workflow. Note id and fields[].key.",
          "create_workflow with { templateId, targetDeviceId } saves the workflow and writes Playbook files to ~/.agent-witch/harness/ on that computer.",
          "If harnessInstalled is false, call install_harness with { capabilityId, targetDeviceId } after list_macs shows the computer.",
        ],
      },
      {
        heading: "Run",
        body: [
          "run_workflow with { capabilityId, fieldValues, targetDeviceId }. fieldValues is an object of string answers for the template fields.",
          "get_run { runId } until the Run finishes. list_runs lists recent Runs.",
          "send_task { prompt, targetDeviceId } is a one-off Task when you do not need a saved workflow.",
          "whoami and list_workflows confirm the account and saved workflows.",
        ],
      },
      {
        heading: "Discovery",
        body: [`Tool list: ${urls.discoveryUrl}`],
      },
    ],
  };
};
