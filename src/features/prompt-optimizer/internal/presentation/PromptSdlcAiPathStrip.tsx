import type { ReactElement } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { PROMPT_SDLC_AI_PATH_COPY } from "@/features/prompt-optimizer/internal/presentation/promptSdlcAiPathCopy.constant";

export default function PromptSdlcAiPathStrip(): ReactElement {
  const copy = PROMPT_SDLC_AI_PATH_COPY;
  return (
    <section
      aria-labelledby="prompt-sdlc-ai-paths-heading"
      className="space-y-3"
    >
      <h2
        id="prompt-sdlc-ai-paths-heading"
        className={APP_SURFACE_SECTION_TITLE_CLASS}
      >
        {copy.title}
      </h2>
      <p className={`${APP_SURFACE_BODY_TEXT_CLASS} max-w-xl`}>{copy.intro}</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {copy.paths.map((path) => (
          <li key={path.id} className={APP_SURFACE_NESTED_CARD_CLASS}>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {path.label}
            </p>
            <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>{path.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
