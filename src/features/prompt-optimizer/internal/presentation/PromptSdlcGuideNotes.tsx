import type { ReactElement } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

import PromptSdlcGuideWizardSection from "./PromptSdlcGuideWizardSection";

export default function PromptSdlcGuideNotes(): ReactElement {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Choose the models</h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          You choose the judge and the improver. Each list is the writers
          installed on this Mac, plus a choice to score or rewrite it yourself.
          The next visit fills in the judge and improver you last chose. The
          first visit leaves them blank until you choose. One installed writer
          can fill both roles. Local and small models are not listed.
        </p>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          The writers run in the folder you choose, so they can read the
          Playbook and the code. The first visit uses your home directory. Later
          visits use the last folder that still exists. Choose the project
          folder when the prompt is about that code. An optimizer that runs
          somewhere else cannot see that folder.
        </p>
      </section>
      <PromptSdlcGuideWizardSection />
    </div>
  );
}
