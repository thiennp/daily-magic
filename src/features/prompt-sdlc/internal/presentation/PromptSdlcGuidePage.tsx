import Link from "next/link";
import type { ReactElement } from "react";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import PromptSdlcGuideExampleCard from "@/features/prompt-sdlc/internal/presentation/PromptSdlcGuideExampleCard";
import PromptSdlcGuideNotes from "@/features/prompt-sdlc/internal/presentation/PromptSdlcGuideNotes";
import {
  PROMPT_SDLC_GUIDE_EXAMPLE,
  PROMPT_SDLC_GUIDE_GOAL,
  PROMPT_SDLC_GUIDE_STRONGER_PROMPT,
  PROMPT_SDLC_GUIDE_WEAK_PROMPT,
} from "@/features/prompt-sdlc/internal/presentation/promptSdlcGuideExamples.constant";

export default function PromptSdlcGuidePage(): ReactElement {
  return (
    <div className="space-y-8">
      <AppPageHeader
        title="How to use Prompt SDLC"
        description="Paste a prompt and a goal. A judge scores the prompt. If it misses, a second model rewrites it. You read the revisions when the loop stops."
      />
      <p>
        <Link href="/prompt-sdlc" className={APP_SURFACE_TEXT_LINK_CLASS}>
          Back to Prompt SDLC
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
          <Link
            href={`/prompt-sdlc?example=${PROMPT_SDLC_GUIDE_EXAMPLE}`}
            className={APP_SURFACE_CTA_PRIMARY_CLASS}
          >
            Load this example and try a run
          </Link>
        </p>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          This fills the goal and the weak prompt. Choose a judge and an
          improver, then Run. The page shows each step while it is in progress,
          and keeps every run in History.
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
