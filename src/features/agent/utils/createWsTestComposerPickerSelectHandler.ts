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

    input.composer.clearSelectedProject();

    if (item.kind === "library") {
      input.composer.setSelectedLibraryCapabilityId(item.id);
      input.replaceHref(
        buildAgentComposerHref({ libraryCapabilityId: item.id }),
      );
    } else {
      input.composer.setSelectedLibraryCapabilityId("");
      input.replaceHref(buildAgentComposerHref({ customTask: true }));
    }

    input.wizard.completePickerStep();
  };
};
