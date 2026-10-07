import type { ReactElement } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
  APP_SURFACE_TERMINAL_PRE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

interface PromptSdlcGuideExampleCardProps {
  readonly title: string;
  readonly goal: string;
  readonly promptText: string;
  readonly explanation: string;
}

export default function PromptSdlcGuideExampleCard({
  title,
  goal,
  promptText,
  explanation,
}: PromptSdlcGuideExampleCardProps): ReactElement {
  return (
    <article className={`${APP_SURFACE_NESTED_CARD_CLASS} space-y-3`}>
      <h3 className={APP_SURFACE_SECTION_TITLE_CLASS}>{title}</h3>
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-awc-fg-muted dark:text-gray-400">
          Goal
        </p>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>{goal}</p>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-awc-fg-muted dark:text-gray-400">
          Prompt
        </p>
        <pre className={APP_SURFACE_TERMINAL_PRE_CLASS}>{promptText}</pre>
      </div>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>{explanation}</p>
    </article>
  );
}
