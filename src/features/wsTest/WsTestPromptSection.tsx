"use client";

import TeamDispatchFields from "@/features/dispatch/TeamDispatchFields";
import type { useWsTestTaskComposer } from "@/features/wsTest/hooks/useWsTestTaskComposer";
import WsTestTaskInputsSection from "@/features/wsTest/WsTestTaskInputsSection";
import type { WsTestConnectionStatus } from "@/features/wsTest/types/WsTestConnectionStatus.type";

interface WsTestPromptSectionProps {
  readonly composer: ReturnType<typeof useWsTestTaskComposer>;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
}

export default function WsTestPromptSection({
  composer,
  connectionStatus,
  isSendDisabled,
  onSend,
  onClear,
}: WsTestPromptSectionProps) {
  return (
    <>
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

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <WsTestTaskInputsSection
          isWorkflowTask={composer.isWorkflowTask}
          prompt={composer.prompt}
          workflowFields={composer.workflowFields}
          workflowFieldValues={composer.workflowFieldValues}
          workflowValidationErrors={composer.workflowValidationErrors}
          onPromptChange={composer.setPrompt}
          onWorkflowFieldChange={composer.onWorkflowFieldChange}
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onSend}
            disabled={isSendDisabled}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {composer.isTeamDispatch ? "Send to teammate" : "Send to my Mac"}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            Clear
          </button>
        </div>
        {isSendDisabled &&
        composer.workflowValidationErrors.length === 0 &&
        !composer.isWorkflowTask ? (
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {connectionStatus !== "connected"
              ? "Connect your Mac from Home → Your setup before sending a task."
              : "Enter a task description to continue."}
          </p>
        ) : null}
      </section>
    </>
  );
}
