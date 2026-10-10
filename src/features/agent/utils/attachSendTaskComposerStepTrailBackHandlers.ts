import type { SendTaskComposerStepTrailItem } from "@/features/agent/utils/resolveSendTaskComposerStepTrail";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/public-api/types";

export const attachSendTaskComposerStepTrailBackHandlers = (
  items: readonly SendTaskComposerStepTrailItem[],
  handlers: {
    readonly onMacStepBack: () => void;
    readonly onWorkflowStepBack: () => void;
    readonly onProjectStepBack: () => void;
    readonly onWriterStepBack: () => void;
  },
): readonly SendTaskComposerStepTrailViewItem[] =>
  items.map((item) => ({
    ...item,
    onBack:
      item.id === "mac"
        ? handlers.onMacStepBack
        : item.id === "workflow"
          ? handlers.onWorkflowStepBack
          : item.id === "project"
            ? handlers.onProjectStepBack
            : handlers.onWriterStepBack,
  }));
