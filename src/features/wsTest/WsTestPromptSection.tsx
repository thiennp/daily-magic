"use client";

import TeamDispatchFields from "@/features/dispatch/TeamDispatchFields";
import type { WsTestConnectionStatus } from "@/features/wsTest/types/WsTestConnectionStatus.type";

interface WsTestPromptSectionProps {
  readonly prompt: string;
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly isTeamDispatch: boolean;
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly onGroupChange: (groupId: string) => void;
  readonly onTargetChange: (userId: string) => void;
  readonly onPromptChange: (value: string) => void;
  readonly onSend: () => void;
  readonly onClear: () => void;
}

export default function WsTestPromptSection({
  prompt,
  connectionStatus,
  isSendDisabled,
  isTeamDispatch,
  selectedGroupId,
  selectedTargetUserId,
  onGroupChange,
  onTargetChange,
  onPromptChange,
  onSend,
  onClear,
}: WsTestPromptSectionProps) {
  return (
    <>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
          Dispatch target
        </h2>
        <div className="mt-4">
          <TeamDispatchFields
            selectedGroupId={selectedGroupId}
            selectedTargetUserId={selectedTargetUserId}
            onGroupChange={onGroupChange}
            onTargetChange={onTargetChange}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <label
          htmlFor="agent-witch-prompt"
          className="mb-2 block text-sm font-medium text-gray-800 dark:text-white/90"
        >
          Task for Claude CLI
        </label>
        <textarea
          id="agent-witch-prompt"
          value={prompt}
          onChange={(event) => {
            onPromptChange(event.target.value);
          }}
          rows={8}
          placeholder="Describe what Claude should do on the local machine…"
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onSend}
            disabled={isSendDisabled}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isTeamDispatch ? "Dispatch to teammate" : "Send to local agent"}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            Clear
          </button>
        </div>
        {isSendDisabled ? (
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {connectionStatus !== "connected"
              ? "Connect and pair your local agent from Home before sending a task."
              : "Enter a task description to continue."}
          </p>
        ) : null}
      </section>
    </>
  );
}
