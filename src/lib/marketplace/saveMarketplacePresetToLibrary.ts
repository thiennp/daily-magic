import createCapabilityFromTemplate from "@/lib/capabilities/createCapabilityFromTemplate";
import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export type SaveMarketplacePresetToLibraryResult =
  | {
      readonly ok: true;
      readonly libraryCapabilityId: string;
      readonly harness: CapabilityTemplateHarness;
    }
  | { readonly ok: false; readonly errorMessage: string };

export const saveMarketplacePresetToLibrary = async (input: {
  readonly actorUserId: string;
  readonly templateId: string;
}): Promise<SaveMarketplacePresetToLibraryResult> => {
  try {
    const result = await createCapabilityFromTemplate(
      input.actorUserId,
      input.templateId,
      undefined,
      { deferHarnessInstall: true },
    );

    if (result === null) {
      return { ok: false, errorMessage: "Could not save this starter." };
    }

    return {
      ok: true,
      libraryCapabilityId: result.capability.id,
      harness: result.harness,
    };
  } catch (error) {
    console.error("[marketplace/preset] library save failed", error);
    return {
      ok: false,
      errorMessage:
        "Could not save this starter. If it is already in your Library, try Install again.",
    };
  }
};
