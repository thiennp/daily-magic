"use client";

import type { ReactElement } from "react";
import { useState } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import {
  HOME_PROMPT_OPTIMIZER_STORYBOOK_GOAL,
  HOME_PROMPT_OPTIMIZER_STORYBOOK_LEDE,
  HOME_PROMPT_OPTIMIZER_STORYBOOK_PROMPT,
} from "@/features/home/constants/homePromptOptimizerStorybookPreview.constant";
import PromptSdlcField, {
  PROMPT_SDLC_FIELD_CLASS,
} from "@/features/prompt-optimizer/internal/presentation/PromptSdlcField";
import { PROMPT_SDLC_AWL_PAGE_HREF } from "@/features/prompt-optimizer/internal/presentation/promptSdlcAwlHref.constant";

interface HomePromptOptimizerComposeCardProps {
  readonly storybookPreview?: boolean;
}

export default function HomePromptOptimizerComposeCard({
  storybookPreview = false,
}: HomePromptOptimizerComposeCardProps): ReactElement {
  const [goal, setGoal] = useState(
    storybookPreview ? HOME_PROMPT_OPTIMIZER_STORYBOOK_GOAL : "",
  );
  const [prompt, setPrompt] = useState(
    storybookPreview ? HOME_PROMPT_OPTIMIZER_STORYBOOK_PROMPT : "",
  );

  const headline =
    storybookPreview && goal.trim().length > 0 ? goal.trim() : null;
  const lede = storybookPreview ? HOME_PROMPT_OPTIMIZER_STORYBOOK_LEDE : null;

  return (
    <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-800">
      {headline !== null ? (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white/90">
          {headline}
        </h3>
      ) : null}
      {lede !== null ? (
        <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>{lede}</p>
      ) : null}
      <form
        className="mt-4 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <PromptSdlcField id="home-prompt-optimizer-goal" label="Goal">
          <textarea
            id="home-prompt-optimizer-goal"
            name="goal"
            rows={4}
            value={goal}
            onChange={(event) => {
              setGoal(event.target.value);
            }}
            className={PROMPT_SDLC_FIELD_CLASS}
          />
        </PromptSdlcField>
        <PromptSdlcField id="home-prompt-optimizer-prompt" label="Prompt">
          <textarea
            id="home-prompt-optimizer-prompt"
            name="prompt"
            rows={8}
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value);
            }}
            className={PROMPT_SDLC_FIELD_CLASS}
          />
        </PromptSdlcField>
        <a
          href={PROMPT_SDLC_AWL_PAGE_HREF}
          className={`inline-flex ${APP_SURFACE_CTA_PRIMARY_SM_CLASS}`}
        >
          Open in AgentWitch Local
        </a>
        <p className={APP_SURFACE_TEXT_LINK_CLASS}>
          The wizard runs in AgentWitch Local on your computer—not in this
          browser tab.
        </p>
      </form>
    </div>
  );
}
