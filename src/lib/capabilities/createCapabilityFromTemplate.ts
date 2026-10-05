import bindPublishedCapabilityToProjectOrCompensate from "@/lib/capabilities/bindPublishedCapabilityToProjectOrCompensate";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { createPublishedCapability } from "@/lib/capabilities/createPublishedCapability";
import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import requestCapabilityTemplateHarnessInstall from "@/lib/capabilities/requestCapabilityTemplateHarnessInstall";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { requireProjectIdForCreate } from "@/lib/projects/requireProjectIdForCreate";

export interface CreateCapabilityFromTemplateInput {
  readonly ownerUserId: string;
  readonly templateId: string;
  readonly projectId: string;
  readonly deviceId?: string;
  readonly deferHarnessInstall?: boolean;
}

export type CreateCapabilityFromTemplateResult =
  | {
      readonly ok: true;
      readonly capability: PublishedCapabilityRecord;
      readonly harness: CapabilityTemplateHarness;
      readonly harnessInstalled: boolean;
      readonly harnessInstallMessage: string | null;
      readonly projectId: string;
    }
  | {
      readonly ok: false;
      readonly status: 400 | 403 | 404;
      readonly code: string;
      readonly error: string;
    };

const createCapabilityFromTemplate = async (
  input: CreateCapabilityFromTemplateInput,
): Promise<CreateCapabilityFromTemplateResult> => {
  const project = await requireProjectIdForCreate({
    actorUserId: input.ownerUserId,
    projectId: input.projectId,
  });
  if (!project.ok) {
    return project;
  }

  const template = findCapabilityTemplateById(input.templateId);
  if (template === undefined) {
    return {
      ok: false,
      status: 404,
      code: "not_found",
      error: "Template not found.",
    };
  }

  const created = await createPublishedCapability({
    ownerUserId: input.ownerUserId,
    name: template.name,
    description: template.description,
    exampleRequest: template.exampleRequest,
    type: template.type,
    harnessSetSlug: template.harness.slug,
    workflowFields:
      template.type === CapabilityType.WORKFLOW ? template.workflowFields : [],
    operatorSteps: mapHarnessItemsToOperatorSteps(template.harness.items),
  });
  const published = await publishCapabilityVersion(
    created.capability.id,
    input.ownerUserId,
    "Saved from template",
    created.componentId,
  );
  const capability = published?.capability ?? created.capability;
  const componentId = published?.componentId ?? created.componentId;
  const capabilityVersionId = published?.capabilityVersionId ?? null;
  const componentVersionId = published?.componentVersionId ?? null;

  const bound = await bindPublishedCapabilityToProjectOrCompensate({
    ownerUserId: input.ownerUserId,
    projectId: project.projectId,
    capabilityId: capability.id,
    componentId,
    capabilityVersionId,
    componentVersionId,
    capabilityType: template.type,
    harnessSetSlug: template.harness.slug,
    harnessSetName: template.harness.name,
  });
  if (!bound.ok) {
    return {
      ok: false,
      status: 400,
      code: "project_bind_failed",
      error: bound.error,
    };
  }

  const harnessInstall =
    input.deferHarnessInstall === true
      ? { installed: false, errorMessage: null }
      : await requestCapabilityTemplateHarnessInstall(
          input.ownerUserId,
          template.harness,
          input.deviceId,
        );

  return {
    ok: true,
    capability,
    harness: template.harness,
    harnessInstalled: harnessInstall.installed,
    harnessInstallMessage: harnessInstall.errorMessage,
    projectId: project.projectId,
  };
};

export default createCapabilityFromTemplate;
