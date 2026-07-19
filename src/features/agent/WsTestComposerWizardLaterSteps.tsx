"use client";

import SendTaskComposerPickerStep from "@/features/agent/SendTaskComposerPickerStep";
import SendTaskComposerStepTrail from "@/features/agent/SendTaskComposerStepTrail";
import SendTaskComposerWriterAgentStep from "@/features/agent/SendTaskComposerWriterAgentStep";
import WsTestComposerFormStep from "@/features/agent/WsTestComposerFormStep";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";
import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestComposerWizardLaterStepsProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly wizard: ReturnType<typeof useWsTestComposerWizard>;
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly isWriterAgentLocked: boolean;
  readonly isSteppedComposer: boolean;
  readonly macDispatchDeviceId: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
  readonly onPickerSelect: (item: SendTaskComposerPickerItem) => void;
  readonly onWriterAgentSelect: (writerAgent: HarnessWriterAgent) => void;
  readonly stepTrail: readonly SendTaskComposerStepTrailViewItem[];
}

export default function WsTestComposerWizardLaterSteps({
  composer,
  wizard,
  writerAgent,
  onWriterAgentChange,
  isWriterAgentLocked,
  isSteppedComposer,
  macDispatchDeviceId,
  connectionStatus,
  isSendDisabled,
  onSend,
  onClear,
  onQueue,
  onPickerSelect,
  onWriterAgentSelect,
  stepTrail,
}: WsTestComposerWizardLaterStepsProps) {
  return (
    <>
      {wizard.showPickerStepOnly ? (
        <div className={wizard.showMacSection ? "mt-6" : undefined}>
          <SendTaskComposerStepTrail items={stepTrail} />
          <SendTaskComposerPickerStep
            capabilities={composer.libraryCapabilities}
            isLoading={composer.isPrefillLoading}
            onSelect={onPickerSelect}
            removeLibraryCapability={composer.removeLibraryCapability}
          />
        </div>
      ) : null}
      {wizard.showWriterAgentStepOnly ? (
        <div>
          <SendTaskComposerStepTrail items={stepTrail} />
          <SendTaskComposerWriterAgentStep
            selectedWriterAgent={writerAgent}
            onSelect={onWriterAgentSelect}
          />
        </div>
      ) : null}
      {wizard.showFormStep ? (
        <div
          className={
            isSteppedComposer || wizard.showMacSection ? "mt-6" : undefined
          }
        >
          {isSteppedComposer ? (
            <SendTaskComposerStepTrail items={stepTrail} />
          ) : null}
          <WsTestComposerFormStep
            composer={composer}
            writerAgent={writerAgent}
            onWriterAgentChange={onWriterAgentChange}
            isWriterAgentLocked={isWriterAgentLocked}
            isSteppedComposer={isSteppedComposer}
            macDispatchDeviceId={macDispatchDeviceId}
            connectionStatus={connectionStatus}
            isSendDisabled={isSendDisabled}
            onSend={onSend}
            onClear={onClear}
            onQueue={onQueue}
            showTopSpacing={wizard.showMacSection}
          />
        </div>
      ) : null}
    </>
  );
}
