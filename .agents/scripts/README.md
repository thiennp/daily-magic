# `.agents/scripts/` — automation

Run from repo root. Hygiene and verification only — **no Jira/Bitbucket/Sentry scripts**.

## Verification

| Script                         | npm script                    |
| ------------------------------ | ----------------------------- |
| `architecture-check.ts`        | `npm run cursor:architecture` |
| `verify-rules.ts`              | `npm run cursor:verify`       |
| `validate-structure-staged.sh` | `npm run validate:staged`     |

## Structure

- `lib/` — shared helpers for architecture checks (`srcLayerImportRules`, barrel allowlist, `countEffectiveSourceLines`)
- Enforces **max 100 effective lines** per `src/` file (excluding blank lines and `import` statements); runs on staged files in pre-commit via `npm run cursor:architecture -- --staged`
- `codemods/` — optional test generation utilities
- `audit/` — SOLID audit Python drivers (optional)

## Trackers

Use **GitHub** (`gh`) or **Linear** (MCP/API) from the agent session — not scripts in this folder.
