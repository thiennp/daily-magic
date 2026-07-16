"use client";

import DelegatedWriterAgentField from "@/features/agent/DelegatedWriterAgentField";
import WsTestComposerFooter from "@/features/agent/WsTestComposerFooter";
import WsTestOperatorStepsSection from "@/features/agent/WsTestOperatorStepsSection";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import WsTestTaskInputsSection from "@/features/agent/WsTestTaskInputsSection";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface WsTestComposerFormStepProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
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
  readonly showTopSpacing: boolean;
}

export default function WsTestComposerFormStep({
  composer,
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
  showTopSpacing,
}: WsTestComposerFormStepProps) {
  return (
    <>
      {!isSteppedComposer ? (
        <div className={showTopSpacing ? "mt-6" : undefined}>
          <DelegatedWriterAgentField
            writerAgent={writerAgent}
            onWriterAgentChange={onWriterAgentChange}
            disabled={isWriterAgentLocked}
          />
        </div>
      ) : null}
      <div className={isSteppedComposer ? undefined : "mt-6"}>
        <WsTestOperatorStepsSection operatorSteps={composer.operatorSteps} />
      </div>
      <div className="mt-6">
        <WsTestTaskInputsSection
          isWorkflowTask={composer.isWorkflowTask}
          useMobileStepper={
            composer.isLibraryPlaybook && composer.isWorkflowTask
          }
          prompt={composer.prompt}
          workflowFields={composer.workflowFields}
          workflowFieldValues={composer.workflowFieldValues}
          workflowValidationErrors={composer.workflowValidationErrors}
          onPromptChange={composer.setPrompt}
          onWorkflowFieldChange={composer.onWorkflowFieldChange}
        />
      </div>
      <WsTestComposerFooter
        composer={composer}
        macDispatchDeviceId={macDispatchDeviceId}
        connectionStatus={connectionStatus}
        isSendDisabled={isSendDisabled}
        onSend={onSend}
        onClear={onClear}
        onQueue={onQueue}
      />
    </>
  );
}
