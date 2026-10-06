# Prompt optimizer (Agent Witch Local)

Optimize one prompt on this computer. You choose the judge and the improver. Each list includes I'll score it and I'll rewrite it. The next visit fills in the folder, judge, and improver you last chose. The first visit leaves those roles blank and uses your home directory. You also choose the folder they run in, so they can use that folder as context. A writer that has passed its check is not checked again until that writer returns an error. A score includes the reason for that score.

## Registry

- **Slug:** `prompt-sdlc`
- **Feature path:** `apps/live/features/prompt-optimizer`

## Routes

- `http://127.0.0.1:43347/prompt-optimizer`
- `http://127.0.0.1:43347/prompt-optimizer/guide`

Cycles are stored in `prompt-optimizer-cycles.json` beside the Mac profile config. The last folder, judge, improver, and wizard runner are stored in `prompt-optimizer-preferences.json` in that same directory. Writers run in the folder you choose. The reply file stays in a temporary directory. `/prompt-optimizer/guide` explains the four-step wizard and can start the sample. History shows a short title, the first clause of the goal, and Delete removes that run. Steps are a timeline of dots. **Run** starts the wizard (evaluate pass score **70**, up to **5** scored revisions in step 2; step 4 runs one trial per module).
