# Send readiness `reasonCode` contract (AW-READY-2)

Canonical resolver: `resolveSendReadinessBanner` in `src/features/agent/send-readiness/resolveSendReadinessBanner.ts`. User-facing copy: `sendReadinessBannerCopy.constant.ts`. UI: `SendReadinessBanner` + `useWsTestComposerReadinessUi` on the New task composer.

**Do not** treat `isOnline` alone as send-ready. Writer send requires `presenceTier === 'live'` and dispatch-ready on this hub (see ADR 0005).

## Component fields

| Field          | Type                                | Notes                                          |
| -------------- | ----------------------------------- | ---------------------------------------------- |
| `reasonCode`   | enum below                          | Single primary reason                          |
| `title`        | string                              | Banner title                                   |
| `body`         | string                              | 1–2 lines, actionable                          |
| `severity`     | `danger` \| `warning` \| `info`     | Visual tone                                    |
| `blocksSend`   | boolean                             | If true, disable Send + tooltip = title + body |
| `primaryCta`   | `{ label, href?, action? }` \| null |                                                |
| `secondaryCta` | optional                            |                                                |

## Priority (first match wins)

1. `update_needed` — install bundle on Mac behind cloud required (OPEN-003)
2. `unreachable_dns` (or fold into `offline` if no distinct client signal)
3. `offline`
4. `recent`
5. `live_other_instance_connecting` (relay in flight) → `live_other_instance_failed` on timeout/fail
6. other `!isDispatchReady` on `live` → `not_dispatch_ready`
7. form validation (`empty_prompt`, etc.) — outside Mac readiness, same banner component

**No banner / `reasonCode: null`:** Mac readiness clear and form valid (`presenceTier === 'live'` && writer send-ready). Optional success chip: “Mac ready”.

## Enum + wire mapping

| reasonCode                       | Wire from                                                  | blocksSend | severity | Title (shipped)      | Primary CTA                   |
| -------------------------------- | ---------------------------------------------------------- | ---------- | -------- | -------------------- | ----------------------------- |
| `update_needed`                  | `installBundleVersion` behind `serverInstallBundleVersion` | true       | warning  | Update needed        | Update agent → `/#your-setup` |
| `unreachable_dns`                | DNS / ENOTFOUND when surfaced                              | true       | warning  | Mac unreachable      | Reconnect Mac                 |
| `offline`                        | `presenceTier === 'offline'`                               | true       | danger   | Mac offline          | Retry · Setup help            |
| `recent`                         | `presenceTier === 'recent'`                                | true       | info     | Reconnecting         | Retry                         |
| `live_other_instance_connecting` | `live_other_instance` + `relayState === 'connecting'`      | true       | info     | Connecting           | —                             |
| `live_other_instance_failed`     | relay unavailable / failed                                 | true       | warning  | New task isn’t ready | Retry                         |
| `not_dispatch_ready`             | `live` but not writer-ready                                | true       | warning  | New task isn’t ready | Fix setup                     |
| `empty_prompt`                   | empty prompt / workflow validation                         | true       | info     | Add a task           | Focus field                   |
| `null` / ready                   | `live` + writer send-ready                                 | false      | —        | —                    | —                             |

Mac picker labels (`formatMacPresenceStatusLabel`): **Online**, **Reconnecting (another server)**, **Seen recently**, **Offline** — not sendability.

## Related

- OPEN-003: `src/features/agent-witch/KNOWN_ISSUES.md`
- OPEN-002 multi-replica: ADR 0005, hub dispatch relay
- Install bundle mismatch detail on Home Mac rows: `buildMacDeviceInstallBundleText`
