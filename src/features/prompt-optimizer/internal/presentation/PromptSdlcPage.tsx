import Link from "next/link";
import type { ReactElement } from "react";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import {
  PROMPT_SDLC_AWL_GUIDE_HREF,
  PROMPT_SDLC_AWL_PAGE_HREF,
} from "@/features/prompt-optimizer/internal/presentation/promptSdlcAwlHref.constant";
import { PROMPT_SDLC_OUTCOME_COPY } from "@/features/prompt-optimizer/internal/presentation/promptSdlcOutcomeLabels.constant";

export default function PromptSdlcPage(): ReactElement {
  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Prompt optimizer"
        description="Run the four-step prompt optimizer wizard in Agent Witch Local on this Mac. A judge scores your prompt; a runner executes module trials; writers use your Playbook (team standards) and project code in the folder you choose."
      />
      <ol
        className={`${APP_SURFACE_BODY_TEXT_CLASS} max-w-xl list-decimal space-y-4 pl-5`}
      >
        <li>Install Agent Witch on your Mac if you have not already.</li>
        <li>Open Agent Witch Local and open Prompt optimizer.</li>
        <li>
          Paste the prompt and goal, choose the project folder, then pick judge
          and improver models.
        </li>
      </ol>
      <p
        className={`max-w-xl rounded-lg border border-amber-200/80 bg-amber-50/70 px-3 py-2 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100`}
        title={PROMPT_SDLC_OUTCOME_COPY.recommendTimeoutTip}
      >
        <strong>Honesty chrome:</strong> cycle badges show{" "}
        <strong>passed</strong> / failed / timeout / interrupt / no_reply
        unmistakably. {PROMPT_SDLC_OUTCOME_COPY.useThisOnlyWhenPassed} Hover
        “fail-clean timeout” in the Mac app for recommendTimeoutMs budgets.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/" className={APP_SURFACE_CTA_PRIMARY_CLASS}>
          Install Agent Witch on this Mac
        </Link>
        <a
          href={PROMPT_SDLC_AWL_PAGE_HREF}
          className={APP_SURFACE_TEXT_LINK_CLASS}
        >
          Open in Agent Witch Local
        </a>
      </div>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        Agent Witch Local is the Mac app ({PROMPT_SDLC_AWL_PAGE_HREF}). This
        console page does not run the optimizer.
      </p>
      <p>
        <Link
          href="/prompt-optimizer/guide"
          className={APP_SURFACE_TEXT_LINK_CLASS}
        >
          How it works
        </Link>
        {" · "}
        <a
          href={PROMPT_SDLC_AWL_GUIDE_HREF}
          className={APP_SURFACE_TEXT_LINK_CLASS}
        >
          Instructions in Agent Witch Local
        </a>
      </p>
    </div>
  );
}
