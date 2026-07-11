---
name: skill-post-change-verification
description: >-
  Post-edit verification mindset: staged scope, hooks non-bypassable, fix-forward; pairs with verify/commit command docs only.
---

## Mindset

- Fast loops catch obvious regressions early; exhaustive CI catches integration drift.
- Fix red before refactors widen—compound failures hide root cause.
- Treat formatter/linter churn as signals of inconsistent conventions worth addressing once.

## Verified commit expectations

- Static checks, types, and targeted tests should reflect the **actual** files you staged.
- Parallel commands are an optimization; completeness beats wall-clock speed.
- If hooks fail, fix forward—bypassing hooks trades a minute now for hours later.

Workflow entrypoints: **`.cursor/commands/command-README.md`**, **`.cursor/commands/command-verify-post-change-lint-typecheck-tests.md`**, **`.cursor/commands/command-git-commit-comprehensive-review.md`**, **`.cursor/commands/command-verify-commit-parallel-checks.md`**, **`.cursor/commands/references/post-change-verification/reference-full-process.md`** (legacy stub).
