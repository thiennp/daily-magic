import { buildLibraryCapabilitySelectionUpdate } from "@/features/agent/utils/buildLibraryCapabilitySelectionUpdate";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

/**
 * Choosing a workflow or custom task (the step before the LLM CLI) must keep
 * the project the user already picked. Writing Default here overrides the
 * projectId stored on the composer URL.
 */
export const applyComposerLibraryCapabilitySelection = (input: {
  readonly capabilityId: string;
  readonly selectedProjectId: string;
  readonly libraryCapabilities: readonly PublishedCapabilityRecord[];
  readonly rerunPrompt: string;
  readonly urlCapabilityId: string;
  readonly setSelectedLibraryCapabilityId: (capabilityId: string) => void;
  readonly setSelectedProjectId: (projectId: string) => void;
  readonly setPrompt: (prompt: string) => void;
  readonly clearWorkflowFields: () => void;
}): void => {
  input.setSelectedLibraryCapabilityId(input.capabilityId);
  input.setSelectedProjectId(input.selectedProjectId);
  const { nextPrompt } = buildLibraryCapabilitySelectionUpdate({
    capabilityId: input.capabilityId,
    libraryCapabilities: input.libraryCapabilities,
    rerunPrompt: input.rerunPrompt,
    urlCapabilityId: input.urlCapabilityId,
    fallbackPrompt: "",
  });
  input.setPrompt(nextPrompt);
  input.clearWorkflowFields();
};
