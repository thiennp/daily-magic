import type { ReactElement } from "react";

import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

export default function PromptSdlcGuideNotes(): ReactElement {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Choose the models</h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          You choose the judge and the improver. Each list is the writers
          installed on this Mac, plus a choice to score or rewrite it yourself.
          Nothing is selected until you choose. One installed writer can fill
          both roles. Local and small models are not listed.
        </p>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          The writers run in the folder you choose, so they can read the
          Playbook and the code. The default folder is your home directory.
          Choose the project folder when the prompt is about that code. An
          optimizer that runs somewhere else cannot see that folder.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>What Run does</h2>
        <ol
          className={`${APP_SURFACE_BODY_TEXT_CLASS} list-decimal space-y-2 pl-5`}
        >
          <li>Round 0 is the prompt you pasted.</li>
          <li>
            The judge scores it from 0 to 100 and gives a reason. The pass score
            starts at 90. You can move it.
          </li>
          <li>
            Below that score, the improver returns the next prompt text only.
          </li>
          <li>
            The judge scores that new prompt. This repeats until the score
            reaches the pass score. Later rewrites include earlier rounds. When
            the score is not rising, those earlier prompts are included too.
          </li>
        </ol>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          The loop continues from the score to the rewrite on its own.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>
          Read the revision list
        </h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          Round 0 is your text. Later rounds are rewrites. Each judged round
          shows the score and the reason. Passed means the score reached the
          pass score you set. The run keeps going until that happens. Failed
          means the judge did not return a score, the improver returned nothing,
          or the call could not start. The message on the page names which one.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>
          Write the goal as the result
        </h2>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          Say what a good run produces: whose question gets answered, which
          facts may be used, and what must not be promised. The example goal is
          that kind of result. A goal of &quot;Make it better&quot; leaves the
          judge with nothing to score.
        </p>
      </section>
    </div>
  );
}
