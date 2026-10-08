import Link from "next/link";
import type { ReactElement } from "react";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import PromptSdlcAiPathStrip from "@/features/prompt-optimizer/internal/presentation/PromptSdlcAiPathStrip";
import PromptSdlcHowItWorks from "@/features/prompt-optimizer/internal/presentation/PromptSdlcHowItWorks";
import PromptSdlcResultsLegend from "@/features/prompt-optimizer/internal/presentation/PromptSdlcResultsLegend";
import {
  PROMPT_SDLC_AWL_GUIDE_HREF,
  PROMPT_SDLC_AWL_PAGE_HREF,
} from "@/features/prompt-optimizer/internal/presentation/promptSdlcAwlHref.constant";

const SECONDARY_CTA_CLASS =
  "inline-flex h-11 items-center rounded-xl border border-awc-border-strong px-5 text-sm font-semibold text-awc-fg dark:border-gray-700 dark:text-white";

export default function PromptSdlcPage(): ReactElement {
  return (
    <div className="space-y-8">
      <AppPageHeader
        title="Prompt optimizer"
        description="Run the four-step wizard in AgentWitch Local on this computer. A judge scores each try, the runner executes module trials, and writers work from your Playbook and project folder."
      />
      <section
        aria-labelledby="prompt-sdlc-computer-heading"
        className={`${APP_SURFACE_NESTED_CARD_CLASS} space-y-4`}
      >
        <div className="space-y-1">
          <h2
            id="prompt-sdlc-computer-heading"
            className="text-base font-semibold text-awc-fg dark:text-white"
          >
            This computer
          </h2>
          <p className={APP_SURFACE_BODY_TEXT_CLASS}>
            Opens the wizard in AgentWitch Local on this computer.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={PROMPT_SDLC_AWL_PAGE_HREF}
            className={APP_SURFACE_CTA_PRIMARY_CLASS}
          >
            Open in AgentWitch Local
          </a>
          <Link href="/download" className={SECONDARY_CTA_CLASS}>
            Download AgentWitch Local
          </Link>
        </div>
        <p className="flex flex-wrap items-center gap-x-2 border-t border-awc-border pt-3 text-sm text-awc-fg-muted dark:border-gray-800 dark:text-gray-400">
          <span className="mr-auto">This page does not run the optimizer.</span>
          <Link
            href="/prompt-optimizer/guide"
            className={APP_SURFACE_TEXT_LINK_CLASS}
          >
            How it works
          </Link>
          <span aria-hidden="true">·</span>
          <a
            href={PROMPT_SDLC_AWL_GUIDE_HREF}
            className={APP_SURFACE_TEXT_LINK_CLASS}
          >
            Instructions in AgentWitch Local
          </a>
        </p>
      </section>
      <PromptSdlcAiPathStrip />
      <PromptSdlcHowItWorks />
      <PromptSdlcResultsLegend />
      <p className="rounded-lg border border-awc-border bg-awc-surface-2/70 px-4 py-3 text-sm text-awc-fg dark:border-gray-800 dark:bg-white/5 dark:text-gray-200">
        <strong>Run history stays on this computer.</strong> Reports and prompts
        never upload to the cloud.
      </p>
    </div>
  );
}
