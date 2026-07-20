"use client";

import { useRouter } from "next/navigation";

import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import { shouldStartWriterAgentOnCliSelect } from "@/features/agent/utils/shouldStartWriterAgentOnCliSelect";
import { getAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import { buildAgentRunContinueHref } from "@/features/reports/utils/buildAgentRunContinueHref";
import { canContinueAgentRunOnStoredMac } from "@/features/reports/utils/canContinueAgentRunOnStoredMac";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export const useWsTestComposerPanelActions = (input: {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly onStartWriterAgent: (writerAgent: HarnessWriterAgent) => void;
}): {
  readonly handleDeviceChange: (deviceId: string) => void;
  readonly handlePickerSelect: (item: SendTaskComposerPickerItem) => void;
  readonly handleWriterAgentSelect: (writerAgent: HarnessWriterAgent) => void;
  readonly handleMacStepBack: () => void;
  readonly handleWorkflowStepBack: () => void;
  readonly handleWriterStepBack: () => void;
} => {
  const router = useRouter();

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
    if (item.kind === "history") {
      if (!canContinueAgentRunOnStoredMac(item.deviceId)) {
        return;
      }

      if (item.writerAgent !== null) {
        input.onWriterAgentChange(item.writerAgent);
      }

      input.composer.setSelectedLibraryCapabilityId(item.capabilityId ?? "");
      const cachedRun = getAgentRunLocalCache(item.id);
      router.replace(
        buildAgentRunContinueHref({
          run: cachedRun ?? {
            id: item.id,
            deviceId: item.deviceId,
            writerAgent: item.writerAgent ?? "cursor",
            capabilityId: item.capabilityId,
          },
        }),
        { scroll: false },
      );
      input.wizard.completePickerStep();
      return;
    }

    if (item.kind === "library") {
      input.composer.setSelectedLibraryCapabilityId(item.id);
      router.replace(buildAgentComposerHref({ libraryCapabilityId: item.id }), {
        scroll: false,
      });
    } else {
      input.composer.setSelectedLibraryCapabilityId("");
      router.replace(buildAgentComposerHref({ customTask: true }), {
        scroll: false,
      });
    }

    input.wizard.completePickerStep();
  };

  const handleWriterAgentSelect = (writerAgent: HarnessWriterAgent) => {
    input.onWriterAgentChange(writerAgent);

    if (
      shouldStartWriterAgentOnCliSelect(
        input.composer.selectedLibraryCapabilityId,
      )
    ) {
      input.onStartWriterAgent(writerAgent);
      return;
    }

    input.wizard.completeWriterAgentStep();
  };

  return {
    handleDeviceChange,
    handlePickerSelect,
    handleWriterAgentSelect,
    handleMacStepBack: () => {
      input.wizard.resetMacSelectionStep();
    },
    handleWorkflowStepBack: () => {
      input.composer.setSelectedLibraryCapabilityId("");
      router.replace(buildAgentComposerHref({}), { scroll: false });
      input.wizard.resetPickerStep();
    },
    handleWriterStepBack: () => {
      input.wizard.resetWriterAgentStep();
    },
  };
};
