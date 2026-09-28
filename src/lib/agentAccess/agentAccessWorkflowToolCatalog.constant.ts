import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

const deviceIdSchema = {
  type: "string",
  description: "Mac id from list_macs. Omit to use the only paired machine.",
};

export const AGENT_ACCESS_WORKFLOW_TOOLS: readonly AgentAccessToolDefinition[] =
  [
    {
      name: "get_install_command",
      description:
        "Return a shell command that installs Agent Witch on this computer and pairs it to the token account. Run it yourself. No human account is required.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
    },
    {
      name: "list_workflow_templates",
      description:
        "List workflow templates you can save, including the form fields and the Playbook (harness) each one installs on the computer.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
    },
    {
      name: "create_workflow",
      description:
        "Save a workflow from a template onto this account and install its Playbook files on the paired computer.",
      inputSchema: {
        type: "object",
        properties: {
          templateId: { type: "string" },
          targetDeviceId: deviceIdSchema,
        },
        required: ["templateId"],
        additionalProperties: false,
      },
    },
    {
      name: "install_harness",
      description:
        "Write an already saved workflow Playbook onto the paired computer at ~/.agent-witch/harness/.",
      inputSchema: {
        type: "object",
        properties: {
          capabilityId: { type: "string" },
          targetDeviceId: deviceIdSchema,
        },
        required: ["capabilityId"],
        additionalProperties: false,
      },
    },
    {
      name: "list_workflows",
      description: "List workflows saved on this agent account.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
    },
    {
      name: "run_workflow",
      description:
        "Start a saved workflow on the paired computer. fieldValues keys come from list_workflow_templates.",
      inputSchema: {
        type: "object",
        properties: {
          capabilityId: { type: "string" },
          fieldValues: {
            type: "object",
            additionalProperties: { type: "string" },
          },
          targetDeviceId: deviceIdSchema,
        },
        required: ["capabilityId", "fieldValues"],
        additionalProperties: false,
      },
    },
  ];
