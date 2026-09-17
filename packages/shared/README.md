# `@agent-witch/shared`

TypeScript **contracts only** — types and constants shared across **AWC**, **AWL**, **AWB**, and **AWI**. No React, Next.js, Node I/O, or database code.

## Layout

```
packages/shared/src/
├── index.ts              # Barrel (deployables + network + protocol types)
├── deployables/          # AWC | AWL | AWB | AWI ids and AWB ports
├── network/              # Origins, WS path, AWL :43347
└── protocol/             # WebSocket frame shape + message type strings
```

## Import (today)

Path aliases in root `tsconfig.json` (no separate `npm install`):

```typescript
import {
  DEPLOYABLE_META,
  AGENT_WITCH_LIVE_APP_PORT,
  AGENT_WITCH_MESSAGE_TYPES,
  type AgentWitchMessage,
  type DeployableId,
} from "@agent-witch/shared";

import { AGENT_WITCH_DEFAULT_ORIGIN } from "@agent-witch/shared/network";
import type { AgentWitchMessage } from "@agent-witch/shared/protocol";
```

**AWC** (`src/`) and **AWI/AWL/AWB** (`scripts/`) should import cross-app values from here.  
`src/lib/agentWitch/constants.ts` and message type files are thin re-exports during migration.

## Rules

- **Allowed:** `interface`, `type`, `const` (literals), `as const` enums.
- **Forbidden:** imports from `@/`, `src/`, `scripts/`, `next`, `react`, `fs`, `ws`.
- New shared surface: add types here first, then re-export or switch call sites in a follow-up PR.

## Tests

`packages/shared/src/**/*.test.ts` — registry alignment with `apps/deployables.registry.json`.

## Related

- [Deployables doc](../../docs/product/agent-witch-deployables.md)
- [Refactoring safety tests](../../docs/development/refactoring-safety-tests.md)
