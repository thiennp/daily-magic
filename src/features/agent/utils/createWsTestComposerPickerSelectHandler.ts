import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import { getAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import { buildAgentRunContinueHref } from "@/features/reports/utils/buildAgentRunContinueHref";
import { canContinueAgentRunOnStoredMac } from "@/features/reports/utils/canContinueAgentRunOnStoredMac";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export const createWsTestComposerPickerSelectHandler = (input: {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly replaceHref: (href: string) => void;
}) => {
  return (item: SendTaskComposerPickerItem) => {
    const selectedProjectId =
      input.composer.selectedProjectId.trim().length > 0
        ? input.composer.selectedProjectId.trim()
        : undefined;
    const selectedDeviceId =
      input.composer.selectedDeviceId.length > 0
        ? input.composer.selectedDeviceId
        : undefined;

    if (item.kind === "history") {
      if (!canContinueAgentRunOnStoredMac(item.deviceId)) {
        return;
      }

      if (item.writerAgent !== null) {
        input.onWriterAgentChange(item.writerAgent);
      }

      input.composer.setSelectedLibraryCapabilityId(item.capabilityId ?? "");
      const cachedRun = getAgentRunLocalCache(item.id);
      input.replaceHref(
        buildAgentRunContinueHref({
          run: cachedRun ?? {
            id: item.id,
            deviceId: item.deviceId,
            writerAgent: item.writerAgent ?? "cursor",
            capabilityId: item.capabilityId,
          },
        }),
      );
      input.wizard.completePickerStep();
      return;
    }

    // AGENT-045: keep the project chosen before workflow selection.
    if (item.kind === "library") {
      input.composer.setSelectedLibraryCapabilityId(item.id);
      input.replaceHref(
        buildAgentComposerHref({
          libraryCapabilityId: item.id,
          projectId: selectedProjectId,
          deviceId: selectedDeviceId,
        }),
      );
    } else {
      input.composer.setSelectedLibraryCapabilityId("");
      input.replaceHref(
        buildAgentComposerHref({
          customTask: true,
          projectId: selectedProjectId,
          deviceId: selectedDeviceId,
        }),
      );
    }

    input.wizard.completePickerStep();
  };
};
