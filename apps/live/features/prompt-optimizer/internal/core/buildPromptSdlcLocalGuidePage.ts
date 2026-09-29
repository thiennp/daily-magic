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
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module—the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. <strong>Classic loop (90 / 10 rounds)</strong> skips the wizard: a judge scores the prompt in your folder, an improver rewrites under the pass score, and the loop stops when the score passes, you press Finish, the round limit is hit, or the score has not risen for 3 rounds. After each scored round the page shows tokens spent. The next rewrite starts from the highest scoring prompt; lower scores become an avoid list. The round limit starts at 10 on classic runs (wizard evaluate defaults differ). Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field. The pass score slider defaults to ${PROMPT_SDLC_PASS_SCORE} on classic runs.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>You set the pass score with the slider. The bar fades from a weak score to a pass. The mark is the usual ${PROMPT_SDLC_PASS_SCORE}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${renderPromptSdlcLocalScoreScale(PROMPT_SDLC_PASS_SCORE)}
      <h2>Writers and folder</h2>
      <p>You choose the judge and the improver. Each one has an optional instructions field, used with the goal. Each round the judge runs the prompt in the folder you chose. If the prompt needs an input, put that input in the judge instructions. The judge then reads the git changes, or the files the prompt names, and scores those changes. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder. It does not guess a printed reply, and it does not score the prompt wording. A separate pass checks the tokens and suggests what to cut before the improver runs. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, and improver you last chose. The first visit uses your home directory and leaves the judge and improver blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot runs this loop itself before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a run in that folder. maxRounds is optional and defaults to 10. When only one writer is installed, that writer scores and rewrites. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_GOAL)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_WEAK_PROMPT)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_STRONGER_PROMPT)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${escapeHtml(PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE)}">Run this sample</a>
      </div>
    </section>`;
