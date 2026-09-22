"use client";

import AgentLiveProgressActivityDot from "@/features/agent/AgentLiveProgressActivityDot";
import type { AgentLiveProgressStep } from "@/features/agent/utils/buildAgentLiveProgressSteps";

interface AgentLiveProgressStepRowProps {
  readonly step: AgentLiveProgressStep;
  readonly isWorking: boolean;
  readonly workingEllipsis: string;
}

const stepIconClass = (state: AgentLiveProgressStep["state"]): string => {
  if (state === "done") {
    return "border-emerald-500 bg-emerald-500 text-white";
  }
  if (state === "fallback") {
    return "border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-100";
  }
  if (state === "failed") {
    return "border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-100";
  }
  if (state === "skipped") {
    return "border-dashed border-gray-400 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400";
  }
  if (state === "active") {
    return "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-200";
  }
  return "border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500";
};

const stepIconContent = (
  state: AgentLiveProgressStep["state"],
): string | null => {
  if (state === "done") {
    return "✓";
  }
  if (state === "failed") {
    return "✕";
  }
  if (state === "fallback") {
    return "!";
  }
  if (state === "skipped") {
    return "–";
  }
  return null;
};

export default function AgentLiveProgressStepRow({
  step,
  isWorking,
  workingEllipsis,
}: AgentLiveProgressStepRowProps) {
  const isActiveWorking = step.state === "active" && isWorking;
  const iconContent = stepIconContent(step.state);

  return (
    <li
      className={`flex items-start gap-3 ${
        isActiveWorking
          ? "rounded-lg bg-brand-50/60 px-2 py-1.5 dark:bg-brand-950/30"
          : ""
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold ${stepIconClass(step.state)}`}
      >
        {step.state === "active" ? (
          <AgentLiveProgressActivityDot />
        ) : (
          iconContent
        )}
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
          {step.state === "skipped" ? (
            <span className="ml-2 rounded-full border border-dashed border-gray-400 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:border-gray-600 dark:text-gray-400">
              Skipped
            </span>
          ) : null}
          {step.state === "fallback" ? (
            <span className="ml-2 text-[10px] font-medium uppercase tracking-wide text-amber-700 dark:text-amber-200">
              Used fallback
            </span>
          ) : null}
          {isActiveWorking ? workingEllipsis : null}
        </span>
        {step.detail !== null && step.state !== "pending" ? (
          <p className="mt-1 text-xs whitespace-pre-wrap text-gray-600 dark:text-gray-300">
            {step.detail}
          </p>
        ) : null}
      </div>
    </li>
  );
}
