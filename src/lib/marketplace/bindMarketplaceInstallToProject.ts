import bindPublishedCapabilityToProject from "@/lib/capabilities/bindPublishedCapabilityToProject";
import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import resolveProjectDeviceForCapabilityBind from "@/lib/marketplace/resolveProjectDeviceForCapabilityBind";

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
  const opened = await resolveProjectDeviceForCapabilityBind({
    ownerUserId: input.ownerUserId,
    projectId: input.projectId,
    deviceId: input.deviceId,
    otherMacErrorMessage:
      "This project is bound to another Mac. Pick that Mac or choose a different project.",
  });
  if (!opened.ok) {
    return opened;
  }

  const bound = await bindPublishedCapabilityToProject({
    ownerUserId: input.ownerUserId,
    projectId: input.projectId,
    libraryCapabilityId: input.libraryCapabilityId,
    capabilityType: input.capabilityType,
    harnessSetSlug: input.harness.slug,
    harnessSetName: input.harness.name,
  });

  if (!bound.ok) {
    return { ok: false, errorMessage: bound.error };
  }

  return {
    ok: true,
    boundCapability: true,
    boundHarness: true,
  };
};

export default bindMarketplaceInstallToProject;
