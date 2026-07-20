"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import type { useWsTestComposerPanelActions } from "@/features/agent/hooks/useWsTestComposerPanelActions";
import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";
import WsTestComposerWizardSteps from "@/features/agent/WsTestComposerWizardSteps";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestPromptComposerPanelProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly isWriterAgentLocked: boolean;
  readonly isMacDeviceLocked: boolean;
  readonly macDispatchDeviceId: string;
  readonly showMacPicker: boolean;
  readonly isSteppedComposer: boolean;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly panelActions: ReturnType<typeof useWsTestComposerPanelActions>;
  readonly stepTrail: readonly SendTaskComposerStepTrailViewItem[];
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
  readonly onStartWriterAgent: (writerAgent: HarnessWriterAgent) => void;
  readonly onDeviceDeleted?: (deviceId: string) => void | Promise<void>;
}

export default function WsTestPromptComposerPanel(
  props: WsTestPromptComposerPanelProps,
) {
  const wizardSteps = (
    <WsTestComposerWizardSteps
      composer={props.composer}
      wizard={props.wizard}
      writerAgent={props.writerAgent}
      onWriterAgentChange={props.onWriterAgentChange}
      isWriterAgentLocked={props.isWriterAgentLocked}
      isMacDeviceLocked={props.isMacDeviceLocked}
      macDispatchDeviceId={props.macDispatchDeviceId}
      isSteppedComposer={props.isSteppedComposer}
      connectionStatus={props.connectionStatus}
      isSendDisabled={props.isSendDisabled}
      onSend={props.onSend}
      onClear={props.onClear}
      onQueue={props.onQueue}
      onDeviceChange={props.panelActions.handleDeviceChange}
      onPickerSelect={props.panelActions.handlePickerSelect}
      onProjectSelect={props.panelActions.handleProjectSelect}
      onWriterAgentSelect={props.panelActions.handleWriterAgentSelect}
      stepTrail={props.stepTrail}
      onDeviceDeleted={props.onDeviceDeleted}
    />
  );

  if (props.isSteppedComposer) {
    return wizardSteps;
  }

  return <AppPanel>{wizardSteps}</AppPanel>;
}
