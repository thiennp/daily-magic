# Quality gates

## Agent harness

- `.cursor/` — rules, commands, skills
- `.agents/scripts/` — architecture and structure validation
- `structure-validation.config.json` — folder layout rules ([structure-validation](https://www.npmjs.com/package/structure-validation)); `npm run validate:changes` for git diff scope
- **Cursor agent hooks** — `.cursor/hooks.json` ([conventions doc](../conventions/cursor-hooks.md))
- **guardz** — runtime DTO guards at boundaries ([conventions doc](../conventions/guardz-and-structure-validation.md))

## Commands

```bash
npm run validate:staged
npm run cursor:architecture -- --staged
npm run typecheck
npm run test
npm run test:e2e:install   # once per machine
npm run test:e2e
```

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs unit tests, architecture checks, typecheck, Playwright E2E, and shipped Agent Witch install blackbox on push/PR to `main`.

## Agent docs

Pointers: `CLAUDE.md`, `AGENTS.md`. Deep technical content: `docs/` (indexed for feature knowledge). Context loading and which npm script to run when: [conventions/agent-context.md](../conventions/agent-context.md).
