"use client";

import { useRouter } from "next/navigation";

import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import {
  clearComposerProjectSelection,
  selectComposerProject,
} from "@/features/agent/utils/composerProjectSelectionActions";
import { createWsTestComposerPickerSelectHandler } from "@/features/agent/utils/createWsTestComposerPickerSelectHandler";
import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import { shouldStartWriterAgentOnCliSelect } from "@/features/agent/utils/shouldStartWriterAgentOnCliSelect";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
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
  readonly handleProjectSelect: (project: UserProjectRecord) => void;
  readonly handleWriterAgentSelect: (writerAgent: HarnessWriterAgent) => void;
  readonly handleMacStepBack: () => void;
  readonly handleWorkflowStepBack: () => void;
  readonly handleProjectStepBack: () => void;
  readonly handleWriterStepBack: () => void;
} => {
  const router = useRouter();
  const replaceHref = (href: string) => {
    router.replace(href, { scroll: false });
  };

  return {
    handleDeviceChange: (deviceId) => {
      input.composer.setSelectedDeviceId(deviceId);

      if (
        !input.wizard.shouldSkipMacSelectionStep() &&
        !input.wizard.hasCompletedMacSelectionStep
      ) {
        input.wizard.completeMacSelectionStep();
      }
    },
    handlePickerSelect: createWsTestComposerPickerSelectHandler({
      ...input,
      replaceHref,
    }),
    handleProjectSelect: (project) => {
      selectComposerProject({ ...input, project, replaceHref });
    },
    handleWriterAgentSelect: (writerAgent) => {
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
    },
    handleMacStepBack: () => {
      input.wizard.resetMacSelectionStep();
    },
    handleWorkflowStepBack: () => {
      input.composer.clearSelectedProject();
      input.composer.setSelectedLibraryCapabilityId("");
      replaceHref(buildAgentComposerHref({}));
      input.wizard.resetPickerStep();
    },
    handleProjectStepBack: () => {
      clearComposerProjectSelection({
        ...input,
        libraryCapabilityId:
          input.composer.selectedLibraryCapabilityId || undefined,
        replaceHref,
      });
    },
    handleWriterStepBack: () => {
      input.wizard.resetWriterAgentStep();
    },
  };
};
