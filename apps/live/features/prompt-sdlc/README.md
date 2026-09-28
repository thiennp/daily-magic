# Prompt SDLC (Agent Witch Live)

Optimize one prompt on this Mac. When more than one reasoning writer is installed, you choose the judge and the improver. Nothing is selected until you choose. You also choose the folder they run in, so they can use that folder as context. The default folder is your home directory. One installed writer fills both roles. A writer that has passed its check is not checked again until that writer returns an error.

## Registry

- **Slug:** `prompt-sdlc`
- **Feature path:** `apps/live/features/prompt-sdlc`

## Routes

- `http://127.0.0.1:43347/prompt-sdlc`
- `http://127.0.0.1:43347/prompt-sdlc/guide`

Cycles are stored in `prompt-sdlc-cycles.json` beside the Mac profile config. Writers run in the folder you choose. The reply file stays in a temporary directory. `/prompt-sdlc/guide` explains the loop and can start the sample. History shows a short title, the first clause of the goal, and Delete removes that run. Steps are a timeline of dots. The pass score defaults to 90 and can be set from 1 to 100.
