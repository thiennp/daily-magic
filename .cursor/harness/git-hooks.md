# Git hooks manifest (Husky)

Authoritative source: `.cursor/harness/agent-bootstrap.manifest.json`. Regenerate with `npm run harness:sync`.

Machine enforcement for commits. Agents load via `npm run harness:bootstrap -- --workflow=commit`, not every turn.

Sources: `.husky/pre-commit`, `.husky/commit-msg`, `.husky/pre-push`.

## pre-commit (staged files)

| Step         | When staged paths match        | Command / script                        |
| ------------ | ------------------------------ | --------------------------------------- |
| Prettier     | *.{js,jsx,ts,tsx,json,css,md}  | prettier --write (staged) + re-stage    |
| ESLint fix   | src/**/*.{ts,tsx,js,jsx}       | eslint --fix (staged) + re-stage        |
| Structure    | src/, db/, public/             | npm run validate:staged                 |
| Architecture | src/**/*.{ts,tsx}              | npm run cursor:architecture -- --staged |
| Typecheck    | src JS/TS or toolchain configs | npm run typecheck                       |

## pre-push

| Step      | When       | Command / script                                                                                   |
| --------- | ---------- | -------------------------------------------------------------------------------------------------- |
| CI parity | every push | npm run ci (test, ci:architecture, typecheck, build — matches .github/workflows/ci.yml verify job) |

## commit-msg

- Conventional commits: `feat:`, `fix(scope):`, `chore:`
- Ticket prefix also accepted: `LIN-123: (feat) …`, `GH-42: (fix) …`

## Policy

- Do not bypass hooks (--no-verify) unless a human explicitly requests it
- Stage .feature-knowledge/index.json whenever it changed

## Agent workflows (beyond hooks)

- Verify: `npm run harness:bootstrap -- --workflow=verify`
- Command: @.cursor/commands/command-verify-post-change-lint-typecheck-tests.md
