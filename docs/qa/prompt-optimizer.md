# How does the prompt optimizer work?

## Query aliases

- prompt sdlc
- optimize a prompt
- prompt judge and improver
- tối ưu prompt
- cham diem prompt
- why does prompt sdlc use codex
- writer available check fallback token
- prompt sdlc folder
- remember folder judge improver
- choose where to run the prompt
- bot prompt sdlc agent
- prompt optimizer local context harness code
- why agent witch prompt score is reliable
- awl did not update optimizer
- install bundle version prompt sdlc
- edit skill name description prompt
- save skill prompt content
- judge checks the prompt or the output
- field info tooltip prompt sdlc

## Short answer

The prompt optimizer is in the console at `/prompt-optimizer`. That page tells you to run it in Agent Witch Live at `http://127.0.0.1:43347/prompt-optimizer`. The console does not run the optimizer. You paste a prompt and a goal, choose the folder, then pick judge, improver, and runner. **Run** starts the four-step wizard (generalize → evaluate → separate → optimize modules). Wizard evaluate defaults use pass score **70** and up to **5** scored revisions; step 4 runs one runner trial per module and the judge scores only. An info icon on each field shows a best practice and an example when you focus it; press Escape to close. Each list includes the installed writers plus I'll score it and I'll rewrite it. The folder, judge, improver, and runner you last chose are filled in on the next visit. The first visit leaves those roles blank and uses your home directory (`~`). There is no Mac picker. Instructions and a support-reply example are at `/prompt-optimizer/guide`. History lists a short title for each run, and Delete removes that run. While a writer is working, the run panel stays on screen and refreshes itself; use **End wizard** or **Skip module**. Writers run in the folder you chose, so they can read the harness and the code. A bot on this Mac calls `GET` and `POST http://127.0.0.1:43347/prompt-optimizer/agent` itself before `send_task`. `POST` starts the same wizard. Poll `GET ?cycle=` until `done` is true. Use `bestPrompt` when `status` is `passed` or `stopped`. The same steps are on `/for-agents`.

## Wizard (Live)

- **Run** starts the wizard: Step 1 generalize `{{placeholders}}`, Step 2 evaluate prompt revisions (wizard defaults pass **70**, up to **5** rounds; judge scores prompt text only), Step 3 separate into up to three **chain** or **parallel** splits, Step 4 **one trial run per module** (runner executes, judge scores). Compose shows wizard limits in the sticky **Run** bar. The old single-prompt judge/improver loop is removed; you cannot start it from the UI or agent API.
- During execution, wizard uses **End wizard** / **Skip module**. Older legacy runs without wizard state may still appear in History under **All**.
- Wizard completion is **passed** only when every module’s best score is at least the wizard pass score; otherwise the cycle is **stopped** (not a separate status). The outcome card lists each module’s best score, tokens, and status.
- **Chain** splits pass the prior module’s best runner output to the next module; **parallel** modules are independent. Step 4 parameter gates show a chain handoff preview when relevant.
- Bots: `POST /prompt-optimizer/agent` starts a **wizard** run with the same wizard pass/round defaults as compose.
- A paused or running wizard you are not viewing shows in the **Wizard in progress** / **Wizard running** card with **View inputs** (goal, prompt, judge, improver, runner).

## Details

- Preference order is Claude, then Codex, then Cursor, then Antigravity. Those are the defaults. The form always has a Judge select and an Improver select, including when no writer is installed. Small and local models are not used. Cursor Cloud is not required.
- “Installed” means the CLI version command exits 0 within 3 seconds: `claude -v`, `codex --version`, `cursor agent -v` or standalone `agent -v` (Cursor Cloud Agent VM / `~/.local/bin/agent`), `antigravity --version`. Choosing a writer sends a one-word prompt the first time. A success is remembered, so that writer is not checked again until a later run returns a writer error. A login, API key, or quota error is shown on that writer; **Run** stays clickable and the sticky bar shows why you cannot start yet. That error is not saved as a prompt and is not scored.
- There is no user command that checks token balance before a run, and a failed writer does not fall through to the next one. The cycle stops as failed.
- In wizard step 2, the judge scores prompt revisions only (no folder run). In step 4, the runner executes the module prompt, then the judge scores the git changes or the files the prompt names. The folder is put back after that score so the next trial does not inherit previous edits. A judge reply is a score from 0 to 100 and a reason. Judge, improver, and runner can each be a writer or you. Manual score/rewrite pauses that step. Wizard evaluate uses pass **70** and up to **5** rounds; step 4 runs one trial per module. **End wizard** / **Skip module** stop writers for wizard runs. Legacy cycles without wizard state can still use **Stop run**. After each scored round the page shows tokens spent so far. Evaluate also stops after 3 judged rounds that do not beat the best score. The next rewrite starts from the highest scoring prompt; lower-score reasons become an avoid list.
- Click a timeline step to open the score, the feedback, and the prompt saved for that step. When the run finishes, the page shows the highest scoring prompt. A tie keeps the later round. After the folder is chosen, a skill list shows `.cursor/skills` in that folder. Choosing one fills the prompt. Save as a skill starts from that skill’s name, description, and file name, and also shows the highest scoring prompt. You can edit them. A blank description is left out. If that file is already there, the page asks you to confirm before it replaces the skill. The agent snapshot includes `bestPrompt`, `bestScore`, `bestRound`, `totalTokens`, and `useThisPrompt`. `useThisPrompt` is true when the status is `passed` or `stopped`.
- Wizard pass score is **70** (evaluate and module gates). At 70 the scale bands adjust around that threshold. Each step is a dot on a vertical line. A finished step is a filled dot. The step in progress is a spinner. A score looks like `22 / 100 (bad)`.
- The compose form stays at the top. After **Run**, an active wizard keeps compose expanded with fields locked; finished runs collapse compose. A sticky **Run** bar stays at the bottom of the compose card. **This run** sits under the form and above the wizard accordion. **Continue**, wizard **Run**, and **End wizard** / **Skip module** update **This run** and the gate through live HTML fragments (`liveFragment=1` on POST and `?fragment=run` poll) without a full page reload. End actions ask for confirmation first. History stays at the bottom.
- Delete on a history row removes that run from this Mac. Deleting the run you are looking at returns to the form. Deleting a different run keeps the open one.
- The form has a folder field. Choose folder opens the Mac folder dialog and keeps the goal and prompt. The first visit uses `~`. Live stores that folder, judge, improver, and wizard runner in `prompt-optimizer-preferences.json` beside the cycles file. A folder that no longer exists falls back to `~`. A writer that is no longer installed is left blank. Choosing the blank row clears that role. The agent API does not read this file. Writers run in that folder, so Claude and Cursor can use its files as context. The reply file stays in a temporary directory.
- A reply that is not a score stops the cycle. The raw reply is kept on the judgement. A writer terminal error is not saved as the next prompt.
- Cycles stay in `prompt-optimizer-cycles.json` beside the Mac profile config (atomic writes; optional `prompt-optimizer-wizard.log.jsonl` event log). Wizard runs store four steps—generalize (`{{variables}}`), evaluate (default pass 70, 5 rounds; **judge scores prompt text only**, no folder run), separate (up to 3 options, one recommended), then per-module optimize (**Runner** executes, judge scores only). The start form includes **Runner** and **Runner instructions** for step 4. After evaluate, Continue carries your chosen revision into step 3 for wording context, but **Separate** splits the **generalized** `templatedPrompt` and keeps `{{placeholders}}` in each module suggestion (sample values are not pasted into module text). After you pick a split and Continue, **Step 4** opens on a **parameter gate**: each `{{name}}` in the current module prompt gets an input (prefilled from Step 1 sample values when known). Continue on that gate starts the runner + judge for that module. When the round finishes, the **review gate** shows scored rounds; Continue advances to the next module’s parameter gate or completes the wizard. While a module runs, the page shows a **Step 4 in progress** card above **This run**. Split and evaluate radios sit inside the same gate form so Continue posts the selected option. Older cycles without `parameterValues` are normalized on load so Step 3 Continue does not crash AWL. Rerun with feedback can also add extra step instructions on generalize and separate. While writers run outside a gate, **This run** shows **End wizard** (or **Skip module** / **End wizard** during step 4 execution). At a paused gate, **End wizard** is a link under the step form. A **Resume wizard** banner appears when another run is paused at a gate. After each step you can Continue or rerun with feedback; state survives restart. **Run** starts the wizard only. A finished wizard shows **Download result (Markdown)** or `GET /prompt-optimizer?cycle=<id>&export=wizard-markdown`. History filters **All / Wizard** (legacy non-wizard rows remain under All). **Load wizard verification example** prefills a dogfood scenario without starting a run. Bots use `POST /prompt-optimizer/agent` to start the same wizard.
- Cycles are not capability improvements and not workflow runs.
- The console page at `/prompt-optimizer` only links to Live.
- Agent Witch Live ships inside the install bundle. The Mac keeps the previous optimizer until `AGENT_WITCH_INSTALL_BUNDLE_VERSION` increases and the rebuilt `public/install/agent-witch/app/agent-witch.js` is deployed. A source change on its own does not update a running Mac.

## Related

- [Product concepts](../product/concepts.md)
- `src/features/prompt-optimizer/README.md`
- `src/lib/promptOptimizer/continuePromptSdlc.ts`

## Last reviewed

2026-09-30
