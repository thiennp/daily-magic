# What does AWL stand for (Local vs Live)?

## Query aliases

- AWL Agent Witch Local
- AWL la gi Agent Witch Local
- AWL Live wrong naming
- Agent Witch Local vs Live
- deployable AWL full name

## Short answer

**AWL** means **Agent Witch Local** — the Mac-local web app at `http://127.0.0.1:43347`: projects on this computer, folder pickers, harness pull into repos, prompt optimizer, local health/status. It runs on the same machine as **AWI** / **AWB**, not in the cloud.

Older docs and strings said **Agent Witch Live**; that was the same deployable. The git folder `apps/live/` and slug `live` are **legacy code paths** only — do not expand AWL as “Live” in new copy or agent replies.

## Details

| Term         | Meaning                                                       |
| ------------ | ------------------------------------------------------------- |
| **AWL**      | **Agent Witch Local** (loopback UI on the computer)           |
| `apps/live/` | Target package folder name (unchanged in git)                 |
| Port         | `43347` (`AGENT_WITCH_LOCAL_APP_PORT`), bind `127.0.0.1` only |

Pair with **AWC** (Agent Witch Cloud) for team dispatch and **AWB** (Bridge) for browser-on-same-Mac glue. See [agent-witch-deployables.md](../product/agent-witch-deployables.md).

## Related

- [awl-loopback-origin.md](awl-loopback-origin.md)
- [awc-agent-witch-cloud-naming.md](awc-agent-witch-cloud-naming.md)

## Last reviewed

2026-10-01
