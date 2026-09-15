# Feature module layout

## Registry fields

| Field             | Meaning                                       |
| ----------------- | --------------------------------------------- |
| `featurePath`     | React UI, hooks, and feature docs             |
| `libPath`         | Optional server/domain modules in `src/lib/`  |
| `routePaths`      | App Router pages under `src/app/`             |
| `apiPaths`        | API prefixes under `src/app/api/`             |
| `migrationStatus` | `migrated` — feature is shipped; see ADR 0003 |

## Where code lives

- **UI** → `src/features/<slug>/`
- **HTTP routes** → `src/app/` (Next.js convention)
- **Shared server logic** → `src/lib/<area>/` when listed in `libPath`

Do not move dispatch or auth solely into `src/features/` unless you also relocate API handlers; the split is intentional.

## Query docs

```bash
npm run feature-knowledge:query -- "feature module layout" --feature=docs
```
