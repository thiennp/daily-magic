# What URL does Agent Witch Live (AWL) use?

## Query aliases

- AWL origin 127.0.0.1:43347
- Agent Witch Live URL
- local.agentwitch.com never works
- http://local.agentwitch.com/
- AWL hostname
- open local Agent Witch app
- tai sao local.agentwitch.com khong mo duoc
- AWL loopback origin

## Short answer

**AWL is only `http://127.0.0.1:43347`.** The Mac app binds IPv4 loopback on port **43347**. There is no port-80 site and no working vanity hostname. Console links, logs, and the install bundle must use that loopback origin (include the port).

## Details

| What            | Fact                                                       |
| --------------- | ---------------------------------------------------------- |
| Bind            | `127.0.0.1:43347` only (AGENT-021 — AWC never fetches AWL) |
| Origin constant | `AGENT_WITCH_LIVE_APP_ORIGIN` in `@agent-witch/shared`     |
| Port 80         | Not proxied; other local servers can keep `:80`            |

Open AWL in the browser as `http://127.0.0.1:43347` (Status, projects, knowledge, writer API). AWC “Open on this Mac” links use the same origin.

## Related

- [agent-witch-deployables.md](../product/agent-witch-deployables.md)
- [awb-localhost-identity-and-cors.md](awb-localhost-identity-and-cors.md) — AWB is `:47892` / `:47893`, not AWL
- Code: `packages/shared/src/network/agentWitchLiveNetwork.constant.ts`

## Last reviewed

2026-09-18
