# How does Prompt SDLC optimize a prompt?

## Query aliases

- prompt sdlc
- optimize a prompt
- prompt judge and improver
- tối ưu prompt
- cham diem prompt

## Short answer

Prompt SDLC runs in Agent Witch Live at `http://127.0.0.1:43347/prompt-sdlc`. You paste a prompt and a goal. Live picks the best reasoning writer installed on this Mac as the judge, and the next best as the improver. The judge returns a score. If the score is under 80, the improver rewrites the prompt and the judge runs again, up to 3 rounds. There is no Mac picker, no model picker, and no human step between the score and the rewrite. The guide at `/prompt-sdlc/guide` can load an example into the form. The page lists each step of the open run, including the step in progress, and a history of earlier runs.

## Details

- Preference order is Claude, then Codex, then Cursor, then Antigravity. Small and local models are not used. Cursor Cloud is not required.
- Each writer call runs in a temporary folder, so the loop does not edit the repo.
- A reply that is not a score stops the cycle. The raw reply is kept on the judgement.
- Cycles stay in `prompt-sdlc-cycles.json` beside the Mac profile config. They are not capability improvements and not workflow runs.
- The console page at `/prompt-sdlc` only links to Live.

## Related

- [Product concepts](../product/concepts.md)
- `src/features/prompt-sdlc/README.md`
- `src/lib/promptSdlc/continuePromptSdlc.ts`

## Last reviewed

2026-09-27
