import { describe, expect, it } from "vitest";

import {
  resolveSendTaskComposerStepTrailItems,
  resolveSendTaskComposerWorkflowSelectionLabel,
} from "@/features/agent/utils/resolveSendTaskComposerStepTrail";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

describe("resolveSendTaskComposerWorkflowSelectionLabel", () => {
  it("returns Custom task when no library capability is selected", () => {
    expect(resolveSendTaskComposerWorkflowSelectionLabel("", [])).toBe(
      "Custom task",
    );
  });

  it("returns Continue conversation when resuming history", () => {
    expect(resolveSendTaskComposerWorkflowSelectionLabel("", [], true)).toBe(
      "Continue conversation",
    );
  });

  it("returns the selected capability name", () => {
    expect(
      resolveSendTaskComposerWorkflowSelectionLabel("workflow-1", [
        {
          id: "workflow-1",
          name: "Research brief",
          type: CapabilityType.WORKFLOW,
        } as never,
      ]),
    ).toBe("Research brief");
  });
});

describe("resolveSendTaskComposerStepTrailItems", () => {
  const baseInput = {
    showMacTrail: true,
    macDeviceName: "Office Mac",
    showWorkflowTrail: true,
    workflowSelectionLabel: "Research brief",
    showProjectTrail: true,
    projectSelectionLabel: "daily-magic",
    showWriterTrail: true,
    writerAgent: "cursor" as const,
  };

  it("AGENT-045: shows mac and project on the picker step", () => {
    expect(
      resolveSendTaskComposerStepTrailItems({
        ...baseInput,
        currentStep: "picker",
      }).map((item) => item.id),
    ).toEqual(["mac", "project"]);
  });

  it("AGENT-045: shows only mac on the project step", () => {
    expect(
      resolveSendTaskComposerStepTrailItems({
        ...baseInput,
        currentStep: "project",
      }).map((item) => item.id),
    ).toEqual(["mac"]);
  });

  it("AGENT-045: orders project before workflow on the writer step", () => {
    expect(
      resolveSendTaskComposerStepTrailItems({
        ...baseInput,
        currentStep: "writer",
      }).map((item) => item.id),
    ).toEqual(["mac", "project", "workflow"]);
  });

  it("AGENT-045: orders project before workflow on the form step", () => {
    expect(
      resolveSendTaskComposerStepTrailItems({
        ...baseInput,
        currentStep: "form",
      }).map((item) => item.id),
    ).toEqual(["mac", "project", "workflow", "writer"]);
  });

  it("shows all prior selections on the live session step", () => {
    expect(
      resolveSendTaskComposerStepTrailItems({
        ...baseInput,
        currentStep: "session",
      }).map((item) => item.id),
    ).toEqual(["mac", "project", "workflow", "writer"]);
  });
});
