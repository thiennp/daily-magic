"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";

import DelegatedWriterAgentField from "@/features/agent/DelegatedWriterAgentField";
import { useWsTestComposerDeferredSubmit } from "@/features/agent/hooks/useWsTestComposerDeferredSubmit";
import WsTestComposerFooter from "@/features/agent/WsTestComposerFooter";
import WsTestOperatorStepsSection from "@/features/agent/WsTestOperatorStepsSection";
import WsTestTaskInputsSection from "@/features/agent/WsTestTaskInputsSection";
import type WsTestComposerFormStepProps from "@/features/agent/types/WsTestComposerFormStepProps.type";
import { isComposerStartHotkey } from "@/features/agent/utils/isComposerStartHotkey";

export default function WsTestComposerFormStep(
  props: WsTestComposerFormStepProps,
) {
  const deferredSubmit = useWsTestComposerDeferredSubmit({
    composer: props.composer,
    enabled: props.isSteppedComposer,
    onSend: props.onSend,
    onClear: props.onClear,
  });
  const handleSend = props.isSteppedComposer
    ? deferredSubmit.handleSend
    : props.onSend;
  const handleClear = props.isSteppedComposer
    ? deferredSubmit.handleClear
    : props.onClear;
  const effectiveSendDisabled = props.isSteppedComposer
    ? deferredSubmit.isSendDisabled
    : props.isSendDisabled;

  const handleFormKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!isComposerStartHotkey(event) || effectiveSendDisabled) {
      return;
    }

    event.preventDefault();
    handleSend();
  };

  return (
    <div onKeyDown={handleFormKeyDown}>
      {!props.isSteppedComposer ? (
        <div className={props.showTopSpacing ? "mt-6" : undefined}>
          <DelegatedWriterAgentField
            writerAgent={props.writerAgent}
            onWriterAgentChange={props.onWriterAgentChange}
            disabled={props.isWriterAgentLocked}
          />
        </div>
      ) : null}
      <div className={props.isSteppedComposer ? undefined : "mt-6"}>
        <WsTestOperatorStepsSection
          operatorSteps={props.composer.operatorSteps}
        />
      </div>
      <div className="mt-6">
        <WsTestTaskInputsSection
          isWorkflowTask={props.composer.isWorkflowTask}
          useMobileStepper={
            props.composer.isLibraryPlaybook && props.composer.isWorkflowTask
          }
          prompt={props.composer.prompt}
          workflowFields={props.composer.composerWorkflowFields}
          workflowFieldValues={props.composer.workflowFieldValues}
          workflowFieldErrors={
            props.isSteppedComposer
              ? deferredSubmit.visibleWorkflowFieldErrors
              : props.composer.workflowFieldErrors
          }
          promptValidationError={
            props.isSteppedComposer
              ? deferredSubmit.promptValidationError
              : undefined
          }
          onPromptChange={props.composer.setPrompt}
          onWorkflowFieldChange={props.composer.onWorkflowFieldChange}
        />
      </div>
      <WsTestComposerFooter
        composer={props.composer}
        macDispatchDeviceId={props.macDispatchDeviceId}
        connectionStatus={props.connectionStatus}
        isSendDisabled={effectiveSendDisabled}
        sendLabel={
          props.isSteppedComposer ? deferredSubmit.sendLabel : undefined
        }
        onSend={handleSend}
        onClear={handleClear}
        onQueue={props.onQueue}
      />
    </div>
  );
}
