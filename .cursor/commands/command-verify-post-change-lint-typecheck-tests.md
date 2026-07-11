---
name: command-verify-post-change-lint-typecheck-tests
description: >-
  Runs pnpm run cursor:verify, ESLint fix on app/, TypeScript noEmit, and Vitest changed-file tests from the repo root after code edits. Use after every implementation or refactor in this repository, when fixing verification failures, or when the user asks for post-action checks before continuing.
---

# Description

Runs pnpm run cursor:verify, ESLint fix on app/, TypeScript noEmit, and Vitest changed-file tests from the repo root after code edits. Use after every implementation or refactor in this repository, when fixing verification failures, or when the user asks for post-action checks before continuing.

# Post-action verification

## When to use

After any change under **`app/`**, **`scripts/`** at repo root, configs, or tests—before declaring the task done or
opening a PR—unless the user scoped an exception.

## Steps

1. From the repository root, run:

   ```bash
   pnpm run cursor:verify && pnpm run lint && pnpm exec tsc --noEmit && npx vitest run --config vite.test.config.ts --changed
   ```

   **`pnpm run cursor:verify`** runs **changed-file** architecture checks (import layers, barrels, utility naming, and related standards). Use **`pnpm run cursor:verify -- --all`** for a full-repo barrel/utility audit.

   **`pnpm run lint`** runs ESLint with **`--fix`** on `app/` and resolves **`import-x/order`** issues (no blank lines
   inside an import group; blank lines only between groups).

2. Fix all failures (barrels, types, snapshots, tests). Re-run until exit code **0**.

3. Use **`pnpm ci:test`** only for the full Jenkins-equivalent gate (before merge), not for every small iteration.

## Authority

Repo rules **`.cursor/rules/rules-typescript-clean-code.mdc`** (implementation standards) and the verification expectations spelled out there point to this command for the concrete shell sequence.
