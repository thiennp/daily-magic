import type { ReactElement } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import InfoTip from "@/components/ui/infoTip/InfoTip";
import { PROMPT_SDLC_AI_PATH_COPY } from "@/features/prompt-optimizer/internal/presentation/promptSdlcAiPathCopy.constant";

export default function PromptSdlcAiPathStrip(): ReactElement {
  const copy = PROMPT_SDLC_AI_PATH_COPY;
  return (
    <section
      aria-labelledby="prompt-sdlc-ai-paths-heading"
      className="space-y-3"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2
          id="prompt-sdlc-ai-paths-heading"
          className={`${APP_SURFACE_SECTION_TITLE_CLASS} flex items-center gap-2`}
        >
          {copy.title}
          <InfoTip text={copy.tip} label={`About ${copy.title}`} />
        </h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>{copy.intro}</p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {copy.paths.map((path) => (
          <li
            key={path.id}
            className={`${APP_SURFACE_NESTED_CARD_CLASS} flex flex-col gap-2`}
          >
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-awc-fg dark:text-white">
              {path.label}
              <InfoTip text={path.tip} label={`About ${path.label}`} />
            </h3>
            <p className={APP_SURFACE_BODY_TEXT_CLASS}>{path.detail}</p>
            <span className="mt-auto self-start rounded-full bg-awc-surface-2 px-2.5 py-0.5 text-xs font-semibold text-awc-fg-muted dark:bg-white/10 dark:text-gray-300">
              {path.tag}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-awc-fg-muted dark:text-gray-400">
        {copy.footnote}
      </p>
    </section>
  );
}
