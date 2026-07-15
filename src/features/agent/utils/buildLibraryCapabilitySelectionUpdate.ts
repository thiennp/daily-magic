import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { resolveLibrarySelectionPrompt } from "@/features/agent/utils/resolveLibrarySelectionPrompt";

export const buildLibraryCapabilitySelectionUpdate = (input: {
  readonly capabilityId: string;
  readonly libraryCapabilities: readonly PublishedCapabilityRecord[];
  readonly rerunPrompt: string;
  readonly urlCapabilityId: string;
  readonly fallbackPrompt: string;
}): {
  readonly nextPrompt: string;
} => {
  const capability = input.libraryCapabilities.find(
    (entry) => entry.id === input.capabilityId,
  );

  return {
    nextPrompt: resolveLibrarySelectionPrompt({
      capability,
      rerunPrompt: input.rerunPrompt,
      urlCapabilityId: input.urlCapabilityId,
      selectedCapabilityId: input.capabilityId,
      fallbackPrompt: input.fallbackPrompt,
    }),
  };
};
