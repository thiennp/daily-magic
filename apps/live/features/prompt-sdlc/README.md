# Prompt SDLC (Agent Witch Live)

Optimize one prompt on this Mac. Live chooses the best installed reasoning writer as the judge and the next best as the improver.

## Registry

- **Slug:** `prompt-sdlc`
- **Feature path:** `apps/live/features/prompt-sdlc`

## Routes

- `http://127.0.0.1:43347/prompt-sdlc`
- `http://127.0.0.1:43347/prompt-sdlc/guide`

Cycles are stored in `prompt-sdlc-cycles.json` beside the Mac profile config. The loop does not edit the repo: each writer call uses a temporary folder.
