import bindPublishedCapabilityToProject from "@/lib/capabilities/bindPublishedCapabilityToProject";
import resolveProjectDeviceForCapabilityBind from "@/lib/marketplace/resolveProjectDeviceForCapabilityBind";

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
  const opened = await resolveProjectDeviceForCapabilityBind({
    ownerUserId: input.ownerUserId,
    projectId: input.projectId,
    deviceId: input.deviceId,
    otherMacErrorMessage: "This project is bound to another Mac.",
  });
  if (!opened.ok) {
    return opened;
  }

  const bound = await bindPublishedCapabilityToProject({
    ownerUserId: input.ownerUserId,
    projectId: input.projectId,
    libraryCapabilityId: input.libraryCapabilityId,
    capabilityType: input.capabilityType,
    harnessSetSlug: input.harnessSetSlug,
    harnessSetName: input.harnessSetName,
  });

  if (!bound.ok) {
    return { ok: false, errorMessage: bound.error };
  }

  return { ok: true };
};

export default bindPublishedCapabilityHarnessToProject;
