# Why can AWC call localhost for `/identity` without being blocked?

## Query aliases

- AWC localhost identity CORS
- why browser can call 127.0.0.1 wake server
- identity AWB AWL AWI which deployable
- Private Network Access agent witch
- vi sao AWC goi local identity khong bi chan
- wake server allowed origin agentwitch.com

## Short answer

The **`GET /identity` HTTP route is served by AWB** (Agent Witch Bridge — loopback wake server on `127.0.0.1:47892` or `47893`). **AWC** (browser tab on `https://www.agentwitch.com` or `http://localhost:3000`) is **allowed on purpose**: AWB returns CORS headers that whitelist those origins and set **`Access-Control-Allow-Private-Network: true`** so a public site may reach the user’s loopback **only on the same Mac**. The JSON is **built from AWI install data** (pairing token / profiles under `~/.agent-witch`, via `readAgentWitchRunConfig` and related probes) — not from AWL’s UI port (`:43347`). Random websites and other people’s machines are not allowed.

## Details

### Who serves what?

| Deployable | Role for identity                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AWB**    | Owns **`GET /health`** and **`GET /identity`** on the wake HTTP server (`apps/bridge/…/health-identity`).                                                     |
| **AWI**    | Owns **on-disk config** (pairing token, LaunchAgent profiles, install dirs). AWB reads this when building the identity JSON.                                  |
| **AWL**    | Mac-local app UI (`http://127.0.0.1:43347`). **Does not** expose `/identity` for AWC.                                                                         |
| **AWC**    | Cloud/browser console. **Calls** `http://127.0.0.1:{wakePort}/identity` from JavaScript when running on macOS (see `fetchLocalAgentWitchIdentityAtWakePort`). |

So: **API surface = AWB**; **credential identity = AWI install state**; **AWC = caller**.

### Why CORS does not block AWC

1. **Same machine network path** — Only processes on the user’s Mac can connect to `127.0.0.1`. AWC in the cloud never receives this; the **browser on the Mac** does.

2. **Explicit origin allowlist** — AWB `buildWakeServerCorsHeaders` allows:
   - `https://www.agentwitch.com` / `https://agentwitch.com`
   - `http://localhost:*` and `http://127.0.0.1:*` (local dev)
     Other origins get **no** `Access-Control-Allow-Origin` and are rejected.

3. **Private Network Access** — Response includes `Access-Control-Allow-Private-Network: true` so Chromium can permit a **secure public origin** → **private loopback** request after policy checks (user may see a browser prompt in some versions).

4. **Preflight** — `OPTIONS` returns `204` with the same CORS headers for cross-origin GET from AWC.

5. **Not a free pass** — AWC on Windows/iPhone cannot reach your Mac’s loopback. A malicious site on another origin is blocked by the allowlist even if the user is on a Mac.

### What `/identity` returns (conceptually)

- `hostname` — OS hostname (`os.hostname()`).
- `tokenHash` / `tokenHashes` — SHA-256 of local **pairing token(s)** from AWI config (matches cloud device rows).
- `profiles` — LaunchAgent / profile metadata from install targets.

AWL heartbeat/WebSocket traffic to AWC is separate from this wake discovery API.

### Related product rule

`online-wake` docs: the **website must not** call a remote user’s IP; only **loopback on the same Mac** via AWB. Server-side AWC APIs may **proxy** some local operations when the request hits the same Node as the user’s bridge (see local-watchdog / local-update routes) — that is still “browser on same Mac” glue, not cloud → arbitrary LAN.

## Related

- [awc-how-browser-knows-this-computer.md](awc-how-browser-knows-this-computer.md)
- [local-bridge.md](../agent-witch/local-bridge.md)
- [agent-witch-deployables.md](../product/agent-witch-deployables.md)
- Code: `apps/bridge/features/server/features/cors-origin/internal/wakeServerCors.ts`, `buildWakeHealthIdentityResponses.ts`

## Last reviewed

2026-09-18
