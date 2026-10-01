import type { ReactElement } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

export default function PromptSdlcGuideWizardSection(): ReactElement {
  return (
    <section className="space-y-3">
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Four-step wizard</h2>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        <strong>Run</strong> in Agent Witch Local starts the wizard: (1)
        generalize placeholders, (2) evaluate revisions (pass 70, up to five
        rounds; judge scores prompt text only), (3) separate into modules (chain
        or parallel), (4) optimize each module with one runner trial and judge
        score per module.
      </p>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        Choose a <strong>runner</strong> for wizard step 4; it defaults to the
        same writer as the judge when you leave runner blank. The wizard
        finishes as <strong>passed</strong> only when every module reaches the
        wizard pass score; otherwise it ends as <strong>stopped</strong> but
        still shows the best prompts per module.
      </p>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        <strong>Billing honesty:</strong> only <strong>passed</strong> counts as
        billable-success — use this prompt only when status is{" "}
        <strong>passed</strong>. Timeout, interrupt, and no_reply are distinct
        failed kinds (not silent success). Stuck writers may escalate with
        SIGKILL. Judge or heuristic <code>recommendTimeoutMs</code> may tune
        budgets. Module timeout policy continues to evolve; timeout→improver
        (T4) is parked.
      </p>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        Install writers before you expect the wizard to finish. Empty installed
        writers means a blocked playground, not a broken claim. Winners export
        as skills / Playbooks for reuse.
      </p>
    </section>
  );
}
