import { saveCapabilityTemplateToLibrary } from "@/features/capabilities/public-api/presentation";
import { forkCapabilityToLibrary } from "@/features/harness/public-api/presentation";
import { parsePresetMarketplaceTemplateId } from "@/lib/marketplace/presetMarketplaceCapabilityId";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

export type SaveCapabilityToLibraryRunResult = {
  readonly status: "saved" | "error";
  readonly message: string;
  readonly savedName: string | null;
};

export const runSaveCapabilityToLibrary = async (input: {
  readonly capabilityId: string;
  readonly isOfficialPreset: boolean;
  readonly projectId: string;
}): Promise<SaveCapabilityToLibraryRunResult> => {
  if (input.isOfficialPreset) {
    const templateId = parsePresetMarketplaceTemplateId(input.capabilityId);

    if (templateId === null) {
      return {
        status: "error",
        message: "Could not save this starter.",
        savedName: null,
      };
    }

    const result = await saveCapabilityTemplateToLibrary(
      templateId,
      input.projectId,
    );

    if (!result.ok) {
      return {
        status: "error",
        message: result.errorMessage ?? "Could not save this starter.",
        savedName: null,
      };
    }

    return {
      status: "saved",
      savedName: null,
      message: result.harnessInstalled
        ? MAC_WORKER_BENEFIT_COPY.savedInstallRequested
        : (result.harnessInstallMessage ??
          MAC_WORKER_BENEFIT_COPY.savedSetupMacForRules),
    };
  }

  const result = await forkCapabilityToLibrary(
    input.capabilityId,
    input.projectId,
  );

  if (!result.ok) {
    return {
      status: "error",
      message: result.errorMessage,
      savedName: null,
    };
  }

  return {
    status: "saved",
    savedName: result.capability.name,
    message:
      "Saved as a private draft. Edit it under Home → What teammates can request.",
  };
};
