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

export const buildPromptSdlcLocalGuidePageBody =
  (): string => `<section class="card">
      <p class="eyebrow">Prompt SDLC</p>
      <h1>How a goal changes the prompt</h1>
      <p class="lede">The goal is the outcome of using the prompt. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <p><a href="/prompt-sdlc">Back to Prompt SDLC</a></p>
      <h2>Goal</h2>
      <p>${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_GOAL)}</p>
      <h2>Weak prompt</h2>
      <pre class="mono">${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_WEAK_PROMPT)}</pre>
      <p class="muted">This prompt can still invent a refund or skip the question the customer asked. Adding the goal sentence would not stop that.</p>
      <h2>What a better prompt does</h2>
      <pre class="mono">${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_STRONGER_PROMPT)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-sdlc?example=${PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE}">Load this example and try a run</a>
      </div>
    </section>`;
