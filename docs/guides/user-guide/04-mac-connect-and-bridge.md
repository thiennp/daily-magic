# Chapter 4 — Mac connect and bridge

Connecting a **Mac** means installing the helper, pairing it to your account, and keeping it healthy enough for **Tasks** to become **Runs**. This chapter uses user vocabulary from [UX simplification](../../product/ux-simplification.md); engineers map the same pieces to **AWI** (install/runtime), **AWB** (bridge), **AWL** (Mac app), and **AWC** (browser Console)—see [deployables](../../product/agent-witch-deployables.md).

Pairing and honest **Mac status** are the trust foundation for every pillar: agents run on hardware you control, and the Console tells you when dispatch is not ready instead of faking success ([Chapter 8 — Production and trust](08-production-and-trust.md), [four pillars](00-philosophy-and-vocabulary.md#four-pillars)). **Efficient memory** also has a Mac side—the **Agent Witch on this Mac** app holds project folders and local run context ([Chapter 5](05-tasks-dispatch-and-runs.md)).

---

## What “connect a Mac” actually does

| Step             | You do                                                | System does                                                                                                         |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Install          | Run the curl/bash installer from Home while signed in | Writes `~/.agent-witch`, LaunchAgents, local bridge ports, WebSocket client                                         |
| Pair             | Complete **Connect this Mac**                         | Stores a claimed device + pairing token **hash** in the cloud                                                       |
| Stay running     | Login autostart + optional watchdog                   | Heartbeats and `wss://www.agentwitch.com/api/agent-witch/ws` (or local dev origin)                                  |
| Prove “this Mac” | Use Console on **same Mac** in Safari/Chrome          | Browser reads loopback **identity** and matches token hash ([Q&A](../../qa/awc-how-browser-knows-this-computer.md)) |

The cloud **never** runs your shell jobs. It **dispatches** to your Mac and streams results back ([overview](../../overview.md)).

A **Linux browser** can use this Console. On desktop Linux, Home shows a terminal install command for this computer. An **x86_64 Linux** host can then receive Tasks. The Mac app and the “this computer” badge stay on macOS ([Q&A: Linux browser vs Linux host](../../qa/linux-browser-vs-linux-host.md)). Windows Home installs the host inside WSL and lists it as a Linux device. Phones still say to install on a Mac.

---

## Install

### Production (most users)

On macOS, from Agent Witch Home while signed in:

```bash
curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash
```

Follow on-screen prompts. The bundle version on the server should match or exceed what Home expects; mismatches show **Update needed** on the composer ([send readiness — `update_needed`](../../agent-witch/send-readiness-reason-codes.md)).

### Local development (engineers)

Against a dev Console on `localhost:3000`:

```bash
npm run agent-witch:install
npm run agent-witch
```

Requires `npm run dev` (custom `server.ts`) so WebSocket upgrades work—not plain `next dev` when testing dispatch ([local bridge](../../agent-witch/local-bridge.md)).

---

## Three loopback surfaces (what users touch)

| User-facing name                      | URL / port                                                                    | Use it for                                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Mac bridge** (wake server)          | `http://127.0.0.1:47892` (prod install) or `47893` (localhost-origin install) | Identity for **this Mac** badge, watchdog, harness install proxy, self-update from browser on same Mac |
| **Agent Witch on this Mac** (Mac app) | `http://127.0.0.1:43347`                                                      | Projects/folders, local tasks, playbooks, memory, connection health UI                                 |
| **Console**                           | `https://www.agentwitch.com`                                                  | Daily **Tasks** and **Runs**                                                                           |

**Honest UX:** Opening the Mac app proves the runtime is up locally; it does **not** by itself prove the **Console** can dispatch **right now** ([reconnecting Q&A](../../qa/awc-mac-reconnecting-vs-local-live.md)).

Why the browser may call `127.0.0.1` from a public site: [AWB localhost identity and CORS](../../qa/awb-localhost-identity-and-cors.md).

---

## Pairing and “this Mac”

1. Install on the Mac you want to run agents.
2. Sign in to the Console **in a browser on that same Mac**.
3. Finish **Connect this Mac** until the device appears under **Mac & devices**.
4. Look for **this Mac** / **On this Mac** when local identity matches.

If install succeeded but identity is not linked, pairing token may not be claimed—repeat connect flow ([update plist Q&A — identity note](../../qa/awi-update-local-launchagent-plist.md)).

**Do not use hostname alone** to guess ownership—two accounts on one physical Mac used to both look local; matching uses **token hash** ([Q&A](../../qa/awc-how-browser-knows-this-computer.md)).

---

## Keeping the Mac healthy

### Autostart and watchdog

Install registers **LaunchAgents** so the helper restarts after login. A **watchdog** can kick stale clients (macOS)—you may see local APIs like `GET http://127.0.0.1:47892/watchdog/status` from Mac settings or proxied Console routes.

### Update local

When Home or the composer shows **Update needed**, run **Update** from Mac settings or the Mac app. Updates rewrite install files and may restart bridge/runtime. A Mac that has not saved an app origin yet still downloads the bundle from `https://www.agentwitch.com`.

**Honest UX:** A bad LaunchAgent plist after update once left the bridge down while cloud still showed **Seen recently** ([Q&A: update local reconnecting](../../qa/awi-update-local-launchagent-plist.md)). New bundles heal invalid plists; if status stays wrong, use Mac settings **Update** and check watchdog logs—not repeated full reinstalls.

### Wake / restart

If Mac status is **Offline**, Mac settings may offer **wake** or **revive** via the bridge (`POST …/watchdog/revive` patterns). Console may proxy these when your browser is on the same Mac.

---

## Playbooks on disk (install path)

Installing a **Playbook** from Marketplace pushes files to `~/.agent-witch/harness/` over the WebSocket (or via bridge when browser and Mac share the machine). That is separate from each **Task** dispatch but shapes how writers behave ([harness / workflow / dispatch Q&A](../../qa/mac-harness-workflow-agent-dispatch.md)).

User word: **Playbook**. Internal word: harness.

---

## Repositories and folders (Mac-side)

The Console cannot open a native folder picker for a real `/Users/...` path. Set or change project folders in **Agent Witch on this Mac** or via bridge APIs used by the Mac app ([folder picker Q&A](../../qa/awc-project-folder-path-picker.md), [AWL vs AWC projects](../../qa/awc-awl-projects-source-of-truth.md)).

---

## Local knowledge (Mac app — efficient memory)

In **Agent Witch on this Mac**, open **Knowledge** (`http://127.0.0.1:43347/knowledge`) to see text the Mac saved from **finished Runs** on a linked project folder and how often each snippet was reused in later **Tasks** (**efficient memory**, pillar 3).

| What you see             | What it means                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Indexed chunks           | Useful output from successful **Runs** (stored on this Mac, not uploaded by default)                         |
| “Used in N dispatch(es)” | How often that snippet was injected before the writer ran again                                              |
| Suggestions              | Local hints when the same snippet or error keeps repeating—e.g. consider a **Playbook** step or harness rule |

**Honest UX:** Suggestions do **not** change your **Workflows** or cloud **Library** by themselves. Accepting a capability improvement still happens in the Console ([Chapter 7](07-capabilities-library-playbooks.md)). Failed **Runs** can be remembered separately so the Mac can warn the writer—not every past failure is replayed into every **Task** ([north star vs today](00-philosophy-and-vocabulary.md#north-star-vs-today)).

---

## Reading Mac status vs Send readiness

| Layer                              | Tells you                                                                  |
| ---------------------------------- | -------------------------------------------------------------------------- |
| Home banner                        | Aggregate Mac story for onboarding                                         |
| Composer **Send readiness** banner | Exact reason **Send** is blocked (`offline`, `recent`, `update_needed`, …) |
| Mac picker label                   | Presence tier in plain language                                            |

When dispatch queues because the hub socket is momentarily missing, you may see: **The selected Mac is reconnecting. Your task will send when it checks in.** That is queueable outbox behavior—not necessarily a dead Mac ([Q&A](../../qa/awc-mac-reconnecting-vs-local-live.md)).

---

## Test UI (developers)

`http://localhost:3000/ws-test` sends a task to a local agent without the full Home chrome—useful after `npm run agent-witch` ([local bridge](../../agent-witch/local-bridge.md)).

---

## Troubleshooting checklist

| Symptom                         | Check                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| No **this Mac** badge           | macOS? Same Mac as install? Bridge port reachable? Refresh tab on focus.               |
| **Offline** forever             | LaunchAgent loaded? Run install/start from Mac settings; see AGENT-067 plist heal doc. |
| **Reconnecting** after deploy   | Wait ~seconds; refresh Home; retry Send—AWI reconnects WebSocket automatically.        |
| **Update needed** stuck         | Run update on runtime wake port from `wake-port.json`, not only default 47892.         |
| Dispatch works but wrong folder | Fix path in Mac app, not typed guess in Console.                                       |

Chapter 9 (troubleshooting guide) expands FAQ-style flows.

---

## Related docs

- [Chapter 1 — Getting started](01-getting-started.md)
- [Chapter 5 — Tasks, dispatch, and runs](05-tasks-dispatch-and-runs.md)
- [Local bridge](../../agent-witch/local-bridge.md)
- [Send readiness reason codes](../../agent-witch/send-readiness-reason-codes.md)
- [ADR 0005 — presence and outbox](../../adr/0005-shared-mac-presence-and-dispatch-outbox.md)
- [System Q&A](../../qa/README.md)

---

## Query aliases

- connect Mac Agent Witch, install helper, bridge wake server
- Agent Witch on this Mac 43347, update local reconnecting
- ket noi Mac, cai dat agent tren Mac, cap nhat local
- AWB identity this Mac, pairing token hash
- Mac offline reconnecting fix Agent Witch
- tin cay ket noi Mac, pairing an toan, bo nho tren may Mac Agent Witch
