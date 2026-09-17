# Agent request routing (daily-magic)

**Authoritative source:** **`.cursor/harness/agent-bootstrap.manifest.json`**

Human-readable mirror — when this file disagrees with the manifest, the manifest wins. Regenerate **`.cursor/harness/git-hooks.md`** with **`npm run harness:sync`**.

## Agent usage

```bash
npm run harness:bootstrap
npm run harness:bootstrap -- --match="quick commit"
npm run harness:bootstrap -- --workflow=verify
```

Bootstrap rule: **`rules-harness-bootstrap.mdc`**.

## Skip (no command attachment)

See manifest `skip.signals` — explanation-only, review-only, status, meta chat.

## Priority (first match wins)

See manifest `routing` (sorted by `priority`). Examples:

| Priority | Signals (subset)                | Command                                              |
| -------- | ------------------------------- | ---------------------------------------------------- |
| 1        | comprehensive commit            | `command-git-commit-comprehensive-review.md`         |
| 2        | commit, quick commit            | `command-git-commit-quick.md`                        |
| 8        | verify, lint, typecheck         | `command-verify-post-change-lint-typecheck-tests.md` |
| 9        | structure, validate staged      | workflow `structure` only                            |
| 9        | AWC, AWL, AWB, AWI, deployables | read `docs/product/agent-witch-deployables.md`       |
| 12       | refactor gate, apps/live, …     | workflow `refactor-safety` → `test:refactor-gate`    |

## Workflows (scripts — do not duplicate in rules)

| Workflow          | Scripts                                                        |
| ----------------- | -------------------------------------------------------------- |
| `verify`          | `cursor:verify`, `lint`, `typecheck`, Vitest `--changed`       |
| `commit`          | `validate:staged` + Husky manifest                             |
| `pr`              | `validate:staged`, `cursor:architecture --staged`, `typecheck` |
| `structure`       | `validate:staged`                                              |
| `refactor-safety` | `npm run test:refactor-gate`                                   |

## Trackers

GitHub (`gh`), Linear branch keys — no Bitbucket / Jira CLI / Sentry harness in this repo.
