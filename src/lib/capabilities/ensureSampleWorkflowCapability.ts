import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { createPublishedCapability } from "@/lib/capabilities/createPublishedCapability";
import {
  listPublishedCapabilitiesForOwner,
  ownerHasArchivedCapabilityNamed,
} from "@/lib/capabilities/capabilityQueries";
import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import {
  SAMPLE_WORKFLOW_CAPABILITY_NAME,
  SAMPLE_WORKFLOW_DESCRIPTION,
  SAMPLE_WORKFLOW_EXAMPLE_REQUEST,
  SAMPLE_WORKFLOW_FIELDS,
} from "@/lib/capabilities/sampleWorkflowCapability.constant";
import shouldSeedSampleWorkflow from "@/lib/capabilities/shouldSeedSampleWorkflow";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

const ensureSampleWorkflowCapability = async (
  ownerUserId: string,
): Promise<PublishedCapabilityRecord | null> => {
  const capabilities = await listPublishedCapabilitiesForOwner(ownerUserId);
  const archivedSampleExists = await ownerHasArchivedCapabilityNamed(
    ownerUserId,
    SAMPLE_WORKFLOW_CAPABILITY_NAME,
    CapabilityType.WORKFLOW,
  );

  if (
    !shouldSeedSampleWorkflow({ capabilities, archivedSampleExists })
  ) {
    return null;
  }

  const created = await createPublishedCapability({
    ownerUserId,
    name: SAMPLE_WORKFLOW_CAPABILITY_NAME,
    description: SAMPLE_WORKFLOW_DESCRIPTION,
    exampleRequest: SAMPLE_WORKFLOW_EXAMPLE_REQUEST,
    type: CapabilityType.WORKFLOW,
    workflowFields: SAMPLE_WORKFLOW_FIELDS,
  });
  const published = await publishCapabilityVersion(
    created.id,
    ownerUserId,
    "Sample workflow",
  );

  return published ?? created;
};

export default ensureSampleWorkflowCapability;
