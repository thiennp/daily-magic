import type { ReactElement } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

export default function PromptSdlcGuideWizardSection(): ReactElement {
  return (
    <section className="space-y-3">
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>
        Wizard vs classic loop
      </h2>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        <strong>Run</strong> starts the four-step wizard in Agent Witch Live:
        generalize placeholders, evaluate revisions (pass 70, up to five
        rounds), separate into modules (chain or parallel), then optimize each
        module with one runner trial and judge score per module.{" "}
        <strong>Classic loop (90 / 10 rounds)</strong> skips the wizard and
        keeps the single prompt rewrite loop with your pass score and round
        limit.
      </p>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        Choose a <strong>runner</strong> for wizard step 4; it defaults to the
        same writer as the judge when you leave runner blank. The wizard
        finishes as <strong>passed</strong> only when every module reaches the
        wizard pass score; otherwise it ends as <strong>stopped</strong> but
        still shows the best prompts per module.
      </p>
    </section>
  );
}
