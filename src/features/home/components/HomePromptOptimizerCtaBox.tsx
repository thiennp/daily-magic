import Link from "next/link";
import type { ReactElement } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import {
  HOME_PROMPT_OPTIMIZER_CTA_COPY,
  HOME_PROMPT_OPTIMIZER_CTA_HREF,
} from "@/features/home/constants/homePromptOptimizerCta.constant";

/** Signed-in home: one box, one line of copy, one link. No compose form. */
export default function HomePromptOptimizerCtaBox(): ReactElement {
  return (
    <AppPanel
      id="prompt-optimizer"
      padding="compact"
      aria-labelledby="home-prompt-optimizer-cta-heading"
      className="scroll-mt-24"
    >
      <h2
        id="home-prompt-optimizer-cta-heading"
        className="text-sm font-medium uppercase tracking-wider text-gray-500"
      >
        {HOME_PROMPT_OPTIMIZER_CTA_COPY.eyebrow}
      </h2>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          {HOME_PROMPT_OPTIMIZER_CTA_COPY.body}
        </p>
        <Link
          href={HOME_PROMPT_OPTIMIZER_CTA_HREF}
          className={APP_SURFACE_CTA_PRIMARY_SM_CLASS}
        >
          {HOME_PROMPT_OPTIMIZER_CTA_COPY.cta}
        </Link>
      </div>
    </AppPanel>
  );
}
