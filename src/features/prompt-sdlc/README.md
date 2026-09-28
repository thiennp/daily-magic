# Prompt SDLC

Console pointer to Prompt SDLC. The loop runs in Agent Witch Live (`http://127.0.0.1:43347/prompt-sdlc`). You choose the folder, the pass score, and the writers. They run inside that folder so they can read the harness and the code. Bots on this Mac call `http://127.0.0.1:43347/prompt-sdlc/agent`.

## Registry

- **Slug:** `prompt-sdlc`
- **Feature path:** `src/features/prompt-sdlc`
- **Lib path:** `src/lib/promptSdlc`
- **Migration:** `db/migrations/036-prompt-sdlc.sql`

## Product concepts

The prompt is the artifact. A cycle stores the source prompt, each revision, and each judgement. The loop stops when the score reaches the pass score, at the round limit (default 10), or after 3 judged rounds that do not beat the best score. A person can stop the run. A drop rewrites the best prompt so far, and the other rounds stay in the history. A finished run shows the highest scoring prompt. Save as a skill writes it under `.cursor/skills/` in the chosen folder. On Agent Witch Live, judge and improver are installed reasoning writers, or you. Local and small models are not used. The console composer still lists Cursor Cloud for an older path; the page people open only links to Live.

This feature does not write `capability_improvements` and does not run a workflow graph.

## Routes

- `/prompt-sdlc` and `/prompt-sdlc/guide` on the console link to Agent Witch Live.
- The loop itself is `http://127.0.0.1:43347/prompt-sdlc`.

## APIs

- `GET /api/prompt-sdlc/models`
- `GET /api/prompt-sdlc/cycles`
- `POST /api/prompt-sdlc/cycles`
- `GET /api/prompt-sdlc/cycles/:cycleId`
- `POST /api/prompt-sdlc/cycles/:cycleId/advance`
- `POST /api/prompt-sdlc/cycles/:cycleId/local-result`

Installed-writer discovery goes through AWB: `GET /prompt-sdlc/models`.

## Dependencies

- `dispatch`
- `agent-witch`

Query: `npm run feature-knowledge:query -- "..." --feature=prompt-sdlc`
