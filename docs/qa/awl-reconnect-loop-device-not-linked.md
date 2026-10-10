# Why does AWL reconnect every few seconds with "identity is not linked"?

## Query aliases

- AWL keeps reconnecting
- This computer identity is not linked
- device_not_linked
- Disconnected from server Reconnecting in 2000ms
- computer superseded by another install
- may bi thu hoi khong lien ket lai duoc

## Short answer

The cloud still knows the pairing token, but its device row is **revoked**. Before this fix the Mac retried every 2 seconds forever (one real Mac logged more than 77,000 reconnects and tens of MB of logs) and never recovered on its own.

A row gets revoked in three ways:

| Cause                                                                                                                                              | Marker on the row                | What happens now                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A later install with the **same computer label** replaced it (`revokeSiblingDevicesWithSameLabel`: claim, token rotation, heartbeat consolidation) | `superseded_by_device_id` is set | Heartbeat consolidation no longer supersedes a sibling that checked in within 3 minutes. If the replacement is offline (silent > 3 min) the old device is **reinstated at the next register**, with its computer seats. If the replacement is live, the old one waits (5 min retries) and the message says why. |
| Connect-this-Mac placeholder cleanup (`revokePendingInstallDevicesForUser`)                                                                        | no hostname, no bundle version   | Unchanged. Placeholders never ran.                                                                                                                                                                                                                                                                              |
| The computer was removed in the Console                                                                                                            | row deleted → `unknown_identity` | Unchanged. The Mac wipes its local connection.                                                                                                                                                                                                                                                                  |

## What the client does (bundle 345+)

The retry delay resets only on `system.ack`, never on socket open, so a server that accepts and then closes cannot loop at 2 seconds. The 60-second in-process stale tick no longer overrides the not-linked wait (a user-initiated Revive still retries at once). A client that gets no ack polls `GET /install/agent-witch/version` over HTTP every 5 minutes and updates itself, because a rejected old bundle never receives `system.ack` or `install.bundle.update`. The watchdog reports `reason: not_linked` and `lastDisconnect`; Revive and reinstall skip it. Diagnosis: [awl-cannot-connect-runbook.md](awl-cannot-connect-runbook.md).

Earlier behaviour:

`device_not_linked` (or the legacy message) makes AWL retry **every 5 minutes**, log one line, and recover on the next `system.ack`. It never wipes anything: only `unknown_identity` does. Logs under the profile `logs/` folder are trimmed at 5 MB.

## Check which row replaced yours

```sql
SELECT id, device_label, claimed_at, last_seen_at, revoked_at, superseded_by_device_id
FROM agent_witch_devices
WHERE user_id = '<user id>'
ORDER BY claimed_at DESC;
```

`superseded_by_device_id` on your revoked row points to the winner. Same label on two rows means two installs (other macOS user, other install home, or a cloned hostname) share one computer name.

## Last reviewed

2026-10-10
