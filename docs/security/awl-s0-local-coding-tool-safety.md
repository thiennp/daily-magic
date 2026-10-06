# AWL S0 local coding tool safety (S0-5, S0-7, S0-8)

AWL-side guards for "Local CLIs as project agents". User-facing lines come from
Product's locked copy (`docs/design/local-cli-project-agents/COPY-S0-A-B-C.md`)
via `LOCAL_CODING_TOOL_SAFETY_COPY` in `@agent-witch/shared/dispatch`. AWL fills
`{computer}` with the locked fallback "This computer".

## Error codes (`errorCode` on `command.claude.result`)

| Code | When | Line |
| --- | --- | --- |
| `folder_required` | run has no folder | `s0.folder.missing` |
| `folder_not_registered` | realpath not inside a folder registered for this project + device (incl. symlink escapes) | `s0.folder.notAllowed` |
| `folder_not_found` | registered folder missing on disk (only AWL-managed folders are created) | `s0.folder.missing` |
| `folder_check_unavailable` | cloud folder list unavailable and no last-good list (fail closed) | placeholder, Product to supply |
| `coding_tools_paused` | "Pause all coding tools" is on | `s0.pause.reason` |

## Guards

- **S0-5 folder allowlist**: `apps/install/entry/admitLocalCodingToolRun.ts` runs before any
  folder is created for `command.claude.run`; source of truth is the device-scoped
  `GET /api/agent-witch/projects` (`resolveAllowedRunFolder`). The writer then spawns in the
  checked realpath. `runWriterTask` refuses a CLI spawn without a folder (no workspace fallback).
- **S0-7a pause**: `coding-tools-pause.json` next to the profile `config.json`
  (unreadable = paused). Local API: `GET/POST /api/local/coding-tools/pause` `{ paused }`,
  same-machine callers or the AWL page origin only. Turning it on stops active runs.
- **S0-7b stop**: pipe children use the S0-6 process-tree kill (SIGTERM, SIGKILL after
  `LOCAL_CLI_KILL_GRACE_MS`); agent PTYs now escalate to SIGKILL after the same grace.
- **S0-7c dedupe**: run commands accepted once per agentRunId; `finishRun` runs once per
  agentRunId; outbox skips runs already posted (`run-completion-posted.json`, last 500) and
  flushes are serialized.
- **S0-8 scrub**: `scrubOutboundSecrets` (sk-, ghp_/github_pat_, xox*, AKIA/ASIA, Bearer, PEM,
  `.env` KEY=secret, pairingToken, inline key=value). Applied to run-output WS frames, heartbeat,
  WS trace, completion outbox, the stored run output, project knowledge sync and skillgen.

## Known issues / left for later

- Pause UI (switch + status chip) in AgentWitch Local is not built; only the local API.
- `s0.pause.hint` says "New tasks wait"; AWL refuses with `coding_tools_paused`. Queue/retry
  on pause is a server (AW Dispatch) piece.
- One AWL process can host several profiles; run sessions are process-global, so pausing one
  profile stops runs of every profile in the process. The local API uses the first profile.
- Not gated by the folder allowlist (they run in the AWL workspace, not a project folder):
  `harness.request`, headless writer runs (automations, self-delegated tasks, marketplace
  estimate) and prompt optimizer replies. The first two honor the pause switch; prompt
  optimizer replies do not yet.
- Checkpoint answers for runs replayed after a restart have no folder and are refused with
  `folder_required`.
- Projects with no `device_id`, or bound to another device of the owner, are refused.
- Server pieces for AW Dispatch: render `errorCode` with the viewer's `{computer}` name, queue
  on pause, always send the project folder on seat dispatch, and the hub-side run stop relay.
