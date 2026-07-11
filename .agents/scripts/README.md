# `.agents/scripts/` — automation

Run from repo root. Hygiene and verification only — **no Jira/Bitbucket/Sentry scripts**.

## Verification

| Script                         | npm script                    |
| ------------------------------ | ----------------------------- |
| `architecture-check.ts`        | `npm run cursor:architecture` |
| `verify-rules.ts`              | `npm run cursor:verify`       |
| `validate-structure-staged.sh` | `npm run validate:staged`     |

## Structure

- `lib/` — shared helpers for architecture checks (`srcLayerImportRules`, barrel allowlist)
- `codemods/` — optional test generation utilities
- `audit/` — SOLID audit Python drivers (optional)

## Trackers

Use **GitHub** (`gh`) or **Linear** (MCP/API) from the agent session — not scripts in this folder.
