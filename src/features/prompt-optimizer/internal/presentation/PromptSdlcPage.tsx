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
        description="Run the four-step wizard or the classic judge/improver loop in Agent Witch Live on this Mac. A judge scores your prompt; an improver rewrites it using your Playbook (team standards) and project code in the folder you choose."
      />
      <ol
        className={`${APP_SURFACE_BODY_TEXT_CLASS} max-w-xl list-decimal space-y-4 pl-5`}
      >
        <li>Install Agent Witch on your Mac if you have not already.</li>
        <li>Open Agent Witch Live and open Prompt optimizer.</li>
        <li>
          Paste the prompt and goal, choose the project folder, then pick judge
          and improver models.
        </li>
      </ol>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="/install/agent-witch"
          className={APP_SURFACE_CTA_PRIMARY_CLASS}
        >
          Install Agent Witch on this Mac
        </a>
        <a
          href={PROMPT_SDLC_AWL_PAGE_HREF}
          className={APP_SURFACE_TEXT_LINK_CLASS}
        >
          Open in Agent Witch Live
        </a>
      </div>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        Agent Witch Live is the Mac app ({PROMPT_SDLC_AWL_PAGE_HREF}). This
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
          Instructions in Agent Witch Live
        </a>
      </p>
    </div>
  );
}
