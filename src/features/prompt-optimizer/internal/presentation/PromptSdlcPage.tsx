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

export default function PromptSdlcPage(): ReactElement {
  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Prompt optimizer"
        description="Run the four-step wizard or the classic judge/improver loop in Agent Witch Live on this Mac. The console links you there; writers run in the project folder you choose."
      />
      <ol
        className={`${APP_SURFACE_BODY_TEXT_CLASS} list-decimal space-y-2 pl-5`}
      >
        <li>Open Agent Witch Live on this Mac.</li>
        <li>Paste the prompt and the goal, and choose the project folder.</li>
        <li>Choose who scores the prompt and who rewrites it.</li>
      </ol>
      <p>
        <a
          href={PROMPT_SDLC_AWL_PAGE_HREF}
          className={APP_SURFACE_CTA_PRIMARY_CLASS}
        >
          Run it in Agent Witch Live
        </a>
      </p>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        Agent Witch Live is the Mac app at {PROMPT_SDLC_AWL_PAGE_HREF}. The
        console does not run the optimizer.
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
          Instructions in Agent Witch Live
        </a>
      </p>
    </div>
  );
}
