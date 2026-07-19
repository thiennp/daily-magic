"use client";

import AgentLiveProgressActivityBar from "@/features/agent/AgentLiveProgressActivityBar";
import AgentLiveProgressActivityDot from "@/features/agent/AgentLiveProgressActivityDot";
import AgentLiveProgressStepRow from "@/features/agent/AgentLiveProgressStepRow";
import AgentLiveTerminalNextActions from "@/features/agent/AgentLiveTerminalNextActions";
import { useAgentLiveTerminalLoadingDots } from "@/features/agent/hooks/useAgentLiveTerminalLoadingDots";
import type { AgentLiveProgressStep } from "@/features/agent/utils/buildAgentLiveProgressSteps";
import type { AgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";
import { buildAgentLiveTerminalLoadingLine } from "@/features/agent/utils/buildAgentLiveTerminalDisplay";

interface AgentLiveProgressFeedProps {
  readonly steps: readonly AgentLiveProgressStep[];
  readonly replyPreview: string | null;
  readonly isWorking: boolean;
  readonly stallState?: AgentLiveProgressStallState;
  readonly nextActions?: readonly string[];
  readonly nextActionsDisabled?: boolean;
  readonly onSelectNextAction?: (action: string) => void;
}

export default function AgentLiveProgressFeed({
  steps,
  replyPreview,
  isWorking,
  stallState = "none",
  nextActions = [],
  nextActionsDisabled = false,
  onSelectNextAction,
}: AgentLiveProgressFeedProps) {
  const loadingDotCount = useAgentLiveTerminalLoadingDots(isWorking);
  const workingEllipsis = buildAgentLiveTerminalLoadingLine(loadingDotCount);

  return (
    <div
      className="mt-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.02]"
      aria-busy={isWorking}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white/90">
          Progress on your Mac
        </h3>
        {isWorking ? (
          <span
            className="inline-flex items-center gap-1.5 text-xs text-brand-700 dark:text-brand-300"
            aria-live="polite"
          >
            <AgentLiveProgressActivityDot />
            In progress{workingEllipsis}
          </span>
        ) : null}
      </div>
      {isWorking ? <AgentLiveProgressActivityBar /> : null}
      {stallState === "stuck" ? (
        <p
          className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
          role="status"
        >
          Your Mac has not sent updates for a while. Open Home to wake Agent
          Witch or try sending the task again.
        </p>
      ) : null}
      {stallState === "warning" ? (
        <p
          className="mt-3 text-sm text-gray-600 dark:text-gray-300"
          role="status"
        >
          Still waiting for your Mac agent — this is taking longer than usual…
        </p>
      ) : null}
      <ol className="mt-4 space-y-3">
        {steps.map((step) => (
          <AgentLiveProgressStepRow
            key={step.id}
            step={step}
            isWorking={isWorking}
            workingEllipsis={workingEllipsis}
          />
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
