"use client";

import AgentLiveTerminalNextActions from "@/features/agent/AgentLiveTerminalNextActions";
import type { AgentLiveProgressStep } from "@/features/agent/utils/buildAgentLiveProgressSteps";

interface AgentLiveProgressFeedProps {
  readonly steps: readonly AgentLiveProgressStep[];
  readonly replyPreview: string | null;
  readonly isWorking: boolean;
  readonly nextActions?: readonly string[];
  readonly nextActionsDisabled?: boolean;
  readonly onSelectNextAction?: (action: string) => void;
}

const stepIconClass = (state: AgentLiveProgressStep["state"]): string => {
  if (state === "done") {
    return "border-emerald-500 bg-emerald-500 text-white";
  }
  if (state === "active") {
    return "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-200";
  }
  return "border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500";
};

export default function AgentLiveProgressFeed({
  steps,
  replyPreview,
  isWorking,
  nextActions = [],
  nextActionsDisabled = false,
  onSelectNextAction,
}: AgentLiveProgressFeedProps) {
  return (
    <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.02]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white/90">
          Progress on your Mac
        </h3>
        {isWorking ? (
          <span className="text-xs text-brand-700 dark:text-brand-300">
            In progress
          </span>
        ) : null}
      </div>
      <ol className="mt-4 space-y-3">
        {steps.map((step) => (
          <li key={step.id} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold ${stepIconClass(step.state)}`}
            >
              {step.state === "done" ? "✓" : step.state === "active" ? "●" : ""}
            </span>
            <div className="min-w-0 flex-1">
              <span
                className={
                  step.state === "pending"
                    ? "text-sm text-gray-400 dark:text-gray-500"
                    : "text-sm text-gray-800 dark:text-white/90"
                }
              >
                {step.label}
                {step.state === "active" ? "…" : null}
              </span>
              {step.detail !== null && step.state !== "pending" ? (
                <p className="mt-1 text-xs whitespace-pre-wrap text-gray-600 dark:text-gray-300">
                  {step.detail}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      {replyPreview !== null ? (
        <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm whitespace-pre-wrap text-gray-700 dark:bg-gray-900/60 dark:text-gray-200">
          {replyPreview}
        </div>
      ) : null}
      {nextActions.length > 0 && onSelectNextAction !== undefined ? (
        <AgentLiveTerminalNextActions
          actions={nextActions}
          disabled={nextActionsDisabled}
          onSelect={onSelectNextAction}
        />
      ) : null}
    </div>
  );
}
