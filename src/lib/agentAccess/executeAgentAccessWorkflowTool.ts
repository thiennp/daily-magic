import { createAgentWitchInstallTokenForUser } from "@/lib/agentWitch/createAgentWitchInstallTokenForUser";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { executeAgentAccessCreateWorkflow } from "@/lib/agentAccess/executeAgentAccessCreateWorkflow";
import { listPublishedCapabilitiesForOwner } from "@/lib/capabilities/capabilityQueries";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

import { installAgentAccessHarness } from "@/lib/agentAccess/installAgentAccessHarness";
import { listAgentAccessWorkflowTemplates } from "@/lib/agentAccess/listAgentAccessWorkflowTemplates";
import { runAgentAccessWorkflow } from "@/lib/agentAccess/runAgentAccessWorkflow";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

export const executeAgentAccessWorkflowTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name === "list_workflow_templates") {
    return agentAccessTextResult({
      ok: true,
      workflows: listAgentAccessWorkflowTemplates(),
    });
  }

  if (input.name === "get_install_command") {
    const install = await createAgentWitchInstallTokenForUser({
      userId: input.actor.id,
      email: input.actor.email,
      origin: buildAgentAccessUrls().origin,
    });

    return agentAccessTextResult({
      ok: true,
      installCommand: install.installCommand,
      next: "Run installCommand in a shell on this computer, then call list_macs until this machine appears.",
    });
  }

  if (input.name === "list_workflows") {
    const workflows = (
      await listPublishedCapabilitiesForOwner(input.actor.id)
    ).filter((capability) => capability.type === CapabilityType.WORKFLOW);

    return agentAccessTextResult({
      ok: true,
      workflows: workflows.map((capability) => ({
        id: capability.id,
        name: capability.name,
        description: capability.description,
        harnessSlug: capability.harnessSetSlug,
        fields: capability.workflowFields.map((field) => ({
          key: field.key,
          label: field.label,
          required: field.required,
        })),
      })),
    });
  }

  if (input.name === "create_workflow") {
    return executeAgentAccessCreateWorkflow({
      actor: input.actor,
      args: input.args,
    });
  }

  if (input.name === "install_harness") {
    return installAgentAccessHarness(input.actor, input.args);
  }

  if (input.name === "run_workflow") {
    return runAgentAccessWorkflow(input.actor, input.args);
  }

  return null;
};
