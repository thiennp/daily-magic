import bindPublishedCapabilityToProject from "@/lib/capabilities/bindPublishedCapabilityToProject";
import deletePublishedCapabilityAfterFailedBind from "@/lib/capabilities/deletePublishedCapabilityAfterFailedBind";

export type BindOrCompensateResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly error: string };

const bindPublishedCapabilityToProjectOrCompensate = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
  readonly capabilityId: string;
  readonly componentId: string;
  readonly capabilityVersionId: string | null;
  readonly componentVersionId: string | null;
  readonly capabilityType: string;
  readonly harnessSetSlug: string | null;
  readonly harnessSetName?: string | null;
}): Promise<BindOrCompensateResult> => {
  const undo = async (): Promise<void> => {
    try {
      await deletePublishedCapabilityAfterFailedBind({
        ownerUserId: input.ownerUserId,
        capabilityId: input.capabilityId,
        componentId: input.componentId,
        capabilityVersionId: input.capabilityVersionId,
        componentVersionId: input.componentVersionId,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "unknown";
      console.error(
        "[awc] compensate-delete after failed bind failed:",
        message,
      );
    }
  };

  try {
    const bound = await bindPublishedCapabilityToProject({
      ownerUserId: input.ownerUserId,
      projectId: input.projectId,
      libraryCapabilityId: input.capabilityId,
      capabilityType: input.capabilityType,
      harnessSetSlug: input.harnessSetSlug,
      harnessSetName: input.harnessSetName,
    });
    if (!bound.ok) {
      await undo();
      return { ok: false, error: bound.error };
    }
    return { ok: true };
  } catch (error: unknown) {
    await undo();
    const message =
      error instanceof Error ? error.message : "Could not link to project.";
    return { ok: false, error: message };
  }
};

export default bindPublishedCapabilityToProjectOrCompensate;
