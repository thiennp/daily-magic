"use client";

import type { WsTestComposerWizardStepsProps } from "@/features/agent/types/WsTestComposerWizardStepsProps.type";
import WsTestComposerMacSection from "@/features/agent/WsTestComposerMacSection";
import WsTestComposerWizardLaterSteps from "@/features/agent/WsTestComposerWizardLaterSteps";

export default function WsTestComposerWizardSteps({
  composer,
  wizard,
  writerAgent,
  onWriterAgentChange,
  isWriterAgentLocked,
  isMacDeviceLocked,
  macDispatchDeviceId,
  isSteppedComposer,
  connectionStatus,
  isSendDisabled,
  onSend,
  onClear,
  onQueue,
  onDeviceChange,
  onPickerSelect,
  onWriterAgentSelect,
  onDeviceDeleted,
  stepTrail,
}: WsTestComposerWizardStepsProps) {
  return (
    <>
      {wizard.showMacSection ? (
        <WsTestComposerMacSection
          isLibraryPlaybook={composer.isLibraryPlaybook}
          useComposerButtonPicker={
            isSteppedComposer && wizard.showMacSelectionStepOnly
          }
          devices={composer.macDevices}
          displayNameById={composer.macDisplayNameById}
          selectedDeviceId={macDispatchDeviceId}
          isLoading={composer.isMacDevicesLoading}
          disabled={isMacDeviceLocked || composer.isOwnDeviceDispatch}
          onDeviceChange={onDeviceChange}
          onDeviceRenamed={composer.renameMacDevice}
          onDeviceDeleted={onDeviceDeleted}
        />
      ) : null}
      <WsTestComposerWizardLaterSteps
        composer={composer}
        wizard={wizard}
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
        onPickerSelect={onPickerSelect}
        onWriterAgentSelect={onWriterAgentSelect}
        stepTrail={stepTrail}
      />
    </>
  );
}
