# Agent request routing (daily-magic)

Match user intent to a command playbook when one exists.

## Routing table

| Signals                              | Command                                              |
| ------------------------------------ | ---------------------------------------------------- |
| verify, lint, typecheck, post-change | `command-verify-post-change-lint-typecheck-tests.md` |
| commit, quick commit                 | `command-git-commit-quick.md`                        |
| comprehensive commit, full review    | `command-git-commit-comprehensive-review.md`         |
| pull request, open PR, gh pr         | `command-github-pull-request.md`                     |
| extract utility, dedupe logic        | `command-refactor-extract-utility.md`                |
| unit test, coverage                  | `command-test-raise-unit-coverage.md`                |
| structure, folder layout             | `npm run validate:staged`                            |

## Trackers & hosting

- **GitHub** — issues, PRs, Actions (`gh` CLI)
- **Linear** — issues via Linear MCP/API when configured
- Do **not** use removed EnergyCenter flows (Bitbucket PR scripts, Jira ticket fetchers, Sentry triage commands)
