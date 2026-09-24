import { createAgentWitchInstallTokenForUser } from "@/lib/agentWitch/createAgentWitchInstallTokenForUser";
import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";
import createCapabilityFromTemplate from "@/lib/capabilities/createCapabilityFromTemplate";
import { listPublishedCapabilitiesForOwner } from "@/lib/capabilities/capabilityQueries";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

import { installAgentAccessHarness } from "@/lib/agentAccess/installAgentAccessHarness";
import { listAgentAccessWorkflowTemplates } from "@/lib/agentAccess/listAgentAccessWorkflowTemplates";
import { runAgentAccessWorkflow } from "@/lib/agentAccess/runAgentAccessWorkflow";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

const readId = (args: unknown, key: string): string | null => {
  if (typeof args !== "object" || args === null) {
    return null;
  }

  const value = (args as Record<string, unknown>)[key];

  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
};

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
      origin: resolveAppBaseUrl(),
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
    const templateId = readId(input.args, "templateId");

    if (templateId === null) {
      return agentAccessTextResult(
        {
          ok: false,
          error: "templateId is required.",
          code: "invalid_arguments",
        },
        true,
      );
    }

    const created = await createCapabilityFromTemplate(
      input.actor.id,
      templateId,
      readId(input.args, "targetDeviceId") ?? undefined,
    );

    if (created === null) {
      return agentAccessTextResult(
        { ok: false, error: "Template not found.", code: "not_found" },
        true,
      );
    }

    return agentAccessTextResult({
      ok: true,
      capabilityId: created.capability.id,
      name: created.capability.name,
      harnessInstalled: created.harnessInstalled,
      harnessInstallMessage: created.harnessInstallMessage,
      next: created.harnessInstalled
        ? "Playbook files are on the computer. Call run_workflow with fieldValues."
        : "Workflow is saved. Pair the computer with get_install_command, then call install_harness.",
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
