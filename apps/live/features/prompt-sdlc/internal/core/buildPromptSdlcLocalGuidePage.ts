import { PROMPT_SDLC_PASS_SCORE } from "../../../../adapters/promptSdlcAwcCore";
import { renderPromptSdlcLocalScoreScale } from "./buildPromptSdlcLocalStepTree";
import {
  PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE,
  PROMPT_SDLC_LOCAL_GUIDE_GOAL,
  PROMPT_SDLC_LOCAL_GUIDE_STRONGER_PROMPT,
  PROMPT_SDLC_LOCAL_GUIDE_WEAK_PROMPT,
} from "./promptSdlcLocalGuide.constant";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const hidden = (name: string, value: string): string =>
  `<input type="hidden" name="${name}" value="${escapeHtml(value)}">`;

export const buildPromptSdlcLocalGuidePageBody =
  (): string => `<section class="card">
      <p class="eyebrow">Prompt SDLC</p>
      <h1>How Prompt SDLC works</h1>
      <p class="lede">You give it a prompt and a goal. A judge scores the prompt. Under the pass score, an improver rewrites it, and the judge scores again. The loop stops when the score passes, or after 3 rounds. The pass score starts at ${PROMPT_SDLC_PASS_SCORE}.</p>
      <p><a href="/prompt-sdlc">Back to Prompt SDLC</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>You set the pass score with the slider. The bar fades from a weak score to a pass. The mark is the usual ${PROMPT_SDLC_PASS_SCORE}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${renderPromptSdlcLocalScoreScale(PROMPT_SDLC_PASS_SCORE)}
      <h2>Writers and folder</h2>
      <p>You choose the judge and the improver. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can use that folder as context. The default is your home directory. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_GOAL)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_WEAK_PROMPT)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_STRONGER_PROMPT)}</pre>
      <form class="actions" method="POST" action="/prompt-sdlc">
        ${hidden("intent", "run")}
        ${hidden("goal", PROMPT_SDLC_LOCAL_GUIDE_GOAL)}
        ${hidden("prompt", PROMPT_SDLC_LOCAL_GUIDE_WEAK_PROMPT)}
        ${hidden("folder", "~")}
        ${hidden("passScore", String(PROMPT_SDLC_PASS_SCORE))}
        <button class="btn btn-primary" type="submit">Run this sample</button>
        <a class="btn btn-secondary" href="/prompt-sdlc?example=${PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE}">Open it in the form</a>
      </form>
    </section>`;
