# Cursor commands (daily-magic)

Slash-style workflows for this Next.js repo. Use with GitHub, Linear, or other trackers — **no Bitbucket/Jira/Sentry automation** in this harness.

## Verification

| Command                                              | Purpose                                       |
| ---------------------------------------------------- | --------------------------------------------- |
| `command-verify-post-change-lint-typecheck-tests.md` | Lint, typecheck, and build after code changes |

## Git

| Command                                      | Purpose                                     |
| -------------------------------------------- | ------------------------------------------- |
| `command-git-commit-quick.md`                | Stage, conventional commit, verify          |
| `command-git-commit-comprehensive-review.md` | Fuller pre-commit review for larger changes |
| `command-github-pull-request.md`             | Push branch and open PR with `gh`           |

## Refactor & tests

| Command                                 | Purpose                                 |
| --------------------------------------- | --------------------------------------- |
| `command-refactor-extract-utility.md`   | Extract duplicated logic into utilities |
| `command-test-raise-unit-coverage.md`   | Add focused unit tests                  |
| `command-test-snapshot-codemod-bulk.md` | Bulk component snapshot test codemod    |

## Tooling

| Command                                 | Purpose                |
| --------------------------------------- | ---------------------- |
| `command-npm-install-and-audit.md`      | Install deps and audit |
| `command-dev-environment-notes.md`      | Local dev setup notes  |
| `command-chrome-launch-without-cors.md` | Browser testing helper |

## Tracker integration (bring your own)

- **GitHub:** use `gh` for issues and PRs
- **Linear:** use Linear MCP or API in the agent session
- Branch names: `feature/lin-123-short-description` or `fix/gh-42-bug-name`

Commit format: conventional commits (`feat: …`) — see `.husky/commit-msg`.
