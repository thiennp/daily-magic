import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import resolveComponentIdForPublishedCapability from "@/lib/components/resolveComponentIdForPublishedCapability";
import ensureHarnessComponentForOwner from "@/lib/projects/ensureHarnessComponentForOwner";
import resolveLatestComponentVersionId from "@/lib/projects/resolveLatestComponentVersionId";
import upsertProjectComponentBinding from "@/lib/projects/upsertProjectComponentBinding";

export type BindPublishedCapabilityToProjectResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly error: string };

/** Link a library capability (and optional harness) to a project via project_components. */
const bindPublishedCapabilityToProject = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
  readonly libraryCapabilityId: string;
  readonly capabilityType: string;
  readonly harnessSetSlug: string | null;
  readonly harnessSetName?: string | null;
}): Promise<BindPublishedCapabilityToProjectResult> => {
  const componentId = await resolveComponentIdForPublishedCapability(
    input.libraryCapabilityId,
  );

  if (componentId === null) {
    return {
      ok: false,
      error: "Could not link this item to the project.",
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

  const slug = input.harnessSetSlug?.trim() ?? "";
  if (slug.length === 0) {
    return { ok: true };
  }

  const harnessComponentId = await ensureHarnessComponentForOwner({
    ownerUserId: input.ownerUserId,
    setSlug: slug,
    setName: input.harnessSetName?.trim() || slug,
  });
  const harnessVersionId =
    await resolveLatestComponentVersionId(harnessComponentId);

  await upsertProjectComponentBinding({
    projectId: input.projectId,
    componentId: harnessComponentId,
    kind: "harness",
    pinnedVersionId: harnessVersionId,
  });

  return { ok: true };
};

export default bindPublishedCapabilityToProject;
