# Prompt SDLC (Agent Witch Live)

Optimize one prompt on this Mac. You choose the judge and the improver. Each list includes I'll score it and I'll rewrite it. Nothing is selected until you choose. You also choose the folder they run in, so they can use that folder as context. The default folder is your home directory. A writer that has passed its check is not checked again until that writer returns an error. A score includes the reason for that score.

## Registry

- **Slug:** `prompt-sdlc`
- **Feature path:** `apps/live/features/prompt-sdlc`

## Routes

- `http://127.0.0.1:43347/prompt-sdlc`
- `http://127.0.0.1:43347/prompt-sdlc/guide`

Cycles are stored in `prompt-sdlc-cycles.json` beside the Mac profile config. Writers run in the folder you choose. The reply file stays in a temporary directory. `/prompt-sdlc/guide` explains the loop and can start the sample. History shows a short title, the first clause of the goal, and Delete removes that run. Steps are a timeline of dots. The pass score is a slider from 1 to 100. It defaults to 90. The track turns green at the chosen score, and a mark shows 90.
