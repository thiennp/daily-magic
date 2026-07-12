"use client";

import TeamDispatchFields from "@/features/dispatch/TeamDispatchFields";
import WsTestComposerActions from "@/features/wsTest/WsTestComposerActions";
import type { useWsTestTaskComposer } from "@/features/wsTest/hooks/useWsTestTaskComposer";
import WsTestTaskInputsSection from "@/features/wsTest/WsTestTaskInputsSection";
import type { WsTestConnectionStatus } from "@/features/wsTest/types/WsTestConnectionStatus.type";

interface WsTestPromptSectionProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly canQueue: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
}

export default function WsTestPromptSection({
  composer,
  connectionStatus,
  isSendDisabled,
  canQueue,
  onSend,
  onClear,
  onQueue,
}: WsTestPromptSectionProps) {
  const canCopyPrompt =
    composer.resolvedPrompt.trim().length > 0 &&
    composer.workflowValidationErrors.length === 0;

  return (
    <>
      {!composer.isLibraryPlaybook ? (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
            Who receives this task
          </h2>
          <div className="mt-4">
            <TeamDispatchFields
              selectedGroupId={composer.selectedGroupId}
              selectedTargetUserId={composer.selectedTargetUserId}
              selectedCapabilityId={composer.selectedCapabilityId}
              onGroupChange={composer.setSelectedGroupId}
              onTargetChange={composer.setSelectedTargetUserId}
              onCapabilityChange={composer.setSelectedCapabilityId}
            />
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-brand-200 bg-brand-50/40 p-4 dark:border-brand-900/40 dark:bg-brand-950/20">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Running a playbook from your library on your Mac.
          </p>
        </section>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
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
        <WsTestComposerActions
          connectionStatus={connectionStatus}
          isSendDisabled={isSendDisabled}
          canCopyPrompt={canCopyPrompt}
          canQueue={canQueue}
          copyText={composer.resolvedPrompt}
          sendLabel={
            composer.isTeamDispatch ? "Send to teammate" : "Send to my Mac"
          }
          isWorkflowTask={composer.isWorkflowTask}
          onSend={onSend}
          onClear={onClear}
          onQueue={onQueue}
        />
      </section>
    </>
  );
}
