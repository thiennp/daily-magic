import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { createPublishedCapability } from "@/lib/capabilities/createPublishedCapability";
import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import requestCapabilityTemplateHarnessInstall from "@/lib/capabilities/requestCapabilityTemplateHarnessInstall";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export interface CreateCapabilityFromTemplateResult {
  readonly capability: PublishedCapabilityRecord;
  readonly harness: CapabilityTemplateHarness;
  readonly harnessInstalled: boolean;
  readonly harnessInstallMessage: string | null;
}

const createCapabilityFromTemplate = async (
  ownerUserId: string,
  templateId: string,
  deviceId?: string,
): Promise<CreateCapabilityFromTemplateResult | null> => {
  const template = findCapabilityTemplateById(templateId);

  if (template === undefined) {
    return null;
  }

  const created = await createPublishedCapability({
    ownerUserId,
    name: template.name,
    description: template.description,
    exampleRequest: template.exampleRequest,
    type: template.type,
    harnessSetSlug: template.harness.slug,
    workflowFields:
      template.type === CapabilityType.WORKFLOW ? template.workflowFields : [],
  });
  const published = await publishCapabilityVersion(
    created.id,
    ownerUserId,
    "Saved from template",
  );
  const harnessInstall = await requestCapabilityTemplateHarnessInstall(
    ownerUserId,
    template.harness,
    deviceId,
  );

  return {
    capability: published ?? created,
    harness: template.harness,
    harnessInstalled: harnessInstall.installed,
    harnessInstallMessage: harnessInstall.errorMessage,
  };
};

export default createCapabilityFromTemplate;
