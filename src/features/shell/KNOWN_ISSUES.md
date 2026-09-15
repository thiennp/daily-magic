# App shell — known issues

| ID        | Symptom                                                                                          | Fix / test                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| SHELL-001 | Send-a-task provider lived inside per-page `AppShell`, so route changes remounted the live panel | Provider moved to root layout; sticky dock in AGENT-030                                                        |
| SHELL-002 | Primary nav exposed Library / Marketplace / Job history before core loop                         | UX-001: Home → New task → Runs → Playbooks; workflow onboarding optional (`docs/product/ux-simplification.md`) |
| SHELL-003 | Team-only nav and admin link shown without group context                                         | `filterAppNavForShellContext` gates Automations + admin; Marketplace always (solo harness install)             |
