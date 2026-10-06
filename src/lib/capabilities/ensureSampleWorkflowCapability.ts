import bindPublishedCapabilityToProjectOrCompensate from "@/lib/capabilities/bindPublishedCapabilityToProjectOrCompensate";
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
import { resolveSaveToProjectDefault } from "@/lib/projects/resolveSaveToProjectDefault";
import { listUserProjectsForOwner } from "@/lib/projects/userProjectQueries";

const ensureSampleWorkflowCapability = async (
  ownerUserId: string,
): Promise<PublishedCapabilityRecord | null> => {
  const capabilities = await listPublishedCapabilitiesForOwner(ownerUserId);
  const archivedSampleExists = await ownerHasArchivedCapabilityNamed(
    ownerUserId,
    SAMPLE_WORKFLOW_CAPABILITY_NAME,
    CapabilityType.WORKFLOW,
  );

  if (!shouldSeedSampleWorkflow({ capabilities, archivedSampleExists })) {
    return null;
  }

  // 069 requires published_capabilities.project_id on every INSERT.
  const projects = await listUserProjectsForOwner(ownerUserId);
  const projectId = resolveSaveToProjectDefault({ projects });
  if (projectId.length === 0) {
    return null;
  }

  const created = await createPublishedCapability({
    ownerUserId,
    projectId,
    name: SAMPLE_WORKFLOW_CAPABILITY_NAME,
    description: SAMPLE_WORKFLOW_DESCRIPTION,
    exampleRequest: SAMPLE_WORKFLOW_EXAMPLE_REQUEST,
    type: CapabilityType.WORKFLOW,
    workflowFields: SAMPLE_WORKFLOW_FIELDS,
  });
  const published = await publishCapabilityVersion(
    created.capability.id,
    ownerUserId,
    "Sample workflow",
    created.componentId,
  );
  const capability = published?.capability ?? created.capability;
  const componentId = published?.componentId ?? created.componentId;

  const bound = await bindPublishedCapabilityToProjectOrCompensate({
    ownerUserId,
    projectId,
    capabilityId: capability.id,
    componentId,
    capabilityVersionId: published?.capabilityVersionId ?? null,
    componentVersionId: published?.componentVersionId ?? null,
    capabilityType: CapabilityType.WORKFLOW,
    harnessSetSlug: null,
  });
  if (!bound.ok) {
    throw new Error(`sample_seed_project_bind_failed: ${bound.error}`);
  }

  return capability;
};

export default ensureSampleWorkflowCapability;
