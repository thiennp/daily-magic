import resolveComponentIdForPublishedCapability from "@/lib/components/resolveComponentIdForPublishedCapability";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import ensureHarnessComponentForOwner from "@/lib/projects/ensureHarnessComponentForOwner";
import resolveLatestComponentVersionId from "@/lib/projects/resolveLatestComponentVersionId";
import upsertProjectComponentBinding from "@/lib/projects/upsertProjectComponentBinding";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { updateUserProject } from "@/lib/projects/userProjectMutations";

export type BindPublishedCapabilityHarnessToProjectResult =
  { readonly ok: true } | { readonly ok: false; readonly errorMessage: string };

const bindPublishedCapabilityHarnessToProject = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
  readonly deviceId: string;
  readonly libraryCapabilityId: string;
  readonly capabilityType: string;
  readonly harnessSetSlug: string;
  readonly harnessSetName?: string | null;
}): Promise<BindPublishedCapabilityHarnessToProjectResult> => {
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
      errorMessage: "This project is bound to another Mac.",
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
      errorMessage: "Could not link this listing to the project.",
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

  const slug = input.harnessSetSlug.trim();
  if (slug.length > 0) {
    const harnessComponentId = await ensureHarnessComponentForOwner({
      ownerUserId: input.ownerUserId,
      setSlug: slug,
      setName: input.harnessSetName ?? slug,
    });
    const harnessVersionId =
      await resolveLatestComponentVersionId(harnessComponentId);

    await upsertProjectComponentBinding({
      projectId: input.projectId,
      componentId: harnessComponentId,
      kind: "harness",
      pinnedVersionId: harnessVersionId,
    });
  }

  return { ok: true };
};

export default bindPublishedCapabilityHarnessToProject;
