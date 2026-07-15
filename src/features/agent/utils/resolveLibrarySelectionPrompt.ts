import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export const resolveLibrarySelectionPrompt = (input: {
  readonly capability: PublishedCapabilityRecord | undefined;
  readonly rerunPrompt: string;
  readonly urlCapabilityId: string;
  readonly selectedCapabilityId: string;
  readonly fallbackPrompt: string;
}): string => {
  if (input.selectedCapabilityId.length === 0) {
    return input.fallbackPrompt;
  }

  if (
    input.rerunPrompt.length > 0 &&
    input.selectedCapabilityId === input.urlCapabilityId
  ) {
    return input.rerunPrompt;
  }

  if (input.capability?.type === CapabilityType.AGENT) {
    return input.capability.exampleRequest;
  }

  return "";
};
