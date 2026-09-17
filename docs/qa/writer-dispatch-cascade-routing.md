# Writer dispatch cascade routing (Mac / AWI)

## Query aliases

- cascade routing writer dispatch Agent Witch
- tier context budget RAG memory continue
- when does Mac skip RAG on --continue
- routing funnel continuation transcript

## Short answer

When AWI dispatches a task to a local writer CLI, **`resolveWriterDispatchRoute`** picks how conversation continues and how much extra context (project memory + local RAG) is prepended. Hot **`--continue`** turns use a **minimal** budget: no memory block and no RAG. Cold continues seed from a prior run or writer transcript with a **standard** budget. Brand-new tasks use **standard** or **full** budgets; RAG chunks must pass a **cosine similarity floor** (`minScore`) so weak matches are dropped.

## Details

| Tier | Signal                               | Continuation                                                                     | Memory                             | RAG                          |
| ---- | ------------------------------------ | -------------------------------------------------------------------------------- | ---------------------------------- | ---------------------------- |
| 1    | Warm panel / `sessionTurn: continue` | CLI `--continue`                                                                 | Off                                | Off                          |
| 1    | Cold + `sourceRunId`                 | Inject prior run + user message                                                  | Up to 3 recent runs                | Up to 3 chunks, score ≥ 0.35 |
| 1    | Cold + active transcript             | `buildWriterSessionColdContinuePrompt`                                           | Same                               | Same                         |
| 1    | New task                             | User prompt only                                                                 | 5–8 recent runs (long prompts → 8) | Up to 5 chunks, score ≥ 0.25 |
| 2    | Short new prompt (&lt; 80 chars)     | —                                                                                | Standard                           | 2 chunks, score ≥ 0.4        |
| 3    | After each turn                      | `*.continuation.json` rebuilt from canonical transcript (deterministic truncate) | —                                  | —                            |

Implementation:

- Route plan: `apps/live/features/memory/internal/core/resolveWriterDispatchRoute.ts`
- Wired in: `apps/install/entry/startAgentWitchClient.ts` (`dispatchWriterTask`)
- RAG gating: `queryAgentWitchRag({ minScore, limit })` in `apps/live/features/knowledge/internal/core/agentWitchLocalRag.ts`

This routing does **not** choose Sonnet vs Haiku for the writer CLI; it only gates **continuation strategy** and **context injection**. Model choice stays with the harness / writer CLI.

## Related

- [delegate-local-cli-conversation-context.md](delegate-local-cli-conversation-context.md)
- Dual-store transcripts under `~/.agent-witch/writer-sessions/`

## Last reviewed

2026-09-17
