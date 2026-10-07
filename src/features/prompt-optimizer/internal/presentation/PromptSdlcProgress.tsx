import type { ReactElement } from "react";

import PromptSdlcCycleOutcomeBadges from "@/features/prompt-optimizer/internal/presentation/PromptSdlcCycleOutcomeBadges";
import { buildPromptSdlcSteps } from "@/lib/promptOptimizer/buildPromptSdlcSteps";
import { isPromptSdlcTerminalStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";
import type PromptSdlcCycleView from "@/lib/promptOptimizer/types/PromptSdlcCycleView.type";

interface PromptSdlcProgressProps {
  readonly cycle: PromptSdlcCycleView;
}

export default function PromptSdlcProgress({
  cycle,
}: PromptSdlcProgressProps): ReactElement {
  const steps = buildPromptSdlcSteps(cycle);
  const latest = cycle.revisions[cycle.revisions.length - 1] ?? null;
  const showUseThisHint = isPromptSdlcTerminalStatus(cycle.status);

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-awc-fg dark:text-white/90">
        This run
      </h2>
      <PromptSdlcCycleOutcomeBadges
        status={cycle.status}
        errorKind={cycle.errorKind ?? null}
        passed={latest?.judgement?.passed ?? null}
        score={latest?.judgement?.score ?? null}
        showUseThisHint={showUseThisHint}
      />
      <ol className="space-y-2">
        {steps.map((step) => (
          <li
            key={step.id}
            className="text-sm text-awc-fg dark:text-gray-200"
          >
            <span className="font-medium">
              {step.state === "active" ? "In progress" : "Done"}
            </span>
            {`. ${step.label}`}
            {step.detail !== null && step.detail.length > 0
              ? ` — ${step.detail}`
              : ""}
          </li>
        ))}
      </ol>
    </section>
  );
}
