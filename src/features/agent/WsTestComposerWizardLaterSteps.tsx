"use client";

import SendTaskComposerPickerStep from "@/features/agent/SendTaskComposerPickerStep";
import SendTaskComposerProjectPickerStep from "@/features/agent/SendTaskComposerProjectPickerStep";
import SendTaskComposerStepTrail from "@/features/agent/SendTaskComposerStepTrail";
import SendTaskComposerWriterAgentStep from "@/features/agent/SendTaskComposerWriterAgentStep";
import WsTestComposerFormStepSection from "@/features/agent/WsTestComposerFormStepSection";
import type { SendTaskComposerStepTrailViewItem } from "@/features/agent/types/SendTaskComposerStepTrailViewItem.type";
import type { useWsTestComposerWizard } from "@/features/agent/hooks/useWsTestComposerWizard";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { SendTaskComposerPickerItem } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
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
  readonly onProjectSelect: (project: UserProjectRecord) => void;
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
  onProjectSelect,
  onWriterAgentSelect,
  stepTrail,
}: WsTestComposerWizardLaterStepsProps) {
  return (
    <>
      {wizard.showProjectStepOnly ? (
        <div className={wizard.showMacSection ? "mt-6" : undefined}>
          <SendTaskComposerStepTrail items={stepTrail} />
          <SendTaskComposerProjectPickerStep
            projects={composer.projects}
            isLoading={composer.isProjectsLoading}
            deviceId={macDispatchDeviceId}
            onSelect={onProjectSelect}
            onProjectCreated={composer.addSavedProject}
            onProjectDeleted={composer.removeSavedProject}
          />
        </div>
      ) : null}
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
        <WsTestComposerFormStepSection
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
          stepTrail={stepTrail}
        />
      ) : null}
    </>
  );
}
