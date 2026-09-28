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

## Short answer

Prompt SDLC runs in Agent Witch Live at `http://127.0.0.1:43347/prompt-sdlc`. You paste a prompt and a goal. When more than one reasoning writer is installed, you choose the judge and the improver. One installed writer fills both roles. Defaults are Claude, then the next installed writer. You choose the folder the writers run in. The default is your home directory (`~`). The judge returns a score. If the score is under 80, the improver rewrites the prompt and the judge runs again, up to 3 rounds. There is no Mac picker and no human step between the score and the rewrite. Instructions and a support-reply example are at `/prompt-sdlc/guide`. Run this sample starts that example. Open it in the form loads the same goal and prompt so you can edit them first. History lists a short title for each run, not the full goal. The page lists each step of the open run, including the step in progress. While a writer is working, the run panel stays on screen, shows a timer, and refreshes itself. The rest of the page does not reload.

## Details

- Preference order is Claude, then Codex, then Cursor, then Antigravity. Those are the defaults. When more than one is installed, the form shows a Judge select and an Improver select. If only one is installed, it fills both roles and the form has no select. Small and local models are not used. Cursor Cloud is not required.
- “Installed” means the CLI version command exits 0 within 3 seconds: `claude -v`, `codex --version`, `cursor agent -v`, `antigravity --version`. Choosing a writer then sends a one-word prompt. A login, API key, or quota error is shown on that writer and Run stays disabled. That error is not saved as a prompt and is not scored.
- There is no user command that checks token balance before a run, and a failed writer does not fall through to the next one. The cycle stops as failed.
- The open run shows a score scale: 0–39 bad, 40–59 weak, 60–79 close, and 80–100 passes. Each step is a node in a tree. A score line looks like `22 / 100 (bad)`.
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
