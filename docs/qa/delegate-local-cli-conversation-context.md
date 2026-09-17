# When the user delegates to a local CLI (e.g. Cursor), how does the next message keep context?

## Query aliases

- delegate task local CLI conversation context
- message tiếp theo giữ context cursor claude
- continue session send a task
- `--continue` writer agent Mac
- job history continue sourceRunId
- tiếp tục hội thoại agent witch

## Short answer

Yes — Agent Witch uses a **dual path**: (1) **`--continue`** when the CLI thread is still warm; (2) **local dual-store** under `~/.agent-witch/writer-sessions/` — a **canonical** JSON transcript (full user prompts + assistant outputs per turn, viewable on AWL at `/writer-sessions`) and a **continuation** JSON bundle (truncated injection body for cold continue). Job-history continue with `sourceRunId` still uses `buildContinuationPromptWithContext` from a single prior run when needed.

## Details

| Scenario                                   | AWC (browser)                                                                     | Mac (AWI client)                                                                                                 | CLI                                                                              |
| ------------------------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Second message while live panel still open | `resolveIsWriterSessionContinuation` → `sessionContinuation: true` on WS dispatch | `isWriterConversationStarted` → `sessionTurn: "continue"`                                                        | `cursor agent --continue …`, `claude-cli --continue …`, antigravity `--continue` |
| Continue from job detail / URL             | `continueSession=1`, `sourceRunId` query params; pin `deviceId` (AGENT-043/044)   | `resolveWriterDispatchRoute` → cold `source_run_seed` / `transcript_seed`, or hot `cli_continue` (no RAG/memory) | Same as above, or transcript seed                                                |
| User ends writer session                   | `command.writer.session.end`                                                      | `clearWriterSession` + `endActiveWriterTranscriptSession` (active index cleared; canonical files kept)           | Next dispatch is `first` unless query/history says continue                      |
| Codex writer                               | Same dispatch flags where applicable                                              | No `--continue` in `buildWriterCliInvocation`                                                                    | `codex exec -s danger-full-access <prompt>` each time                            |

Flow (typical Cursor follow-up in one live session):

```text
AWC Send-a-task (hasSentUserPrompt)
  → dispatchClaudePrompt({ sessionContinuation: true })
  → Mac startAgentWitchClient: sessionTurn = "continue"
  → buildWriterCliInvocation(..., { sessionTurn: "continue" })
  → cursor agent --continue -p … "<new message>"
  → markWriterConversationStarted("cursor")
```

Cold thread with active local transcript (no `sourceRunId`):

```text
AWC continueSession + sessionTurn first
  → loadWriterSessionCanonical(active session)
  → buildWriterSessionColdContinuePrompt({ priorTurns, userMessage })
  → append turn on finishRun → update *.continuation.json
```

After each finished turn (including while using `--continue`):

```text
finishRun → appendWriterTranscriptTurn (user prompt + assistant output)
  → ~/.agent-witch/writer-sessions/<sessionId>.canonical.json
  → ~/.agent-witch/writer-sessions/<sessionId>.continuation.json
```

Regression IDs: **AGENT-026** (finished jobs + continue conversation), **AGENT-044** (history continue + local cache seeding). Tests: `resolveIsWriterSessionContinuation.test.ts`, `buildContinuationPromptWithContext.test.ts`, `writerSessionTranscriptStore.test.ts`, `buildWriterSessionContinuationInjection.test.ts`, `agentWitchWriterSession.test.ts`, `buildWriterCliInvocation.test.ts`.

## Related

- `apps/install/entry/startAgentWitchClient.ts` — session turn + prompt seeding
- `scripts/buildWriterCliInvocation.ts` — `--continue` for cursor / claude-cli / antigravity
- `scripts/agentWitchWriterSession.ts` — per-writer in-memory session on Mac
- `apps/live/features/memory/internal/core/writerSessionTranscriptStore.ts` — canonical + continuation files
- AWL **`/writer-sessions`** — read canonical transcripts
- `src/features/agent/utils/resolveIsWriterSessionContinuation.ts` — browser-side continuation gate
- `src/features/agent/KNOWN_ISSUES.md` — AGENT-026, AGENT-044

## Last reviewed

2026-09-17
