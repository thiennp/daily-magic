# Task composer — known issues

| ID        | Symptom                                                                                                           | Fix / test                                                                        |
| --------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| AGENT-001 | Send-task modal skipped Mac picker when paired devices were still loading, so multi-Mac users never saw selection | Wait for device load before auto-skipping; `resolveWsTestComposerMacStep.test.ts` |
| AGENT-002 | Live terminal mirror stayed empty during writer session start until ready, hiding the local CLI output            | Stream `command.writer.session.chunk`, show pending command while starting        |
