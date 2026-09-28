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

export const buildPromptSdlcLocalGuidePageBody =
  (): string => `<section class="card">
      <p class="eyebrow">Prompt SDLC</p>
      <h1>How Prompt SDLC works</h1>
      <p class="lede">You give it a prompt and a goal. A judge scores the prompt. Under the pass score, an improver rewrites it, and the judge scores again. The loop stops when the score passes, you press Finish, the round limit is hit, or the score has not risen for 3 rounds. Finish ends the writers and counts the run as complete. After each scored round the page shows the tokens spent so far. The next rewrite always starts from the highest scoring prompt. Reasons from lower scores become an avoid list. After 3 tries that do not beat the best, the run stops and those reasons are included. The round limit starts at 10. Click a step to see the score, the feedback, and the prompt saved for that step. When the run finishes, the highest scoring prompt is shown. You can edit its name, an optional description, and the prompt text, then save it as a skill in the folder you chose. The pass score starts at ${PROMPT_SDLC_PASS_SCORE}.</p>
      <p><a href="/prompt-sdlc">Back to Prompt SDLC</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>You set the pass score with the slider. The bar fades from a weak score to a pass. The mark is the usual ${PROMPT_SDLC_PASS_SCORE}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${renderPromptSdlcLocalScoreScale(PROMPT_SDLC_PASS_SCORE)}
      <h2>Writers and folder</h2>
      <p>You choose the judge and the improver. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The default is your home directory. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot runs this loop itself before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-sdlc/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a run in that folder. maxRounds is optional and defaults to 10. When only one writer is installed, that writer scores and rewrites. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_GOAL)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_WEAK_PROMPT)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_STRONGER_PROMPT)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-sdlc?example=${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE)}">Run this sample</a>
      </div>
    </section>`;
