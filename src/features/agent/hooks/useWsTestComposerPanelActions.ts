"use client";

import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const useWsTestComposerPanelActions = (input: {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly onStartWriterAgent: (writerAgent: HarnessWriterAgent) => void;
}): {
  readonly handleDeviceChange: (deviceId: string) => void;
  readonly handlePickerSelect: (item: SendTaskComposerPickerItem) => void;
} => {
  const handleDeviceChange = (deviceId: string) => {
    input.composer.setSelectedDeviceId(deviceId);

    if (
      !input.wizard.shouldSkipMacSelectionStep() &&
      !input.wizard.hasCompletedMacSelectionStep
    ) {
      input.wizard.completeMacSelectionStep();
    }
  };

  const handlePickerSelect = (item: SendTaskComposerPickerItem) => {
    if (item.kind === "writer-agent") {
      input.onWriterAgentChange(item.id);
      input.onStartWriterAgent(item.id);
      return;
    }

    if (item.kind === "library") {
      input.composer.setSelectedLibraryCapabilityId(item.id);
    } else {
      input.composer.setSelectedLibraryCapabilityId("");
    }

    input.wizard.completePickerStep();
  };

  return { handleDeviceChange, handlePickerSelect };
};
