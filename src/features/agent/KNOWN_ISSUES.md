# Task composer — known issues

| ID        | Symptom                                                                                                           | Fix / test                                                                                               |
| --------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| AGENT-001 | Send-task modal skipped Mac picker when paired devices were still loading, so multi-Mac users never saw selection | Wait for device load before auto-skipping; `resolveWsTestComposerMacStep.test.ts`                        |
| AGENT-002 | Live terminal mirror stayed empty during writer session start until ready, hiding the local CLI output            | Stream `command.writer.session.chunk`, show pending command while starting                               |
| AGENT-003 | Writer session chunks were dropped when the Mac agent omitted `deviceId` while the session targeted a paired Mac  | Allow executor publish when agent `deviceId` is absent; `npm run agent-witch:test-writer-session-stream` |
| AGENT-004 | `useSendTaskModal` crashed during SSR/Suspense because the Suspense fallback rendered children without context    | Provide a no-op context value in the Suspense fallback; `SendTaskModalProvider`                          |
| AGENT-005 | Claude/Antigravity follow-ups always ran as fresh `-p` one-shots; only Cursor passed `--continue`                 | Enable session continuation for claude-cli + antigravity; `buildWriterCliInvocation.test.ts`             |
| AGENT-006 | Send-a-task showed raw Mac CLI mirror; users needed terminal literacy to follow progress                          | Plain-language progress feed for stepped composer; `buildAgentLiveProgressSteps.test.ts`                 |
| AGENT-007 | Progress feed only showed generic labels like “Working on your request…” without agent-authored step detail       | Agents emit `[[PROGRESS]]` blocks; feed renders per-step title + detail; `parseAgentLiveProgressUpdates` |
