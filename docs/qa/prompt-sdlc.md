# How does Prompt SDLC optimize a prompt?

## Query aliases

- prompt sdlc
- optimize a prompt
- prompt judge and improver
- tối ưu prompt
- cham diem prompt
- why does prompt sdlc use codex
- writer available check fallback token
- prompt sdlc folder
- choose where to run the prompt
- bot prompt sdlc agent
- prompt optimizer local context harness code
- why agent witch prompt score is reliable

## Short answer

Prompt SDLC runs in Agent Witch Live at `http://127.0.0.1:43347/prompt-sdlc`. You paste a prompt and a goal. You choose who scores the prompt and who rewrites it. Each list includes the installed writers plus I'll score it and I'll rewrite it. Nothing is selected until you choose. You choose the folder the writers run in. The default is your home directory (`~`). A judge reply is a score and a reason. You set the pass score with a slider. The default is 90. The track fades from red through orange and yellow into green, and a mark shows the usual 90. If the score is under that number, the improver rewrites the prompt and the judge runs again until the score passes. Later rewrites include earlier scores and reasons. When the score is not higher than the best earlier score, earlier prompt text is included too, newest first. There is no Mac picker. Instructions and a support-reply example are at `/prompt-sdlc/guide`. Run this sample opens the form with that goal and prompt filled in. Choose the judge and improver, then Run. History lists a short title for each run, not the full goal, and Delete removes that run. The page lists each step of the open run as a timeline, including the step in progress. While a writer is working, the run panel stays on screen, shows a timer, and refreshes itself. The form below it keeps the choices for that run and stays locked until the run finishes. The rest of the page does not reload. The judge and the improver run in the folder you chose, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A bot on this Mac calls `GET` and `POST http://127.0.0.1:43347/prompt-sdlc/agent` itself before `send_task`. It does not ask the human to paste the prompt into a different optimizer. `GET` lists installed writers. `POST` needs `goal`, `prompt`, and `workingDirectory`. When only one writer is installed, omit `judge` and `improver`. Poll `GET ?cycle=` until `done` is true, and use the prompt only when `status` is `passed`. The same steps are on `/for-agents`.

## Details

- Preference order is Claude, then Codex, then Cursor, then Antigravity. Those are the defaults. The form always has a Judge select and an Improver select, including when no writer is installed. Small and local models are not used. Cursor Cloud is not required.
- “Installed” means the CLI version command exits 0 within 3 seconds: `claude -v`, `codex --version`, `cursor agent -v`, `antigravity --version`. Choosing a writer sends a one-word prompt the first time. A success is remembered, so that writer is not checked again until a later run returns a writer error. A login, API key, or quota error is shown on that writer and Run stays disabled. That error is not saved as a prompt and is not scored.
- There is no user command that checks token balance before a run, and a failed writer does not fall through to the next one. The cycle stops as failed.
- A judge reply is a score from 0 to 100 and a reason for that score. A number alone is not a verdict. The reason is shown with the score. The improver receives that score and that reason. Judge and improver can each be a writer or you. I'll score it and I'll rewrite it pause the run for that step. The other steps still use the writer you chose. The loop does not stop at a fixed round count. Each later improver prompt includes earlier scores and reasons. When the latest score is not above the best earlier score, earlier prompt text is included too, newest first, inside a 6,000 character budget. A human rewrite form shows that same history.
- Click a timeline step to open the score, the feedback, and the prompt saved for that step. When the run finishes, the page shows the highest scoring prompt. A tie keeps the later round. Save as a skill writes `.cursor/skills/<slug>/SKILL.md` in the folder for that run. The agent snapshot includes `bestPrompt`, `bestScore`, and `bestRound`.
- The pass score must be a whole number from 1 to 100. The default is 90. The track fades across the same colors as the score scale. A mark stays at the usual 90. At 90 the scale is 0–44 bad, 45–69 weak, 70–89 close, and 90–100 passes. The judge is told that same number. Each step is a dot on a vertical line. A finished step is a filled dot. The step in progress is a spinner. A score looks like `22 / 100 (bad)`.
- While a run is working, the form sits under that run and stays filled with the goal, prompt, folder, pass score, judge, and improver. The fields are locked. When the run finishes, those fields unlock and keep the same values. History is below the form.
- Delete on a history row removes that run from this Mac. Deleting the run you are looking at returns to the form. Deleting a different run keeps the open one.
- The form has a folder field. Choose folder opens the Mac folder dialog and keeps the goal and prompt. The default is `~`. Writers run in that folder, so Claude and Cursor can use its files as context. The reply file stays in a temporary directory.
- A reply that is not a score stops the cycle. The raw reply is kept on the judgement. A writer terminal error is not saved as the next prompt.
- Cycles stay in `prompt-sdlc-cycles.json` beside the Mac profile config. They are not capability improvements and not workflow runs.
- The console page at `/prompt-sdlc` only links to Live.

## Related

- [Product concepts](../product/concepts.md)
- `src/features/prompt-sdlc/README.md`
- `src/lib/promptSdlc/continuePromptSdlc.ts`

## Last reviewed

2026-09-28
