# Why does AWC say the Mac is reconnecting when Agent Witch is running locally?

## Query aliases

- The selected Mac is reconnecting. Your task will send when it checks in.
- Mac reconnecting after deploy
- identity probe live but still reconnecting
- presenceTier recent live_other_instance
- OPEN-002 mac_reconnecting
- AWC New task will send when it checks in
- Mac online locally but Console says reconnecting
- vi sao Agent Witch bao reconnecting khi Mac dang chay

## Short answer

**Local AWB/AWL being up (or the “this Mac” identity probe succeeding) does not mean Console can dispatch.** Writer send needs the Mac’s **live WebSocket on the same Railway Node** that handles `POST /api/agent-runs/dispatch`. The copy **“The selected Mac is reconnecting. Your task will send when it checks in.”** is `mac_queued` / outbox: cloud did not have that socket on this request, so queueable work waits for the next hub check-in. A deploy of AWC commonly drops the old socket for a few seconds even though AWI on the Mac is healthy.

## Details

### Two different “live” signals

| Signal                                                 | What it proves                                                  | What it does **not** prove                             |
| ------------------------------------------------------ | --------------------------------------------------------------- | ------------------------------------------------------ |
| AWB `GET /identity` / **this Mac** badge               | Browser on this Mac matched the pairing-token hash              | Cloud hub has a writer socket                          |
| AWL Status `system.ack` / heartbeats                   | AWI is talking to `wss://www.agentwitch.com/api/agent-witch/ws` | The **HTTP** replica serving New task owns that socket |
| `presenceTier: live` on `GET /api/agent-witch/devices` | Socket is on **this** Node                                      | —                                                      |
| `live_other_instance` / `recent`                       | Registry or last_seen without a local hub socket                | Ready to send a writer task from this request          |

Home **Mac reconnecting** uses `live_other_instance` or `recent` (`resolveHomeMacStatusSummary`). Picker labels: **Reconnecting (another server)** vs **Seen recently**.

### That exact sentence

`MAC_RECONNECTING_QUEUED_ERROR` — used when dispatch cannot deliver immediately and the work is **queueable** (outbox), including a queued writer ack. Interactive writer retry uses a different string: _Try again in a few seconds._

### After shipping to `main`

A production deploy recycles Nodes. AWI logs `ws_close` then `agent.register` + `device.auth.attestation` within ~2s. Until devices refresh and the load balancer / hub relay hit the new owner, AWC still shows reconnecting (OPEN-002). Refresh Home and retry **New task**; do not reinstall.

## Related

- ADR 0005 — presence tiers and dispatch outbox
- `src/features/agent-witch/KNOWN_ISSUES.md` — OPEN-002
- `docs/agent-witch/send-readiness-reason-codes.md`
- [awi-update-local-launchagent-plist.md](awi-update-local-launchagent-plist.md) — reconnecting from a broken LaunchAgent (different cause)

## Last reviewed

2026-09-18
