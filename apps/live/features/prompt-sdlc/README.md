# Prompt SDLC (Agent Witch Live)

Optimize one prompt on this Mac. When more than one reasoning writer is installed, you choose the judge and the improver. You also choose the folder they run in, so they can use that folder as context. The default folder is your home directory. One installed writer fills both roles. Defaults are Claude, then Codex, then Cursor, then Antigravity.

## Registry

- **Slug:** `prompt-sdlc`
- **Feature path:** `apps/live/features/prompt-sdlc`

## Routes

- `http://127.0.0.1:43347/prompt-sdlc`
- `http://127.0.0.1:43347/prompt-sdlc/guide`

Cycles are stored in `prompt-sdlc-cycles.json` beside the Mac profile config. The loop does not edit the repo: each writer call uses a temporary folder.
