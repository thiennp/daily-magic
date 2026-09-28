# Why does AWC say Mac offline when AWL says Connected and the WebSocket succeeded?

## Query aliases

- AWC shows Mac offline but AWL shows connected
- all websocket connections success but console says offline
- AWL Connected to cloud AWC Mac offline
- ws open system.ack but presenceTier offline
- Mac handshake succeeded device still offline
- awc offline awl connected websocket
- vi sao AWC bao offline khi AWL da Connected

## Short answer

**AWL “Connected” means the Mac process opened a WebSocket.** That flag flips on the handshake, before the cloud has bound a device. **AWC “Mac offline” means one device row has `presenceTier: offline`:** that row’s id is absent from the hub and from `agent_witch_connections`, and its `last_seen_at` is older than 180 seconds. A successful upgrade, a browser dashboard socket, or `system.ack` does not mark that row live. If `agent.register` had been accepted for the same device id, Home would say **Mac online** or **Mac reconnecting**.

## Details

### Two status lights

| What you see                                          | What flipped it                                                | What it leaves unset                   |
| ----------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------- |
| AWL home **Connected to cloud**, Status **Connected** | `socket.on("open")` in the Mac client (`wsConnected`)          | Which cloud device row owns the socket |
| AWC **Mac offline** / picker **Offline**              | `presenceTier === "offline"` on `GET /api/agent-witch/devices` | Whether some other socket is open      |
| AWC **Mac reconnecting**                              | `live_other_instance` or `recent` (`last_seen_at` within 180s) | —                                      |
| AWC **Mac online**                                    | Socket for that device id is on the Node serving the page      | —                                      |

`agent.register` is what binds the open socket to a device. After the server accepts it, it inserts `agent_witch_connections` and touches `last_seen_at`. From then on that row is `live`, `live_other_instance`, or at least `recent` — the Home label is **Mac online** or **Mac reconnecting**.

### Why every WebSocket can still “succeed”

The handshake and the device row are different checks.

1. **The socket AWL counts is local.** Status stays **Connected** for as long as that process’s socket stays open. Cloud presence updates only after register resolves the pairing token to a non-revoked device.
2. **The browser has its own socket.** A signed-in AWC tab registers role `dashboard`. That upgrade can succeed on every refresh and never makes a Mac row live.
3. **Register can land on a different row.** The token in `~/.agent-witch/config.json` (or `~/.local-agent-witch` for a localhost install) claims one device id. AWC may be showing an older row: a leftover Connect placeholder, a superseded Mac, or a row whose token hash is what the browser matched as **this Mac** while the running helper is using another profile.
4. **Register can land on a different origin.** The Mac’s `wsUrl` might be `ws://localhost:3000/...` while the tab is `https://www.agentwitch.com`, or the reverse. Each origin has its own hub. The handshake you watched succeeded against the origin in `config.json`.
5. **A rejected register does not refresh the row.** “This Mac identity is not linked” or an invalid device-auth signature closes the socket and leaves `last_seen_at` unchanged, so the row stays **offline**. AWL then shows **Disconnected** and retries. A badge that stays **Connected** means the socket that process is tracking remained open — that open socket is bound to some other device, account, or origin than the offline row.

### What to check

1. On AWC Home, read every device row. Another row may already say **Online** while the one you expected says **Offline**.
2. On the Mac, compare `wsUrl` in the install config with the host in the AWC address bar. They must be the same origin (`www.agentwitch.com` in production, `localhost:3000` for `npm run dev`).
3. In AWL Traffic, a steady `agent.register` plus `device.auth.attestation` for that session means the cloud accepted the token. The offline row is then a different device id. A `system.error` of “This Mac identity is not linked” means this process’s token is revoked; use **Connect this Mac** and paste the command.
4. Refresh Home after the helper has been up for more than one heartbeat (30s). A row that stays **Offline** after that refresh was not the device that registered.

## Related

- [awc-mac-reconnecting-vs-local-live.md](awc-mac-reconnecting-vs-local-live.md) — **Mac reconnecting** when the helper is up (`recent` / `live_other_instance`)
- [awc-how-browser-knows-this-computer.md](awc-how-browser-knows-this-computer.md) — **this Mac** is a token-hash match
- [awc-connect-when-awl-already-running.md](awc-connect-when-awl-already-running.md) — deleted or replaced link while AWL stays open
- ADR 0005 — presence tiers
- Code: `resolveAgentWitchDevicePresenceTier`, `processAgentWitchRegisterMessage`, AWL `wsConnected` in `startAgentWitchClient`

## Last reviewed

2026-09-28
