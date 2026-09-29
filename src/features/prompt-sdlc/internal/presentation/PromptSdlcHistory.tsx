import type { ReactElement } from "react";

import type { PromptSdlcCycleStatus } from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
import type PromptSdlcCycleSummary from "@/lib/promptSdlc/types/PromptSdlcCycleSummary.type";

const STATUS_LABEL: Record<PromptSdlcCycleStatus, string> = {
  judging: "Judging",
  improving: "Improving",
  awaiting_local: "Waiting on the Mac",
  wizard_paused: "Wizard — your turn",
  passed: "Passed",
  stopped: "Stopped",
  failed: "Failed",
};

interface PromptSdlcHistoryProps {
  readonly cycles: readonly PromptSdlcCycleSummary[];
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
      <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
        History
      </h2>
      {note.length > 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">{note}</p>
      ) : null}
      {cycles.length === 0 && note.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">No runs yet.</p>
      ) : null}
      <ul className="space-y-2">
        {cycles.map((cycle) => (
          <li key={cycle.id}>
            <button
              type="button"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-sm dark:border-gray-700"
              aria-current={cycle.id === activeId ? "true" : undefined}
              onClick={() => onOpen(cycle.id)}
            >
              <span className="font-medium text-gray-800 dark:text-white/90">
                {STATUS_LABEL[cycle.status]}
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {` · round ${cycle.currentRound} · ${cycle.goal}`}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
