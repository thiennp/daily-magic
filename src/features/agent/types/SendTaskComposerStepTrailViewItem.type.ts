import type { SendTaskComposerStepTrailItem } from "@/features/agent/utils/resolveSendTaskComposerStepTrail";

export type SendTaskComposerStepTrailViewItem =
  SendTaskComposerStepTrailItem & {
    readonly onBack: () => void;
  };
