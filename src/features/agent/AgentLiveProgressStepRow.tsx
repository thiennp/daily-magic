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
  if (state === "active") {
    return "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-200";
  }
  return "border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500";
};

export default function AgentLiveProgressStepRow({
  step,
  isWorking,
  workingEllipsis,
}: AgentLiveProgressStepRowProps) {
  const isActiveWorking = step.state === "active" && isWorking;

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
        {step.state === "done" ? (
          "✓"
        ) : step.state === "active" ? (
          <AgentLiveProgressActivityDot />
        ) : null}
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
