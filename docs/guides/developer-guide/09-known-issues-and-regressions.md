# Chapter 9 — Known issues and regressions

Canonical **open product risks** for the Mac bridge live in [`src/features/agent-witch/KNOWN_ISSUES.md`](../../../src/features/agent-witch/KNOWN_ISSUES.md). Shipped fixes are **removed** from that file; behavior stays guarded by Vitest. Search the repo for **`AGENT-`** in test names and descriptions.

Architecture context: ADR **0005** (presence, dispatch outbox, multi-instance relay). Dispatch chapter: [05-dispatch-presence-and-runs.md](05-dispatch-presence-and-runs.md) when present.

When you close an open item: remove or shrink the KNOWN_ISSUES row, add/adjust regression tests, and add `docs/qa/<topic>.md` if operators will ask again.

**Linux access is not an open outage.** Console works from a Linux browser. Desktop Linux Home shows the host install command. x86_64 Linux can host AWI. AWL/AWB stay Mac-only ([Q&A](../../qa/linux-browser-vs-linux-host.md)).

---

## OPEN-001 — Mac cannot resolve `www.agentwitch.com`

|                |                                                                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Symptom**    | `getaddrinfo ENOTFOUND www.agentwitch.com` in `~/.agent-witch/*.error.log`; WebSocket never connects; cloud shows offline or “seen recently” only.         |
| **Cause**      | Client/network DNS or firewall — not fixed by app config alone. Production uses hardcoded `wss://www.agentwitch.com/api/agent-witch/ws` (bundle **103+**). |
| **Mitigation** | Fix DNS/VPN/firewall; `dig www.agentwitch.com`; reinstall or self-update to bundle **103+** if the client is older.                                        |

Do not point production Mac troubleshooting at CHECK24 hosts unless the user confirms that deployment.

---

## OPEN-002 — Writer dispatch across multi-instance replicas

|                         |                                                                                                                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Symptom**             | Mac picker shows **Online (another server)** (`live_other_instance`); **New task** fails or briefly shows `mac_reconnecting` while the Mac process is healthy.                                              |
| **Cause**               | Dispatch HTTP hit a replica without the Mac’s live hub WebSocket.                                                                                                                                           |
| **Shipped mitigations** | Hub **dispatch relay** (AGENT-022); **`aw_hub_instance`** affinity cookie from `GET /api/agent-witch/devices`; fail-closed `mac_reconnecting` / `mac_offline`; auto-pick live Mac when preference is stale. |
| **Residual risk**       | Registry lag during deploy; relay timeout or sticky mismatch → brief `mac_reconnecting` until reconnect + devices refresh.                                                                                  |
| **Mitigation**          | Refresh devices / retry New task; bundle **103+**; enable sticky routing on `aw_hub_instance` or accept handoff windows.                                                                                    |

**Regression tests (examples):** search `AGENT-022`, `mac_reconnecting`, `live_other_instance`, `resolveWriterRunAgentClient`, `agentWitchConnectionRegistry`, `macDevicePresence`.

---

## OPEN-003 — Stale install bundle on the Mac

|                |                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Symptom**    | Cloud shows newer install bundle than Mac; old client until update completes.                                                                                                                             |
| **Cause**      | Self-update depends on heartbeat, wake `POST /update/run`, or hourly updater — can lag if wake API or network fails.                                                                                      |
| **UI**         | Composer **`update_needed`** readiness (blocks Send, **Update agent** CTA); Home device detail flags mismatch. Codes: [send-readiness-reason-codes.md](../../agent-witch/send-readiness-reason-codes.md). |
| **Mitigation** | **Update local** / `npm run agent-witch:self-update`; compare `~/.agent-witch/install-version.json` vs `GET /install/agent-witch/version`.                                                                |

**Regression tests (examples):** `AGENT-030` in `shouldTriggerAgentWitchHeartbeatSelfUpdate.test.ts`, `readInstallBundleVersionFromHeartbeatAck.test.ts`, `requestLocalAgentWitchSelfUpdate.test.ts`.

---

## AGENT-067 — LaunchAgent plist / Update local (guardrail)

Documented in KNOWN_ISSUES because **every future install bundle** must preserve the fix: bash must not leak into `com.agent-witch.plist`; AWL update must use `wake-port.json` when present.

|                 |                                                                                                                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Symptom**     | After **Update local**, AWC stuck on **Mac reconnecting** (`presenceTier: recent`); `wake.sh` / default AWB `:47892` down.                                                                                      |
| **Fix surface** | Plist heredoc closed before env keys; `register_agent_witch_launch_agent` XML lint; `ensureAgentWitchLaunchAgentPlist` on start/update (bundle **125+**); `resolveAgentWitchRuntimeWakePort` for `/update/run`. |
| **Recovery**    | Self-update to bundle **125+** or restart AWI; **Connect this Mac** if identity unlinked.                                                                                                                       |

**Regression tests:**

- `buildAgentWitchInstallScriptLaunchAgent.test.ts`
- `renderInstallAgentWitchScriptProcessHost.test.ts`
- `buildAgentWitchInstallScriptProcessHostBash.test.ts`
- `ensureAgentWitchLaunchAgentPlist.test.ts`
- `isAgentWitchLaunchAgentPlistXmlValid.test.ts`
- `buildAgentWitchInstallScriptRegisterLaunchAgent.test.ts`
- `resolveAgentWitchRuntimeWakePort.test.ts`
- `triggerAgentWitchLocalInstallBundleUpdate.test.ts`
- `requestLocalAgentWitchSelfUpdate.test.ts`

**Q&A:** [awi-update-local-launchagent-plist.md](../../qa/awi-update-local-launchagent-plist.md).

---

## How to find regression coverage

```bash
# Issue-tagged tests (representative)
rg 'AGENT-' --glob '*.test.ts' -l | head

# Domain-specific examples cited in KNOWN_ISSUES
npm test -- macDevicePresence.test.ts resolveWriterRunAgentClient.test.ts agentWitchConnectionRegistry.test.ts
```

When fixing bridge/dispatch bugs:

1. Add **`AGENT-###`** or reference an existing ID in the test name/description.
2. Update `KNOWN_ISSUES.md` (open vs closed).
3. Run `npm run feature-knowledge:index` if `docs/qa/` or guides changed.

---

## Related Q&A (symptoms → docs)

| Topic                          | Doc                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------- |
| Mac reconnecting vs local live | [awc-mac-reconnecting-vs-local-live.md](../../qa/awc-mac-reconnecting-vs-local-live.md)   |
| Harness vs agent dispatch      | [mac-harness-workflow-agent-dispatch.md](../../qa/mac-harness-workflow-agent-dispatch.md) |
| Writer routing                 | [writer-dispatch-cascade-routing.md](../../qa/writer-dispatch-cascade-routing.md)         |
| AI register / WebMCP           | [ai-self-registration-webmcp.md](../../qa/ai-self-registration-webmcp.md)                 |

---

## Query aliases

- Agent Witch known issues OPEN regression tests AGENT-
- mac_reconnecting live_other_instance multi-instance relay
- ENOTFOUND www.agentwitch.com install bundle update_needed
- LaunchAgent plist AGENT-067 Update local
- lỗi đã biết Agent Witch Mac bridge regression test
- Mac không kết nối DNS agentwitch.com OPEN-001
- dispatch nhiều replica Railway mac_reconnecting OPEN-002
- Linux cannot access Agent Witch, Linux host not an outage
- cập nhật bundle Mac cũ update_needed OPEN-003
