import type { ReactElement } from "react";

import { labelPromptSdlcCycleOutcome } from "@/features/prompt-optimizer/internal/presentation/promptSdlcOutcomeLabels.constant";
import type PromptSdlcCycleSummary from "@/lib/promptOptimizer/types/PromptSdlcCycleSummary.type";

interface PromptSdlcHistoryProps {
  readonly cycles: readonly (PromptSdlcCycleSummary & {
    readonly errorKind?: string | null;
  })[];
  readonly note: string;
  readonly activeId: string | null;
  readonly onOpen: (cycleId: string) => void;
}

export default function PromptSdlcHistory({
  cycles,
  note,
  activeId,
  onOpen,
}: PromptSdlcHistoryProps): ReactElement {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-awc-fg dark:text-white/90">
        History
      </h2>
      {note.length > 0 ? (
        <p className="text-sm text-awc-fg-muted dark:text-gray-300">{note}</p>
      ) : null}
      {cycles.length === 0 && note.length === 0 ? (
        <p className="text-sm text-awc-fg-muted dark:text-gray-300">No runs yet.</p>
      ) : null}
      <ul className="space-y-2">
        {cycles.map((cycle) => {
          const outcome = labelPromptSdlcCycleOutcome({
            status: cycle.status,
            errorKind: cycle.errorKind ?? null,
          });
          return (
            <li key={cycle.id}>
              <button
                type="button"
                className="w-full rounded-lg border border-awc-border px-4 py-3 text-left text-sm dark:border-gray-700"
                aria-current={cycle.id === activeId ? "true" : undefined}
                onClick={() => onOpen(cycle.id)}
              >
                <span className="font-semibold text-awc-fg dark:text-white">
                  {outcome.label}
                </span>
                <span className="text-awc-fg-muted dark:text-gray-300">
                  {` · round ${cycle.currentRound} · ${cycle.goal}`}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
