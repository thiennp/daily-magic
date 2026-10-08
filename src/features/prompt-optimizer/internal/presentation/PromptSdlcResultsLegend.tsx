import type { ReactElement } from "react";

import {
  APP_SURFACE_NESTED_CARD_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { PROMPT_SDLC_RESULT_LEGEND } from "@/features/prompt-optimizer/internal/presentation/promptSdlcAiPathCopy.constant";

export default function PromptSdlcResultsLegend(): ReactElement {
  return (
    <section
      aria-labelledby="prompt-sdlc-results-heading"
      className="space-y-3"
    >
      <h2
        id="prompt-sdlc-results-heading"
        className={APP_SURFACE_SECTION_TITLE_CLASS}
      >
        Results you can trust
      </h2>
      <div className={`${APP_SURFACE_NESTED_CARD_CLASS} space-y-4`}>
        <ul className="grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {PROMPT_SDLC_RESULT_LEGEND.map((item) => (
            <li
              key={item.key}
              className="flex flex-col items-start gap-1.5 text-sm text-awc-fg-muted dark:text-gray-300"
            >
              <span className="rounded-md border border-awc-border bg-white px-2 py-0.5 font-mono text-xs dark:border-gray-700 dark:bg-gray-900">
                {item.key}
              </span>
              {item.text}
            </li>
          ))}
        </ul>
        <p
          role="note"
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-100"
        >
          <strong>Use this prompt only when the run passed.</strong> Save as
          skill and Use this prompt stay locked for every other result.
        </p>
      </div>
    </section>
  );
}
