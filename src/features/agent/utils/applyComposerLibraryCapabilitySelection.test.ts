import { describe, expect, it } from "vitest";

import { applyComposerLibraryCapabilitySelection } from "@/features/agent/utils/applyComposerLibraryCapabilitySelection";

describe("applyComposerLibraryCapabilitySelection", () => {
  it("AGENT-127: keeps the chosen project when a workflow is selected before the LLM CLI", () => {
    const projectIds: string[] = [];
    const capabilityIds: string[] = [];

    applyComposerLibraryCapabilitySelection({
      capabilityId: "workflow-1",
      selectedProjectId: "project-client-work",
      libraryCapabilities: [],
      rerunPrompt: "",
      urlCapabilityId: "",
      setSelectedLibraryCapabilityId: (capabilityId) => {
        capabilityIds.push(capabilityId);
      },
      setSelectedProjectId: (projectId) => {
        projectIds.push(projectId);
      },
      setPrompt: () => undefined,
      clearWorkflowFields: () => undefined,
    });

    expect(capabilityIds).toEqual(["workflow-1"]);
    expect(projectIds).toEqual(["project-client-work"]);
  });

  it("AGENT-127: keeps the chosen project for a custom task", () => {
    const projectIds: string[] = [];

    applyComposerLibraryCapabilitySelection({
      capabilityId: "",
      selectedProjectId: "project-client-work",
      libraryCapabilities: [],
      rerunPrompt: "",
      urlCapabilityId: "",
      setSelectedLibraryCapabilityId: () => undefined,
      setSelectedProjectId: (projectId) => {
        projectIds.push(projectId);
      },
      setPrompt: () => undefined,
      clearWorkflowFields: () => undefined,
    });

    expect(projectIds).toEqual(["project-client-work"]);
  });
});
