import type { ReactElement } from "react";

import { buildPromptSdlcSteps } from "@/lib/promptSdlc/buildPromptSdlcSteps";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";

interface PromptSdlcProgressProps {
  readonly cycle: PromptSdlcCycleView;
}

export default function PromptSdlcProgress({
  cycle,
}: PromptSdlcProgressProps): ReactElement {
  const steps = buildPromptSdlcSteps(cycle);

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
        This run
      </h2>
      <ol className="space-y-2">
        {steps.map((step) => (
          <li
            key={step.id}
            className="text-sm text-gray-700 dark:text-gray-200"
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
