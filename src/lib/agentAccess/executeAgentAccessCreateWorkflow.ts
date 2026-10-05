import createCapabilityFromTemplate from "@/lib/capabilities/createCapabilityFromTemplate";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
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

export const executeAgentAccessCreateWorkflow = async (input: {
  readonly actor: AgentAccessActor;
  readonly args: unknown;
}): Promise<AgentAccessToolCallResult> => {
  const templateId = readId(input.args, "templateId");
  const projectId =
    readId(input.args, "project_id") ?? readId(input.args, "projectId");

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

  if (projectId === null) {
    return agentAccessTextResult(
      {
        ok: false,
        error: "project_id is required.",
        code: "project_required",
      },
      true,
    );
  }

  const created = await createCapabilityFromTemplate({
    ownerUserId: input.actor.id,
    templateId,
    projectId,
    deviceId: readId(input.args, "targetDeviceId") ?? undefined,
  });

  if (!created.ok) {
    return agentAccessTextResult(
      { ok: false, error: created.error, code: created.code },
      true,
    );
  }

  return agentAccessTextResult({
    ok: true,
    capabilityId: created.capability.id,
    name: created.capability.name,
    projectId: created.projectId,
    harnessInstalled: created.harnessInstalled,
    harnessInstallMessage: created.harnessInstallMessage,
    next: created.harnessInstalled
      ? "Playbook files are on the computer. Call run_workflow with fieldValues."
      : "Workflow is saved. Pair the computer with get_install_command, then call install_harness.",
  });
};
