import type { ReactElement } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

export default function PromptSdlcGuideWizardSection(): ReactElement {
  return (
    <section className="space-y-3">
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>What Run does</h2>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        <strong>Run</strong> starts the four-step wizard in AgentWitch Live:
        generalize placeholders, evaluate revisions (pass 70, up to five
        rounds), separate into modules (chain or parallel), then optimize each
        module with one runner trial and judge score per module.
      </p>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        Choose a <strong>runner</strong> for wizard step 4; it defaults to the
        same writer as the judge when you leave runner blank. The wizard
        finishes as <strong>passed</strong> only when every module reaches the
        wizard pass score; otherwise it ends as <strong>stopped</strong> but
        still shows the best prompts per module.
      </p>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        While writers run, use <strong>End wizard</strong> or{" "}
        <strong>Skip module</strong> during step 4. Pause at each gate to
        continue or rerun with feedback. Click a timeline step to open the
        score, feedback, and saved prompt for that step.
      </p>
    </section>
  );
}
