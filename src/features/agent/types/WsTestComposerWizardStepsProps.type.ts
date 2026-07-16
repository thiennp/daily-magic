import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export interface WsTestComposerWizardStepsProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly isWriterAgentLocked: boolean;
  readonly isMacDeviceLocked: boolean;
  readonly macDispatchDeviceId: string;
  readonly showMacPicker: boolean;
  readonly isSteppedComposer: boolean;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
  readonly onDeviceChange: (deviceId: string) => void;
  readonly onPickerSelect: (item: SendTaskComposerPickerItem) => void;
  readonly onWriterAgentSelect: (writerAgent: HarnessWriterAgent) => void;
  readonly onMacStepBack: () => void;
  readonly onWorkflowStepBack: () => void;
  readonly onWriterStepBack: () => void;
  readonly onDeviceDeleted?: (deviceId: string) => void | Promise<void>;
}
