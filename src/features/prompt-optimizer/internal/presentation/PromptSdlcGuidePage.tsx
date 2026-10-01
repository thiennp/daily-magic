import Link from "next/link";
import type { ReactElement } from "react";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import PromptSdlcGuideExampleCard from "@/features/prompt-optimizer/internal/presentation/PromptSdlcGuideExampleCard";
import PromptSdlcGuideNotes from "@/features/prompt-optimizer/internal/presentation/PromptSdlcGuideNotes";
import {
  PROMPT_SDLC_GUIDE_GOAL,
  PROMPT_SDLC_GUIDE_STRONGER_PROMPT,
  PROMPT_SDLC_GUIDE_WEAK_PROMPT,
} from "@/features/prompt-optimizer/internal/presentation/promptSdlcGuideExamples.constant";
import { PROMPT_SDLC_AWL_SAMPLE_HREF } from "@/features/prompt-optimizer/internal/presentation/promptSdlcAwlHref.constant";

export default function PromptSdlcGuidePage(): ReactElement {
  return (
    <div className="space-y-8">
      <AppPageHeader
        title="How to use the prompt optimizer"
        description="Paste a prompt and a goal in Agent Witch Local. A judge scores the prompt. If it misses, a second model rewrites it. Only passed outcomes count as success for reuse; timeouts and no-reply fail cleanly. This console page does not run the optimizer."
      />
      <p>
        <Link href="/prompt-optimizer" className={APP_SURFACE_TEXT_LINK_CLASS}>
          Back to the prompt optimizer
        </Link>
      </p>
      <section className="space-y-3">
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>
          The prompt is what changes
        </h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          The prompt is the text the loop rewrites. The goal stays fixed. It
          describes the result of using the prompt. A passing rewrite changes
          how the prompt works. Appending the goal to a vague prompt leaves the
          old instructions in force.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Examples</h2>
        <PromptSdlcGuideExampleCard
          title="A prompt the judge will mark down"
          goal={PROMPT_SDLC_GUIDE_GOAL}
          promptText={PROMPT_SDLC_GUIDE_WEAK_PROMPT}
          explanation="The prompt already says to solve the problem and follow policy. Pasting the goal underneath does not say where the email, the facts, and the policy go, or what to do when a fact is missing. Helpful and solve still push the model to invent an order status."
        />
        <p>
          <a
            href={PROMPT_SDLC_AWL_SAMPLE_HREF}
            className={APP_SURFACE_CTA_PRIMARY_CLASS}
          >
            Run this sample in Agent Witch Local
          </a>
        </p>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          Agent Witch Local fills the goal and the weak prompt. Choose a judge
          and an improver, then Run. That page shows each step while it is in
          progress, and keeps every run in History.
        </p>
        <PromptSdlcGuideExampleCard
          title="A prompt that can pass"
          goal={PROMPT_SDLC_GUIDE_GOAL}
          promptText={PROMPT_SDLC_GUIDE_STRONGER_PROMPT}
          explanation="The goal is unchanged. The prompt now has slots for the message, the facts, and the policy, a decision order, and a stop when a fact is absent. The customer sees the reply only."
        />
      </section>
      <PromptSdlcGuideNotes />
    </div>
  );
}
