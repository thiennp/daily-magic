import type { ReactElement } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import {
  PROMPT_SDLC_MODULES,
  PROMPT_SDLC_STEPS,
} from "@/features/prompt-optimizer/internal/presentation/promptSdlcAiPathCopy.constant";

const RUN_TIP =
  "Generalize makes test cases from your goal. Evaluate scores the current prompt. Separate splits it into modules. Optimize improves each module until the pass score or a limit is reached.";

export default function PromptSdlcHowItWorks(): ReactElement {
  return (
    <section aria-labelledby="prompt-sdlc-how-heading" className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2
          id="prompt-sdlc-how-heading"
          className={APP_SURFACE_SECTION_TITLE_CLASS}
        >
          How it works
        </h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>Four steps, then one run.</p>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {PROMPT_SDLC_STEPS.map((step, index) => (
          <li
            key={step.title}
            className={`${APP_SURFACE_NESTED_CARD_CLASS} space-y-1.5`}
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white"
            >
              {index + 1}
            </span>
            <h3 className="text-sm font-semibold text-awc-fg dark:text-white">
              <span className="sr-only">Step {index + 1}: </span>
              {step.title}
            </h3>
            <p className={APP_SURFACE_BODY_TEXT_CLASS}>{step.body}</p>
          </li>
        ))}
      </ol>
      <div className={`${APP_SURFACE_NESTED_CARD_CLASS} space-y-2`}>
        <p
          className="text-sm font-semibold text-awc-fg dark:text-white"
          title={RUN_TIP}
        >
          The run
        </p>
        <p
          className="flex flex-wrap items-center gap-1.5 font-mono text-sm"
          aria-label="Run modules in order: generalize, evaluate, separate, optimize"
        >
          {PROMPT_SDLC_MODULES.map((name, index) => (
            <span key={name} className="flex items-center gap-1.5">
              {index > 0 ? <span aria-hidden="true">→</span> : null}
              <span className="rounded-lg border border-awc-border bg-awc-surface-2 px-2.5 py-1 dark:border-gray-700 dark:bg-white/5">
                {name}
              </span>
            </span>
          ))}
        </p>
        <p className="text-xs text-awc-fg-muted dark:text-gray-400">
          You review a gate after evaluate: Continue or Rerun with feedback. You
          can download the report (.md) at the end.
        </p>
      </div>
    </section>
  );
}
