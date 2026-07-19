# App shell — known issues

| ID        | Symptom                                                                                          | Fix / test                                              |
| --------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| SHELL-001 | Send-a-task provider lived inside per-page `AppShell`, so route changes remounted the live panel | Provider moved to root layout; sticky dock in AGENT-030 |
