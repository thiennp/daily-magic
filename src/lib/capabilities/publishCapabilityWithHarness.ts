import buildPlaybookHarnessSetSlug from "@/lib/capabilities/buildPlaybookHarnessSetSlug";
import { createPublishedCapability } from "@/lib/capabilities/createPublishedCapability";
import mapHarnessItemsToTemplateHarness from "@/lib/capabilities/mapHarnessItemsToTemplateHarness";
import type { ParsedCapabilityBody } from "@/lib/capabilities/parseCapabilityBody";
import type { ParsedCapabilityHarnessItem } from "@/lib/capabilities/parseCapabilityHarnessItems";
import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import requestCapabilityTemplateHarnessInstall from "@/lib/capabilities/requestCapabilityTemplateHarnessInstall";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export interface PublishCapabilityWithHarnessResult {
  readonly capability: PublishedCapabilityRecord;
  readonly harnessInstalled: boolean;
  readonly harnessInstallMessage: string | null;
}

const publishCapabilityWithHarness = async (
  ownerUserId: string,
  parsed: ParsedCapabilityBody,
  harnessItems: readonly ParsedCapabilityHarnessItem[],
): Promise<PublishCapabilityWithHarnessResult> => {
  const harnessSetSlug =
    harnessItems.length > 0 ? buildPlaybookHarnessSetSlug(parsed.name) : null;

  const created = await createPublishedCapability({
    ownerUserId,
    name: parsed.name,
    description: parsed.description,
    exampleRequest: parsed.exampleRequest,
    groupId: parsed.groupId,
    type: parsed.type,
    workflowFields: parsed.workflowFields,
    harnessSetSlug,
  });
  const published = await publishCapabilityVersion(
    created.id,
    ownerUserId,
    "Initial publish",
  );
  const capability = published ?? created;

  if (harnessSetSlug === null || harnessItems.length === 0) {
    return {
      capability,
      harnessInstalled: false,
      harnessInstallMessage: null,
    };
  }

  const harness = mapHarnessItemsToTemplateHarness(
    parsed.name,
    harnessSetSlug,
    harnessItems,
  );
  const harnessInstall = await requestCapabilityTemplateHarnessInstall(
    ownerUserId,
    harness,
  );

  return {
    capability,
    harnessInstalled: harnessInstall.installed,
    harnessInstallMessage: harnessInstall.errorMessage,
  };
};

export default publishCapabilityWithHarness;
