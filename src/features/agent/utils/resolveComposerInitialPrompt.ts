import type LibraryPlaybookTemplate from "@/lib/library/types/LibraryPlaybookTemplate.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

export const resolveComposerInitialPrompt = (
  rerunPrompt: string,
  libraryPlaybook: LibraryPlaybookTemplate | null,
): string => {
  if (rerunPrompt.length > 0) {
    return rerunPrompt;
  }

  return libraryPlaybook?.type === CapabilityType.AGENT
    ? libraryPlaybook.exampleRequest
    : "";
};
