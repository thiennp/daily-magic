# Chapter 9 — Troubleshooting

Start here when **Send** is blocked, the **Mac** looks wrong in Home, a **Run** never attaches, or updates fail. This chapter uses user words (**Mac**, **Task**, **Run**, **Playbook**) and points to deeper [System Q&A](../../qa/README.md) and open [KNOWN_ISSUES](../../../src/features/agent-witch/KNOWN_ISSUES.md) entries.

Most fixes are **learn from usage** in practice: read the honest banner, adjust **Mac** health or DNS, **Run again** or **Try again** on one workflow step—then **Save as playbook** when you have a stable pattern ([four pillars — learn from usage](00-philosophy-and-vocabulary.md#four-pillars)). Agent Witch does not auto-rewrite your **Playbooks** because a run failed; you stay in control.

Quick wins first, then themed sections for DNS, reconnecting, and bundle update.

A Linux browser can use the Console. “Linux cannot access Agent Witch” mixes that up with the Mac-only local app. An x86_64 Linux machine can host Tasks; it will not show “this Mac” ([Q&A](../../qa/linux-browser-vs-linux-host.md)).

---

## Before you reinstall

Try this order (most issues resolve without a fresh install):

1. **Refresh** the Home page or Mac device list (tab focus retries local identity on macOS).
2. Read the **Send** banner on **New task**—it names one primary reason ([send readiness codes](../../agent-witch/send-readiness-reason-codes.md)).
3. On the **Mac**, open **Agent Witch Live** (`http://127.0.0.1:43347`) → Status / Traffic: is the WebSocket connected?
4. **Retry** the **Task** after ~10–30 seconds (common after console deploys).
5. Only then: **Update local** or self-update (see [Install bundle update](#install-bundle-update-stale-or-blocked-send) below).

---

## Send blocked — read the banner

| Banner / reason (typical)                 | Meaning                                       | What to do                                                              |
| ----------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| **Update needed**                         | Mac install bundle older than cloud requires  | [Update local](#install-bundle-update-stale-or-blocked-send)            |
| **Mac unreachable**                       | DNS/network from Mac to `www.agentwitch.com`  | [DNS / ENOTFOUND](#dns-mac-cannot-reach-agentwitchcom-open-001)         |
| **Mac offline**                           | No recent hub presence                        | Wake Mac, check AWI running, VPN                                        |
| **Reconnecting**                          | Seen recently, no live socket on this request | [Reconnecting](#mac-reconnecting-after-deploy-or-multi-server-open-002) |
| **Connecting** / **New task isn’t ready** | Multi-server relay or handoff                 | Wait, refresh devices, retry                                            |
| **Add a task**                            | Empty prompt / form validation                | Fill composer or workflow form                                          |

Mac picker labels (**Online**, **Seen recently**, **Reconnecting (another server)**, **Offline**) describe presence—not always send-ready. You need **Online** + dispatch-ready for writer **Tasks**.

Copy reference: [AWC Mac reconnecting vs local live](../../qa/awc-mac-reconnecting-vs-local-live.md).

---

## DNS — Mac cannot reach agentwitch.com (OPEN-001)

**Symptoms**

- Mac error logs under `~/.agent-witch/` show `getaddrinfo ENOTFOUND www.agentwitch.com`.
- WebSocket never stays up; console shows **offline** or **seen recently** only.
- **Send** may show **Mac unreachable** when that signal is surfaced.

**Cause**

Client or network **DNS**, firewall, or VPN—not something you fix by editing `wsUrl` on production installs (bundle **103+** uses the hardcoded production WebSocket).

**Fix**

1. On the Mac, verify resolution: `dig www.agentwitch.com` or `nslookup www.agentwitch.com`.
2. Fix VPN, corporate DNS, or firewall blocking outbound HTTPS/WSS.
3. Ensure install bundle **103+** ([self-update](#install-bundle-update-stale-or-blocked-send) if older).

**Deep dive**

- [Agent Witch KNOWN_ISSUES — OPEN-001](../../../src/features/agent-witch/KNOWN_ISSUES.md)
- [Repository hosting — production WebSocket](../../product/repo-name-and-hosting.md)

Do **not** point a production Mac at CHECK24 `daily-magic.*` URLs unless your organization explicitly deploys there.

---

## Mac “reconnecting” after deploy or multi-server (OPEN-002)

**Symptoms**

- Message like: _The selected Mac is reconnecting. Your task will send when it checks in._
- **Agent Witch Live** or local bridge looks fine, but **New task** still blocks **Send**.
- Picker shows **Reconnecting (another server)** or **Seen recently**.

**Cause**

Two different “live” signals:

- **Local bridge / AWL up** → proves browser is on the Mac and AWI may be running.
- **Console hub** → needs a **live WebSocket on the server handling your dispatch** (multi-replica deploys and load balancers can briefly miss).

After a **production deploy**, sockets drop for a few seconds even when AWI reconnects quickly.

**Fix**

1. Wait for AWI to reconnect (Status → Traffic: `agent.register`).
2. Refresh **Home** / Mac list; retry **New task** (client retries on `mac_reconnecting` where applicable).
3. Keep install bundle **103+**.
4. Operators: sticky routing on hub cookie `aw_hub_instance` (see ADR 0005)—not end-user config.

**Deep dive**

- [AWC Mac reconnecting vs local live](../../qa/awc-mac-reconnecting-vs-local-live.md)
- [KNOWN_ISSUES OPEN-002](../../../src/features/agent-witch/KNOWN_ISSUES.md)

**Not the same bug:** [Update local broke LaunchAgent](#update-local-stuck-reconnecting-agent-067)—cloud shows reconnecting because AWI never loaded.

---

## Install bundle update (stale or blocked Send) (OPEN-003)

**Symptoms**

- **Update needed** on composer; **Update agent** CTA.
- Home Mac detail shows bundle version **behind** cloud.
- Old client bugs persist until update completes.

**Cause**

Self-update runs on heartbeat, hourly updater, or when you trigger **Update local** via bridge. Network or wake API failures can delay it.

**Fix**

1. In console: **Update agent** / Mac row menu → **Update local** (same Mac as browser).
2. On Mac terminal (optional): `npm run agent-witch:self-update` from a dev checkout, or use AWL **Update**.
3. Compare `~/.agent-witch/install-version.json` with `GET /install/agent-witch/version` on the console origin.

**Deep dive**

- [KNOWN_ISSUES OPEN-003](../../../src/features/agent-witch/KNOWN_ISSUES.md)
- [Send readiness — `update_needed`](../../agent-witch/send-readiness-reason-codes.md)
- Mac devices UI: [KNOWN_ISSUES](../../../src/features/agent-witch/macDevices/KNOWN_ISSUES.md) (Update local menu)

---

## Update local stuck reconnecting (AGENT-067)

**Symptoms**

- After **Update local**, console stays on **Mac reconnecting** (`presenceTier: recent`).
- Default bridge `:47892` down; `wake.sh` / LaunchAgent will not load.

**Cause**

Invalid `com.agent-witch.plist` (install script once embedded bash inside XML). `launchctl bootstrap` rejected the agent.

**Fix**

1. Install bundle **125+** (self-update or restart AWI)—client rewrites invalid plist on start, AWL Update, and heartbeat update.
2. If identity unlinked: run **Connect this Mac** from Home while signed in.
3. AWL posts update to runtime wake port from `wake-port.json` when present.

**Deep dive**

- [Q&A: Update local and LaunchAgent plist](../../qa/awi-update-local-launchagent-plist.md)
- [KNOWN_ISSUES AGENT-067 / OPEN-003 context](../../../src/features/agent-witch/KNOWN_ISSUES.md)

---

## “This Mac” / Connect this Mac confusion

| UI                       | Meaning                                            |
| ------------------------ | -------------------------------------------------- |
| **Connect this Mac** row | Link the Mac where you opened the browser          |
| **this Mac** badge       | Cloud device hash matches local bridge `/identity` |

If you do not see **this Mac** on macOS: bridge not running, wrong port, or signed-out page (no probe). Not a DNS issue by itself.

[How AWC knows this computer](../../qa/awc-how-browser-knows-this-computer.md) · [AWB localhost identity](../../qa/awb-localhost-identity-and-cors.md).

---

## Run stuck on Connecting / empty terminal

1. Confirm the **Mac** is **Online** for send—not only “seen recently.”
2. Live **Run** honesty: **Connecting** until log attaches, then **In progress** ([run UX honesty](../../qa/run-ux-honesty-strings.md)).
3. Check Reports / run detail for reconnect hints if dashboard WebSocket dropped ([reports KNOWN_ISSUES](../../../src/features/reports/KNOWN_ISSUES.md) — reconnect copy themes).
4. Spawn failures on Mac (PTY): update install bundle; see agent feature KNOWN_ISSUES if terminal never streams.

---

## Workflow checkpoint or retry issues

- Paused at human step: look for top **banner** after **Not now**; open checkpoint sheet and **Continue**.
- Failed agent step: use **Try again** on the same step—do not restart the whole workflow unless you intend to.

[Official workflow checkpoints and retry](../../qa/official-workflow-run-checkpoints-and-retry.md) · [Chapter 6](06-workflows-and-checkpoints.md).

---

## Library / playbook issues

- Guest drafts only on one browser until sign-in sync: [Guest library drafts](../../qa/guest-library-browser-drafts.md).
- **Send** disabled on library workflow: connect **Mac** or Cursor Cloud key ([Chapter 7](07-capabilities-library-playbooks.md)).

---

## Project folder wrong or missing

Console cannot pick Mac folders remotely. Use **Agent Witch Live** or local folder picker.

[AWC project folder picker](../../qa/awc-project-folder-path-picker.md) · [AWC vs AWL projects](../../qa/awc-awl-projects-source-of-truth.md).

---

## Local dev vs production (support checklist)

| Check          | Production user              | Local developer              |
| -------------- | ---------------------------- | ---------------------------- |
| Origin         | `https://www.agentwitch.com` | `http://localhost:3000`      |
| Mac config dir | `~/.agent-witch`             | Often `~/.local-agent-witch` |
| Bridge port    | `47892`                      | `47893`                      |

[Local bridge doc](../../agent-witch/local-bridge.md) · [AWL loopback origin](../../qa/awl-loopback-origin.md).

---

## Mac Knowledge page empty or search returns nothing

**Symptoms**

- **Agent Witch on this Mac → Knowledge** shows no chunks after successful **Runs** on a linked project folder, or search always returns empty.

**Checks**

1. **Project folder** is set for the repo ([Chapter 4](04-mac-connect-and-bridge.md#repositories-and-folders-mac-side))—knowledge is keyed to that folder on the Mac, not the Console alone.
2. **Finished Runs** with exit code success index snippets; failed runs use a separate error path (see [Local knowledge](04-mac-connect-and-bridge.md#local-knowledge-mac-app--efficient-memory)).
3. **Embeddings** use a local **Ollama** API on the Mac (`http://127.0.0.1:11434` by default). If Ollama is not running, indexing and search may no-op without blocking **Send**.

Developers: `AGENT_WITCH_OLLAMA_URL` / `AGENT_WITCH_EMBED_MODEL` — [developer guide ch.10](../developer-guide/10-learning-memory-and-improvements.md).

---

## Where to search next

| Need                             | Location                                                                                                                                                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Short “how it works” answers     | [docs/qa/README.md](../../qa/README.md)                                                                                                                                                                                                |
| Open Mac bridge / dispatch risks | [src/features/agent-witch/KNOWN_ISSUES.md](../../../src/features/agent-witch/KNOWN_ISSUES.md)                                                                                                                                          |
| Mac Home / Update local UI       | [macDevices KNOWN_ISSUES](../../../src/features/agent-witch/macDevices/KNOWN_ISSUES.md)                                                                                                                                                |
| Trust and boundaries             | [Chapter 8 — Production and trust](08-production-and-trust.md)                                                                                                                                                                         |
| First-time setup                 | [Chapter 1 — Getting started](01-getting-started.md) · [Chapter 4 — Mac connect](04-mac-connect-and-bridge.md)                                                                                                                         |
| AI registration / Agent Mail     | [ai-self-registration-webmcp.md](../../qa/ai-self-registration-webmcp.md) — method `none` works without a mailbox; `agentmail` returns 503 when the server key is missing. `rate_limited` or `busy` means wait; do not retry in a loop |

Indexed search (agents and power users):

```bash
npm run feature-knowledge:query -- "Mac reconnecting DNS update bundle" --feature=docs
```

---

## Query aliases

- Agent Witch troubleshooting Mac offline reconnecting
- Send blocked update needed DNS ENOTFOUND
- install bundle mismatch update local LaunchAgent
- workflow retry checkpoint not now banner
- this Mac identity connect bridge 47892
- sua loi Agent Witch Mac reconnecting
- khong gui duoc task vi Mac offline
- Linux cannot access Agent Witch, Linux host vs Mac app
- loi DNS www.agentwitch.com tren Mac
- cap nhat bundle Agent Witch update needed
- sau update local van reconnecting plist
- hoc tu loi troubleshooting, run lai sau khi sua loi Mac
- bon tru cot learn from usage sua loi agent
