# Sync relay r1 — implemented vs stubbed

**Branch:** `feat/awc-computer-sync-relay-r1` (stacked on neon-prune-300-r1).

## Implemented (server)
- Migration `103-project-computer-sync-relay.sql` + soft ensure
- Constants (1 MiB, store root, kinds, learning purge prefixes)
- Path normalize + allowlist; secret re-scan; device ACL (computer ∈ project)
- Owner enable/disable (`POST …/sync/devices`)
- Commit offer (`POST …/sync/commit`) with LWW + conflict_copy path
- Changes since (`GET …/sync/changes?since=`), blob download, seq ack
- Chat ack → `project_message_computer_acks` (feeds Neon prune)
- Outbox types `sync.available` / `sync.purge` (queueable)
- `enqueueProjectSyncAvailable` helper
- Prune exemption uses enabled + synced_once when sync rows exist

## Stubbed / out of tip (owners)
| Item | Owner |
| --- | --- |
| AWL sender/receiver FSMs, one-at-a-time worker, resume chunks, atomic local write, `.gitignore` | RT18 AW Mac |
| Team › Computers UI toggle + status chips | RT15 Product / Human UI |
| Store root move to `.agentwitch/data/` + picker `purpose=sync` | RT16 AW Mac |
| Chunked multi-PUT upload protocol (v1 uses whole-body commit) | later / RT17 polish |
| Blob free-when-all-targets-ack sweeper | follow-up on RT17 |
| `sync.purge` fan-out on History OFF | wire into toggle (RT10) |
| Access-log CHECK new event types for sync.* | follow-up migration if audit CHECK is strict |

Never hide Marketplace / Connect. Soft HOLD cost-control is a separate tip.
