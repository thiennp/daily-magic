# Agent Witch Local — Connect version contract

Human UI classifies each paired Mac for Connect using the install bundle
version already stored on the device record.

## Fields

| Field | Where | Meaning |
| --- | --- | --- |
| `installBundleVersion` | Heartbeat / `register-install` → `agent_witch_devices.install_bundle_version` → `GET /api/agent-witch/devices` per device | Bundle string the Local reported (integer string). Old installs omit it. |
| `serverInstallBundleVersion` | Top-level on `GET /api/agent-witch/devices` | Current cloud-shipped bundle. |
| `connectVersionStatus` | Per device on `GET /api/agent-witch/devices` | `"ok"` \| `"too_old"` from the shared classifier (server-computed). |

## Shared classifier

- Import: `@/lib/agentWitch/classifyAgentWitchLocalConnectVersion`
- Constant: `AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION` in
  `@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant` (currently `"35"`).
- Returns: `"ok"` \| `"too_old"` (`AgentWitchLocalConnectVersionStatus`).
- Missing / empty / non-numeric reported version → `"too_old"` (route to `/download`).

## Server refusal (Connect / dispatch)

`GET /api/agent-witch/install-connection` (Connect modal probe),
`POST /api/agent-witch/register-install` (after storing the reported version),
`POST /api/agent-witch/devices/:deviceId/restart`, and Mac-targeted
`POST /api/agent-runs/dispatch` return **HTTP 409** via
`buildAgentWitchLocalTooOldRefusalResponse`:

```json
{
  "error": "agent_witch_local_too_old",
  "installBundleVersion": null,
  "minBundleVersion": "35",
  "downloadUrl": "/download"
}
```

Error string: `AGENT_WITCH_LOCAL_TOO_OLD_ERROR` in
`@/lib/agentWitch/agentWitchLocalTooOld.constant`.
Client parser: `parseAgentWitchLocalTooOldRefusal`.

## Local no silent no-op

A newer AWL that receives `device.restart` replies with `device.restart.ack`
(status `accepted` \| `already_in_progress` \| `deferred_writer_busy`) before
restarting. Unsupported `agentwitch-local://` Connect deep links set a menu-bar
status notice instead of ignoring the URL.
