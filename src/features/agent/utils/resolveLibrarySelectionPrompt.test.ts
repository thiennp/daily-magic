import { describe, expect, it } from "vitest";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { resolveLibrarySelectionPrompt } from "@/features/agent/utils/resolveLibrarySelectionPrompt";

const agentCapability = {
  id: "cap-agent",
  type: CapabilityType.AGENT,
  exampleRequest: "Summarize the week.",
} as PublishedCapabilityRecord;

const workflowCapability = {
  id: "cap-workflow",
  type: CapabilityType.WORKFLOW,
  exampleRequest: "ignored",
} as PublishedCapabilityRecord;

describe("resolveLibrarySelectionPrompt", () => {
  it("returns fallback prompt for custom tasks", () => {
    expect(
      resolveLibrarySelectionPrompt({
        capability: undefined,
        rerunPrompt: "",
        urlCapabilityId: "",
        selectedCapabilityId: "",
        fallbackPrompt: "Draft prompt",
      }),
    ).toBe("Draft prompt");
  });

  it("uses rerun prompt when reopening the same library item", () => {
    expect(
      resolveLibrarySelectionPrompt({
        capability: agentCapability,
        rerunPrompt: "Run again with edits",
        urlCapabilityId: "cap-agent",
        selectedCapabilityId: "cap-agent",
        fallbackPrompt: "",
      }),
    ).toBe("Run again with edits");
  });

  it("uses agent example request for saved agents", () => {
    expect(
      resolveLibrarySelectionPrompt({
        capability: agentCapability,
        rerunPrompt: "",
        urlCapabilityId: "",
        selectedCapabilityId: "cap-agent",
        fallbackPrompt: "",
      }),
    ).toBe("Summarize the week.");
  });

  it("clears prompt for workflows so fields drive the task", () => {
    expect(
      resolveLibrarySelectionPrompt({
        capability: workflowCapability,
        rerunPrompt: "",
        urlCapabilityId: "",
        selectedCapabilityId: "cap-workflow",
        fallbackPrompt: "Draft prompt",
      }),
    ).toBe("");
  });
});
