import resolveComponentIdForPublishedCapability from "@/lib/components/resolveComponentIdForPublishedCapability";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import ensureHarnessComponentForOwner from "@/lib/projects/ensureHarnessComponentForOwner";
import resolveLatestComponentVersionId from "@/lib/projects/resolveLatestComponentVersionId";
import upsertProjectComponentBinding from "@/lib/projects/upsertProjectComponentBinding";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { updateUserProject } from "@/lib/projects/userProjectMutations";

export type BindMarketplaceInstallToProjectResult =
  | {
      readonly ok: true;
      readonly boundCapability: boolean;
      readonly boundHarness: boolean;
    }
  | { readonly ok: false; readonly errorMessage: string };

const bindMarketplaceInstallToProject = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
  readonly deviceId: string;
  readonly libraryCapabilityId: string;
  readonly capabilityType: string;
  readonly harness: CapabilityTemplateHarness;
}): Promise<BindMarketplaceInstallToProjectResult> => {
  const project = await getUserProjectById(input.projectId);

  if (project === null || project.ownerUserId !== input.ownerUserId) {
    return { ok: false, errorMessage: "Project not found." };
  }

  if (
    project.deviceId !== null &&
    project.deviceId.length > 0 &&
    project.deviceId !== input.deviceId
  ) {
    return {
      ok: false,
      errorMessage:
        "This project is bound to another Mac. Pick that Mac or choose a different project.",
    };
  }

  if (project.deviceId === null || project.deviceId.length === 0) {
    await updateUserProject(input.ownerUserId, input.projectId, {
      deviceId: input.deviceId,
    });
  }

  const componentId = await resolveComponentIdForPublishedCapability(
    input.libraryCapabilityId,
  );

  if (componentId === null) {
    return {
      ok: false,
      errorMessage:
        "Could not link this listing to the project (missing component).",
    };
  }

  const versionId = await resolveLatestComponentVersionId(componentId);
  const kind =
    input.capabilityType.toLowerCase() === CapabilityType.WORKFLOW
      ? "workflow"
      : "agent";

  await upsertProjectComponentBinding({
    projectId: input.projectId,
    componentId,
    kind,
    pinnedVersionId: versionId,
  });

  const harnessComponentId = await ensureHarnessComponentForOwner({
    ownerUserId: input.ownerUserId,
    setSlug: input.harness.slug,
    setName: input.harness.name,
  });
  const harnessVersionId =
    await resolveLatestComponentVersionId(harnessComponentId);

  await upsertProjectComponentBinding({
    projectId: input.projectId,
    componentId: harnessComponentId,
    kind: "harness",
    pinnedVersionId: harnessVersionId,
  });

  return {
    ok: true,
    boundCapability: true,
    boundHarness: true,
  };
};

export default bindMarketplaceInstallToProject;
