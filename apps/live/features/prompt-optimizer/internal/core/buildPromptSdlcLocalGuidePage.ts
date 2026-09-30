import {
  PROMPT_SDLC_WIZARD_MAX_ROUNDS,
  PROMPT_SDLC_WIZARD_PASS_SCORE,
} from "../../../../adapters/promptSdlcAwcCore";
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
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module—the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${PROMPT_SDLC_WIZARD_PASS_SCORE}</strong> and up to <strong>${PROMPT_SDLC_WIZARD_MAX_ROUNDS}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${PROMPT_SDLC_WIZARD_PASS_SCORE}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${renderPromptSdlcLocalScoreScale(PROMPT_SDLC_WIZARD_PASS_SCORE)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this Mac</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${PROMPT_SDLC_WIZARD_PASS_SCORE}, up to ${PROMPT_SDLC_WIZARD_MAX_ROUNDS} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
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
