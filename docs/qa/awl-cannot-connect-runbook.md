# Why is this computer not connected to AgentWitch, and what do I do?

## Query aliases

- AWL cannot connect
- may nay chua connect
- khong start duoc AWL
- stale_connection needsRevive
- Application not found x-railway-fallback
- Reconnecting in 2000ms
- AWL running from a disk image DMG
- revive does not help

## Short answer

Read `GET http://127.0.0.1:<wakePort>/watchdog/status` (port in `~/.agent-witch/wake-port.json`). Since bundle 345 each profile carries `reason` and `lastDisconnect.kind`. The kind tells you which row below applies; **do not run Revive for `not_linked` or `cloud_unreachable`**, because a restart cannot cure them.

| `reason` / `lastDisconnect.kind`           | Meaning                                                                                                                                | What to do                                                                                                                                                                                                                            |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cloud_unreachable` (`server_down`, `dns`) | The cloud answered 404/5xx/refused or the address did not resolve. The Mac keeps its link and retries every 5 s up to 2 min, jittered. | Check `curl -i https://www.agentwitch.com/api/ready`. A `404` with `x-railway-fallback: true` means Railway has no service for the domain: check the Railway project (service, deployment, custom domain). Nothing to fix on the Mac. |
| `not_linked` (`device_not_linked`)         | The cloud knows the token but the device row is revoked.                                                                               | Run the install command from Home while signed in. The client retries about every 5 minutes and self-updates over HTTP, so an old bundle can leave this state by itself.                                                              |
| `stale_connection` (`closed_before_ack`)   | The socket opened but no `system.ack` arrived in 2 minutes.                                                                            | Revive is appropriate. The backoff grows (1 s up to 30 s) instead of looping every 2 s.                                                                                                                                               |
| `not_running`                              | The LaunchAgent is not running.                                                                                                        | Revive, or open AWL.                                                                                                                                                                                                                  |

## Details

### Checks, in order

1. `cat ~/.agent-witch/install-version.json` against `curl -s https://www.agentwitch.com/install/agent-witch/version`. A client older than 285 loops every 2 seconds on `device_not_linked` and cannot update over the WebSocket. Since 345 it polls the version endpoint over HTTP every 5 minutes while it has no fresh ack.
2. `curl -s -o /dev/null -w '%{http_code}\n' https://www.agentwitch.com/api/ready`. `503` with `database: "unreachable"` is the database; a Railway fallback `404` is the service or domain.
3. `tail ~/.agent-witch/profiles/*/logs/agent-witch.log`: one human line per attempt states the cause and the next retry.
4. `~/.agent-witch/profiles/<email>/last-disconnect.json` holds the same data as `lastDisconnect`.

### AWL starts but shows Stopped

- The app must live in `/Applications`. Running it from a mounted disk image (`/Volumes/...`) breaks when the image is ejected, and several mounted copies can run different versions. Copy it to `/Applications`, eject every image, reopen.
- Another macOS user can hold the console. The bridge exits quietly for a user who is not at the console, so the app shows Stopped. Switch to that account or use the account that is logged in at the console.

### Never paste `config.json`

It holds the plaintext `pairingToken`. Use `jq 'del(.pairingToken)' <file>`.

## Related

- [AWL reconnects every few seconds with "identity is not linked"](awl-reconnect-loop-device-not-linked.md)
- [What does GET /api/health prove?](awc-process-health.md)
- Code: `apps/install/features/connection-health/internal/core/agentWitchDisconnect.ts`, `scripts/reviveAgentWitchWebSocket.ts`

## Last reviewed

2026-10-10
