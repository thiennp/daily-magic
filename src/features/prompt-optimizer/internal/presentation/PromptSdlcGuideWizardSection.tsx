import type { ReactElement } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

export default function PromptSdlcGuideWizardSection(): ReactElement {
  return (
    <section className="space-y-3">
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Four compose steps</h2>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        In <strong>AgentWitch Local</strong> the wizard is{" "}
        <strong>Project → Prompt and goal → CLI → Summary</strong>, then{" "}
        <strong>Run</strong>. Project picks the folder writers use. Prompt and
        goal accepts Quick fill chips and cost estimates (estimates, not
        invoices). CLI picks judge, improver, and runner. Summary starts the run.
      </p>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        <strong>Run</strong> starts generalize → evaluate → separate → optimize.
        The run finishes as <strong>passed</strong> only when every module
        reaches the pass score. Use this prompt / save as skill only when status
        is <strong>passed</strong>. Timeout, interrupt, and no_reply fail cleanly.
      </p>
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        While writers run, use Continue / Rerun with feedback at each gate, or
        Download report (.md). This console guide does not run the optimizer.
      </p>
    </section>
  );
}
