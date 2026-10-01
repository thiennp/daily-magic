# What does AWC stand for (Cloud vs Console)?

## Query aliases

- AWC Agent Witch Cloud
- AWC la gi Agent Witch Cloud
- AWC Console wrong naming
- Agent Witch Cloud vs Console
- deployable AWC full name

## Short answer

**AWC** means **Agent Witch Cloud** — the hosted control plane you use in the browser at `https://www.agentwitch.com` (and `http://localhost:3000` in dev): sign-in, Tasks, Runs, dispatch hub, projects metadata, marketplace, admin APIs, and WebSocket hub for paired Macs.

Older docs and strings said **Agent Witch Console**; that was the same deployable, not a separate product. The git folder `apps/console/` and slug `console` are **legacy code paths** only — do not expand AWC as “Console” in new copy or agent replies.

## Details

| Term                  | Meaning                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------- |
| **AWC**               | **Agent Witch Cloud** (cloud app + APIs + hub)                                                |
| `apps/console/`       | Target package folder name (unchanged in git)                                                 |
| “Console” (lowercase) | Informal “web app shell” in UX notes — prefer **Cloud** or **AWC** when naming the deployable |

Other deployables: **AWL** Local, **AWB** Bridge, **AWI** Install — see [agent-witch-deployables.md](../product/agent-witch-deployables.md).

## Related

- [agent-witch-deployables.md](../product/agent-witch-deployables.md)
- [concepts.md](../product/concepts.md)
- `apps/deployables.registry.json`, `packages/shared/src/deployables/deployableMeta.constant.ts`

## Last reviewed

2026-10-01
