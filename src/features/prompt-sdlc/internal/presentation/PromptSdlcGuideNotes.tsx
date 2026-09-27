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
          Both the judge and the improver are reasoning models: Claude, Codex,
          Cursor, Antigravity, or Cursor Cloud. Local and small models are not
          listed. When more than one model is listed, the page starts the two
          roles on different models. You can select the same model for both.
        </p>
        <p className={APP_SURFACE_BODY_TEXT_CLASS}>
          A writer that runs on this Mac needs a Mac selected. Cursor Cloud does
          not. If both lists are empty, sign in and keep the Mac bridge running
          from this repo. The composer says when the bridge is unreachable.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>What Run does</h2>
        <ol
          className={`${APP_SURFACE_BODY_TEXT_CLASS} list-decimal space-y-2 pl-5`}
        >
          <li>Round 0 is the prompt you pasted.</li>
          <li>
            The judge scores it from 0 to 100 and gives reasons. 80 or higher
            passes.
          </li>
          <li>Below 80, the improver returns the next prompt text only.</li>
          <li>
            The judge scores that new prompt. This repeats until a score passes
            or 3 rounds finish.
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
          shows the score and the reasons. Passed means a score reached 80.
          Stopped means three rounds finished below 80, so use the latest prompt
          or change the goal and run again. Failed means the judge did not
          return a score, the improver returned nothing, or the call could not
          start. The message on the page names which one.
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
