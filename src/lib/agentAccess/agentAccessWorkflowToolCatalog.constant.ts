import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";
import { AGENT_ACCESS_LOCAL_FIRST_BEFORE_CLAUSE } from "@/lib/agentAccess/agentAccessLocalFirstCopy.constant";
import { AWL_REPAIR_THIS_COMPUTER_POINTER_COPY } from "@/lib/agentAccess/awlRepairThisComputerPointerCopy.constant";

const deviceIdSchema = {
  type: "string",
  description:
    "Computer id from list_macs. Omit to use the only paired machine.",
};

export const AGENT_ACCESS_WORKFLOW_TOOLS: readonly AgentAccessToolDefinition[] =
  [
    {
      name: "get_install_command",
      description: `Return a shell command that installs AgentWitch on this computer and pairs it to the token account. Run it yourself. No human account is required. ${AWL_REPAIR_THIS_COMPUTER_POINTER_COPY.installCommandTool}`,
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
        "Save a workflow from a template into a project library and install its Playbook files on the paired computer. Requires project_id.",
      inputSchema: {
        type: "object",
        properties: {
          templateId: { type: "string" },
          project_id: {
            type: "string",
            description: "Project id that will own this library item.",
          },
          targetDeviceId: deviceIdSchema,
        },
        required: ["templateId", "project_id"],
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
      description: `Start a saved workflow on the paired computer. fieldValues keys come from list_workflow_templates. ${AGENT_ACCESS_LOCAL_FIRST_BEFORE_CLAUSE}`,
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
