import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { HARNESS_WRITER_LABELS } from "@/features/harness/constants/harnessFormOptions";

export type SendTaskComposerWizardStepId =
  "picker" | "writer" | "form" | "session";

export type SendTaskComposerStepTrailItemId = "mac" | "workflow" | "writer";

export type SendTaskComposerStepTrailItem = {
  readonly id: SendTaskComposerStepTrailItemId;
  readonly caption: string;
  readonly value: string;
};

export const resolveSendTaskComposerWorkflowSelectionLabel = (
  selectedLibraryCapabilityId: string,
  capabilities: readonly PublishedCapabilityRecord[],
  isContinueSession = false,
): string => {
  if (isContinueSession) {
    return "Continue conversation";
  }

  if (selectedLibraryCapabilityId.length === 0) {
    return "Custom task";
  }

  return (
    capabilities.find(
      (capability) => capability.id === selectedLibraryCapabilityId,
    )?.name ?? "Workflow"
  );
};

export const resolveSendTaskComposerStepTrailItems = (input: {
  readonly currentStep: SendTaskComposerWizardStepId;
  readonly showMacTrail: boolean;
  readonly macDeviceName: string;
  readonly showWorkflowTrail: boolean;
  readonly workflowSelectionLabel: string;
  readonly showWriterTrail: boolean;
  readonly writerAgent: HarnessWriterAgent;
}): readonly SendTaskComposerStepTrailItem[] => {
  const items: SendTaskComposerStepTrailItem[] = [];

  if (input.showMacTrail) {
    items.push({
      id: "mac",
      caption: "Mac",
      value: input.macDeviceName,
    });
  }

  if (input.showWorkflowTrail && input.currentStep !== "picker") {
    items.push({
      id: "workflow",
      caption: "Workflow or agent",
      value: input.workflowSelectionLabel,
    });
  }

  if (
    input.showWriterTrail &&
    (input.currentStep === "form" || input.currentStep === "session")
  ) {
    items.push({
      id: "writer",
      caption: "LLM CLI",
      value: HARNESS_WRITER_LABELS[input.writerAgent],
    });
  }

  return items;
};
