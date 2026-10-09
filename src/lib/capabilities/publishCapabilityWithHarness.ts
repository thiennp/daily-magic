import bindPublishedCapabilityToProjectOrCompensate from "@/lib/capabilities/bindPublishedCapabilityToProjectOrCompensate";
import buildPlaybookHarnessSetSlug from "@/lib/capabilities/buildPlaybookHarnessSetSlug";
import { createPublishedCapability } from "@/lib/capabilities/createPublishedCapability";
import mapHarnessItemsToTemplateHarness from "@/lib/capabilities/mapHarnessItemsToTemplateHarness";
import type { ParsedCapabilityBody } from "@/lib/capabilities/parseCapabilityBody";
import type { ParsedCapabilityHarnessItem } from "@/lib/capabilities/parseCapabilityHarnessItems";
import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import requestCapabilityTemplateHarnessInstall from "@/lib/capabilities/requestCapabilityTemplateHarnessInstall";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { partitionHarnessItemsByAudience } from "@/lib/harness/partitionHarnessItemsByAudience";
import { requireOwnerProjectIdForCreate } from "@/lib/projects/requireProjectIdForCreate";

export type PublishCapabilityWithHarnessResult =
  | {
      readonly ok: true;
      readonly capability: PublishedCapabilityRecord;
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

const publishCapabilityWithHarness = async (
  ownerUserId: string,
  parsed: ParsedCapabilityBody,
  harnessItems: readonly ParsedCapabilityHarnessItem[],
  projectId: string,
): Promise<PublishCapabilityWithHarnessResult> => {
  const project = await requireOwnerProjectIdForCreate({
    actorUserId: ownerUserId,
    projectId,
  });
  if (!project.ok) {
    return project;
  }

  const { agentItems, operatorSteps } =
    partitionHarnessItemsByAudience(harnessItems);
  const harnessSetSlug =
    agentItems.length > 0 ? buildPlaybookHarnessSetSlug(parsed.name) : null;

  const created = await createPublishedCapability({
    ownerUserId,
    projectId: project.projectId,
    name: parsed.name,
    description: parsed.description,
    exampleRequest: parsed.exampleRequest,
    visibility: parsed.visibility,
    groupId: parsed.groupId,
    type: parsed.type,
    workflowFields: parsed.workflowFields,
    workflowOutputFields: parsed.workflowOutputFields,
    operatorSteps,
    harnessSetSlug,
  });
  const published = await publishCapabilityVersion(
    created.capability.id,
    ownerUserId,
    "Initial publish",
    created.componentId,
  );
  const capability = published?.capability ?? created.capability;
  const componentId = published?.componentId ?? created.componentId;

  const bound = await bindPublishedCapabilityToProjectOrCompensate({
    ownerUserId,
    projectId: project.projectId,
    capabilityId: capability.id,
    componentId,
    capabilityVersionId: published?.capabilityVersionId ?? null,
    componentVersionId: published?.componentVersionId ?? null,
    capabilityType: parsed.type,
    harnessSetSlug,
  });
  if (!bound.ok) {
    return {
      ok: false,
      status: 400,
      code: "project_bind_failed",
      error: bound.error,
    };
  }

  if (harnessSetSlug === null || agentItems.length === 0) {
    return {
      ok: true,
      capability,
      harnessInstalled: false,
      harnessInstallMessage: null,
      projectId: project.projectId,
    };
  }

  const harness = mapHarnessItemsToTemplateHarness(
    parsed.name,
    harnessSetSlug,
    agentItems,
  );
  const harnessInstall = await requestCapabilityTemplateHarnessInstall(
    ownerUserId,
    harness,
  );

  return {
    ok: true,
    capability,
    harnessInstalled: harnessInstall.installed,
    harnessInstallMessage: harnessInstall.errorMessage,
    projectId: project.projectId,
  };
};

export default publishCapabilityWithHarness;
