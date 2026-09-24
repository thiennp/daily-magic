import { getPublishedCapabilityById } from "@/lib/capabilities/getPublishedCapabilityById";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import requestCapabilityTemplateHarnessInstall from "@/lib/capabilities/requestCapabilityTemplateHarnessInstall";
import { resolveTemplateIdFromHarnessSetSlug } from "@/lib/workflowOrchestration/resolveTemplateIdFromHarnessSetSlug";

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

export const installAgentAccessHarness = async (
  actor: AgentAccessActor,
  args: unknown,
): Promise<AgentAccessToolCallResult> => {
  const capabilityId = readId(args, "capabilityId");

  if (capabilityId === null) {
    return agentAccessTextResult(
      {
        ok: false,
        error: "capabilityId is required.",
        code: "invalid_arguments",
      },
      true,
    );
  }

  const capability = await getPublishedCapabilityById(capabilityId);

  if (capability === null || capability.ownerUserId !== actor.id) {
    return agentAccessTextResult(
      { ok: false, error: "Workflow not found.", code: "not_found" },
      true,
    );
  }

  const templateId = resolveTemplateIdFromHarnessSetSlug(
    capability.harnessSetSlug,
  );
  const template =
    templateId === null ? undefined : findCapabilityTemplateById(templateId);

  if (template === undefined) {
    return agentAccessTextResult(
      {
        ok: false,
        error: "This workflow has no installable Playbook.",
        code: "not_found",
      },
      true,
    );
  }

  const installed = await requestCapabilityTemplateHarnessInstall(
    actor.id,
    template.harness,
    readId(args, "targetDeviceId") ?? undefined,
  );

  return agentAccessTextResult({
    ok: installed.installed,
    harnessInstalled: installed.installed,
    harnessInstallMessage: installed.errorMessage,
  });
};
