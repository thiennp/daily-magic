import type { ReactElement } from "react";

import type PromptSdlcCycleView from "@/lib/promptOptimizer/types/PromptSdlcCycleView.type";

const FIELD_CLASS =
  "mt-2 w-full rounded-lg border border-awc-border bg-white px-4 py-3 text-sm dark:border-gray-700 dark:bg-gray-800";

interface PromptSdlcRevisionListProps {
  readonly cycle: PromptSdlcCycleView;
}

export default function PromptSdlcRevisionList({
  cycle,
}: PromptSdlcRevisionListProps): ReactElement {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-medium text-awc-fg dark:text-white/90">
        Revisions
      </h2>
      <p className="text-sm text-awc-fg-muted dark:text-gray-300">
        Status: {cycle.status}
        {cycle.errorMessage !== null ? `. ${cycle.errorMessage}` : ""}
      </p>
      <ol className="space-y-4">
        {cycle.revisions.map((revision) => (
          <li key={revision.id} className="space-y-2">
            <p className="text-sm font-medium text-awc-fg dark:text-white/90">
              Round {revision.roundNumber}
              {revision.judgement?.score !== null &&
              revision.judgement?.score !== undefined
                ? ` · score ${revision.judgement.score}`
                : ""}
            </p>
            <textarea
              readOnly
              rows={6}
              className={FIELD_CLASS}
              value={revision.promptText}
              aria-label={`Round ${revision.roundNumber} prompt`}
            />
            {revision.judgement !== null ? (
              <p className="text-sm text-awc-fg-muted dark:text-gray-300">
                {revision.judgement.judgeModel}
                {revision.judgement.reasons !== null
                  ? `: ${revision.judgement.reasons}`
                  : ""}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
