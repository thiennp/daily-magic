# Domain: Dispatch, tasks & runs

**Scope:** Who may run what for whom — dispatch targets, approvals, queue; task composer; run history and live terminal in Reports; Cursor Cloud executor.

**Registry slugs:** `dispatch`, `agent`, `reports` · **Libs:** `src/lib/dispatch` (and run APIs shared with dispatch)

## Skim (L1)

- **Dispatch** = policies, approvals, routing to Mac or `__cursor_cloud__`.
- **Agent** (`/agent`) = compose and send tasks; **Reports** (`/reports`) = history and live output.
- Glossary: [product/concepts.md](../product/concepts.md) (dispatch, agent run).

## Read next if…

| If you need…                  | Open                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------- |
| Cursor Cloud origin rules     | [adr/0004](../adr/0004-cursor-cloud-dispatch-origin.md)                      |
| Mac writer vs queued / outbox | [adr/0005](../adr/0005-shared-mac-presence-and-dispatch-outbox.md)           |
| Run feedback loop             | L2 `src/features/feedback/README.md`, `improvements/README.md`               |
| Composer UI / APIs            | L2 `src/features/agent/README.md`, `dispatch/README.md`, `reports/README.md` |

```bash
npm run feature-knowledge:query -- "approvals dispatch queue" --feature=dispatch
npm run feature-knowledge:query -- "task composer" --feature=agent
```
