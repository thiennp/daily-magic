# Prompt optimizer

Console page for the prompt optimizer (**AWC**). `/prompt-optimizer` tells the person to run it in Agent Witch Live (`http://127.0.0.1:43347/prompt-optimizer`). The console does not run the wizard. You choose the folder and the writers on Live. **Run** starts the four-step wizard so writers can read the harness and the code in that folder. Bots on this computer call `http://127.0.0.1:43347/prompt-optimizer/agent` (same wizard).

## Registry

- **Slug:** `prompt-sdlc`
- **Feature path:** `src/features/prompt-optimizer`
- **Lib path:** `src/lib/promptOptimizer`
- **Migration:** `db/migrations/036-prompt-sdlc.sql`

## Product concepts

The prompt is the artifact. A wizard cycle stores generalize / evaluate / separate / optimize-module state. Evaluate uses pass score **70** and up to **5** scored revisions; step 4 runs one runner trial per module. **End wizard** or **Skip module** stops writers during a wizard run. After a folder is chosen, its skills can fill the prompt. A finished wizard shows the best prompts per module. Save as a skill uses that skill’s name, description, and file name, and asks before replacing an existing file. On Agent Witch Live, judge, improver, and runner are installed reasoning writers, or you. Live fills in the last folder and roles on the next visit. Local and small models are not used.

This feature does not write `capability_improvements` and does not run a workflow graph.

## Routes

- `/prompt-optimizer` and `/prompt-optimizer/guide` live in the console app chrome and tell the person to run the wizard in Agent Witch Live.
- The wizard itself is `http://127.0.0.1:43347/prompt-optimizer`.

## APIs

- `GET /api/prompt-optimizer/models`
- `GET /api/prompt-optimizer/cycles`
- `POST /api/prompt-optimizer/cycles`
- `GET /api/prompt-optimizer/cycles/:cycleId`
- `POST /api/prompt-optimizer/cycles/:cycleId/advance`
- `POST /api/prompt-optimizer/cycles/:cycleId/local-result`

Installed-writer discovery goes through AWB: `GET /prompt-optimizer/models`.

## Dependencies

- `dispatch`
- `agent-witch`

Query: `npm run feature-knowledge:query -- "..." --feature=prompt-optimizer`
