# When the user delegates to a local CLI (e.g. Cursor), how does the next message keep context?

## Query aliases

- delegate task local CLI conversation context
- message tiếp theo giữ context cursor claude
- continue session send a task
- `--continue` writer agent Mac
- job history continue sourceRunId
- tiếp tục hội thoại agent witch

## Short answer

Yes — Agent Witch handles follow-up context in **three layers**: (1) **same live Send-a-task session** on the Mac client uses in-memory writer state and passes **`--continue`** to Cursor / Claude CLI / Antigravity when the CLI thread is still warm; (2) **Continue from job history** uses `continueSession=1`, optional `sourceRunId`, and the same continuation flag on dispatch; (3) if the CLI process was cold but a prior run is known locally, the Mac **embeds the prior prompt and output** into the next prompt via `buildContinuationPromptWithContext`. **Codex** does not use `--continue`; each run is a separate `codex exec` unless context is injected in the prompt. Restarting the Mac client or ending the writer session clears in-memory continuation until history-based seeding applies.

## Details

| Scenario                                   | AWC (browser)                                                                     | Mac (AWI client)                                                                       | CLI                                                                              |
| ------------------------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Second message while live panel still open | `resolveIsWriterSessionContinuation` → `sessionContinuation: true` on WS dispatch | `isWriterConversationStarted` → `sessionTurn: "continue"`                              | `cursor agent --continue …`, `claude-cli --continue …`, antigravity `--continue` |
| Continue from job detail / URL             | `continueSession=1`, `sourceRunId` query params; pin `deviceId` (AGENT-043/044)   | If warm → `--continue`; if cold + `sourceRunId` → load `agentRunLocal` and wrap prompt | Same as above, or transcript seed                                                |
| User ends writer session                   | `command.writer.session.end`                                                      | `clearWriterSession(writerAgent)`                                                      | Next dispatch is `first` unless query/history says continue                      |
| Codex writer                               | Same dispatch flags where applicable                                              | No `--continue` in `buildWriterCliInvocation`                                          | `codex exec -s danger-full-access <prompt>` each time                            |

Flow (typical Cursor follow-up in one live session):

```text
AWC Send-a-task (hasSentUserPrompt)
  → dispatchClaudePrompt({ sessionContinuation: true })
  → Mac startAgentWitchClient: sessionTurn = "continue"
  → buildWriterCliInvocation(..., { sessionTurn: "continue" })
  → cursor agent --continue -p … "<new message>"
  → markWriterConversationStarted("cursor")
```

Cold thread after job-history continue:

```text
AWC ?continueSession=1&sourceRunId=<id>
  → Mac: sessionContinuation true but conversationStarted false
  → loadAgentRunLocal(sourceRunId)
  → buildContinuationPromptWithContext({ priorPrompt, priorOutput, userMessage })
  → single CLI invocation with seeded prompt (no --continue)
```

Regression IDs: **AGENT-026** (finished jobs + continue conversation), **AGENT-044** (history continue + local cache seeding). Tests: `resolveIsWriterSessionContinuation.test.ts`, `buildContinuationPromptWithContext.test.ts`, `agentWitchWriterSession.test.ts`, `buildWriterCliInvocation.test.ts`.

## Related

- `apps/install/entry/startAgentWitchClient.ts` — session turn + prompt seeding
- `scripts/buildWriterCliInvocation.ts` — `--continue` for cursor / claude-cli / antigravity
- `scripts/agentWitchWriterSession.ts` — per-writer in-memory session on Mac
- `src/features/agent/utils/buildContinuationPromptWithContext.ts` — transcript fallback (~12k chars tail)
- `src/features/agent/utils/resolveIsWriterSessionContinuation.ts` — browser-side continuation gate
- `src/features/agent/KNOWN_ISSUES.md` — AGENT-026, AGENT-044

## Last reviewed

2026-09-17
