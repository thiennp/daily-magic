# Runtime validation (guardz) and folder structure (structure-validation)

## guardz

**Package:** [`guardz`](https://www.npmjs.com/package/guardz) (dependency in `package.json`).

Use **guardz** for runtime type guards at boundaries: API bodies, WebSocket payloads, JSON from local storage, and `unknown` from external systems. Prefer guardz primitives over hand-rolled `typeof` checks.

### Conventions

| Concern                    | Pattern                                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Plain object (non-array)   | `isNonNullObject` or project `isRecord` (`src/lib/agentWitch/isRecord.ts`)                                  |
| Non-empty string           | `isNonEmptyString` from guardz (re-exported as `src/lib/agentWitch/isNonEmptyString.ts` for legacy imports) |
| Object shapes              | `isType<YourDto>({ field: isString, … })`                                                                   |
| Fixed string unions        | `isOneOf("a", "b")` or `isEnum` when applicable                                                             |
| Arrays                     | `isArrayWithEachItem(itemGuard)`                                                                            |
| Optional fields            | `isUndefinedOr(guard)`                                                                                      |
| Lenient parse (log + cast) | `guardWithTolerance` only when an existing call site already uses that pattern                              |

### File layout

- Types: `*.type.ts` next to the feature or under `types/`
- Guards: `is*.ts` or `*.guardz.ts` (co-located with the type)
- Do **not** duplicate guardz helpers in `src/lib/` unless re-exporting for stable import paths (like `isRecord`)

### Example

```typescript
import { isNonEmptyString, isType } from "guardz";

import type HarnessRequestPayload from "./types/HarnessRequestPayload.type";

const isHarnessRequestPayload = isType<HarnessRequestPayload>({
  writerAgent: isHarnessWriterAgent,
  spec: isHarnessRequestSpec,
  instruction: isNonEmptyString,
});
```

Agent rule: `.cursor/rules/rules-guardz.mdc`.

---

## structure-validation

**Package:** [`structure-validation`](https://www.npmjs.com/package/structure-validation) (`structure-validation.config.json` at repo root).

Enforces **where** files may live (folder architecture), complementing ESLint import rules (`npm run cursor:architecture`).

### Commands

| npm script                 | When                                                                   |
| -------------------------- | ---------------------------------------------------------------------- |
| `npm run validate:staged`  | Husky pre-commit (staged `src/`, `db/`)                                |
| `npm run validate:all`     | Full tree (`--scope all`)                                              |
| `npm run validate:changes` | Git-changed files (`--scope changes`); also used by Cursor `stop` hook |
| `npm run validate:fix`     | Interactive fix (staged)                                               |
| `npm run validate:preview` | Dry-run (staged)                                                       |

### FSA-related allowed names

Global `**` patterns include FSA boundary files so migrations do not fight the validator:

- `presentation.ts`, `infrastructure.ts`, `types.ts` under `public-api/`
- `*.type.ts`, `*.constant.ts`, `*.guardz.ts` in feature trees

New top-level roots (e.g. `src/hubs/`) must be added to `structure-validation.config.json` in the same PR (see ADR 0007).

### Related

- [FSA workflows](fsa-workflows.md)
- [ADR 0007](../adr/0007-fractal-slice-architecture.md)
- [Quality gates](../development/quality-gates.md)
