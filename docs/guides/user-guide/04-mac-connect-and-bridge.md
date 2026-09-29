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

A host started with `npm run agent-witch` reports its platform when it connects: **linux** on Linux, **mac** on macOS. The device list uses that report.

---

## Install

### Production (most users)

On macOS, from Agent Witch Home while signed in:

```bash
curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash
```

Follow on-screen prompts. The bundle version on the server should match or exceed what Home expects; mismatches show **Update needed** on the composer ([send readiness — `update_needed`](../../agent-witch/send-readiness-reason-codes.md)).

In the signed-in Console, the primary nav home link (“Agent Witch”) shows the **latest compatible Mac install version** this Console ships (for example `AWL 157`). That is the cloud’s expected install bundle—not the version on a particular paired Mac. Each Mac row under **Mac & devices** still reports that Mac’s own version (or **Version unknown** when the helper has not reported one yet).

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

**Prompt optimizer** is in the console navigation. That page tells you to run the **prompt optimizer** in the Mac app at `http://127.0.0.1:43347/prompt-optimizer`. The console does not run the optimizer. Live picks up optimizer changes only after the Mac updates its install. If the loop still looks old, update the Mac so its bundle matches the console. Instructions and a sample you can run are at `http://127.0.0.1:43347/prompt-optimizer/guide`. History on that page shows a short title for each run, and Delete removes that run. Steps in a run are a timeline. Click a step to open the score, the feedback, and the prompt saved for that step. After you choose a folder, a skill list shows the skills in that folder. Choosing one fills the prompt. When the run finishes, the page shows the highest scoring prompt. Save as a skill starts from that skill’s name, description, and file name. You can edit those and the prompt. If that file is already there, confirm before it replaces the skill. The pass score is a slider that defaults to 90. Its track fades from red through orange and yellow to green, and a mark shows the usual 90. While a run is working, the form under that run keeps the goal, prompt, folder, score, and writers you chose, and those fields stay locked. The folder, judge, and improver you last chose are filled in the next time you open the page. The first visit uses your home directory and leaves the judge and improver blank until you choose them. Each one has an optional instructions field, used with the goal. Leave it blank when you do not need it. An info icon on each field shows a best practice and an example when you hover it. Each round the judge runs the prompt in the folder you chose. If the prompt needs an input, put that input in the judge instructions. The judge reads the git changes, or the files the prompt names, and scores those changes. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder. It does not guess a printed reply, and it does not score the prompt wording. A separate pass checks the tokens and suggests what to cut before the improver runs. Each list includes I'll score it and I'll rewrite it, so you can do that step yourself. A score needs a reason. The improver, writer or you, receives that score and that reason. The run stops when the score reaches the pass score, you press Finish, the round limit is hit, or the score has not risen for 3 rounds. Finish ends the writers and counts that run as complete. After each scored round the page shows the tokens spent so far. The round limit starts at 10. You can set it from 1 to 30. The next rewrite always starts from the highest scoring prompt. Reasons from lower scores become an avoid list. Earlier prompt text is not sent again. After 3 tries that do not beat the best, the run stops and those reasons are included. A writer that has already checked out stays ready until that writer returns an error.

The judge and the improver run in the folder you chose, so they can read the Playbook and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. Choose the project folder when the prompt is about that code. The home page states this difference, and the article is [A prompt optimizer that can see the project](https://www.agentwitch.com/showcases/prompt-optimizer-in-the-project).

A bot on this Mac runs the same loop itself before it sends a Task. It calls `http://127.0.0.1:43347/prompt-optimizer/agent`. It does not ask you to paste the prompt into a different optimizer. The steps are on the [agent guideline](/for-agents).

**Honest UX:** Opening the Mac app proves the runtime is up locally; it does **not** by itself prove the **Console** can dispatch **right now** ([reconnecting Q&A](../../qa/awc-mac-reconnecting-vs-local-live.md)).

Why the browser may call `127.0.0.1` from a public site: [AWB localhost identity and CORS](../../qa/awb-localhost-identity-and-cors.md).

---

## Pairing and “this Mac”

1. Install on the Mac you want to run agents.
2. Sign in to the Console **in a browser on that same Mac**.
3. Finish **Connect this Mac** until the device appears under **Mac & devices**.
4. Look for **this Mac** / **On this Mac** when local identity matches.

If install succeeded but identity is not linked, pairing token may not be claimed—repeat connect flow ([update plist Q&A — identity note](../../qa/awi-update-local-launchagent-plist.md)).

Opening **Connect this Mac** again replaces the unused link. It does not add another computer. A row counts as **seen recently** only after that Mac checks in, and that check-in stays fresh for about 3 minutes. Extra **Your Mac** / **Mac 2** rows from earlier clicks (version unknown, no hostname) disappear the next time Home loads the device list. A named computer that has already checked in stays.

**Do not use hostname alone** to guess ownership—two accounts on one physical Mac used to both look local; matching uses **token hash** ([Q&A](../../qa/awc-how-browser-knows-this-computer.md)).

If Agent Witch is already running on this Mac, the click still only reserves a cloud link. Paste the command to write that link into this account, replace an outdated install, and restart the helper. Removing the Mac in the Console deletes that cloud identity. A current install then stops the helper and the bridge and removes the connection and the shipped app code. Your projects, Playbooks, reports, runs, and Ollama stay. **Update local** does not create a new link after that removal. **Connect this Mac** does ([Q&A](../../qa/awc-delete-mac-forgets-local-connection.md)).

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

Sending a task starts the writer CLI in that project folder. Update **Agent Witch on this Mac** when the Console offers a newer install, so an older Mac app does not keep starting tasks in the install workspace.

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
| Primary nav home link              | Latest compatible Mac install version this Console expects (`AWL …`)       |
| Home banner                        | Aggregate Mac story for onboarding                                         |
| Composer **Send readiness** banner | Exact reason **Send** is blocked (`offline`, `recent`, `update_needed`, …) |
| Mac picker / device row            | That Mac’s presence and reported install version (or **Version unknown**)  |

The Console header does **not** show a Live server-release chip. Deploy/release labels for the cloud app stay on health checks for operators—not in the daily Task chrome.

When dispatch queues because the hub socket is momentarily missing, you may see: **The selected Mac is reconnecting. Your task will send when it checks in.** That is queueable outbox behavior—not necessarily a dead Mac ([Q&A](../../qa/awc-mac-reconnecting-vs-local-live.md)).

---

## Test UI (developers)

`http://localhost:3000/ws-test` sends a task to a local agent without the full Home chrome—useful after `npm run agent-witch` ([local bridge](../../agent-witch/local-bridge.md)).

---

## Troubleshooting checklist

| Symptom                                                 | Check                                                                                        |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| No **this Mac** badge                                   | macOS? Same Mac as install? Bridge port reachable? Refresh tab on focus.                     |
| **this Mac** on Offline row while another Mac is Online | Stale browser cookie (HOME-061). Refresh Home after deploy; remove stale claim or reconnect. |
| **Offline** forever                                     | LaunchAgent loaded? Run install/start from Mac settings; see AGENT-067 plist heal doc.       |
| **Reconnecting** after deploy                           | Wait ~seconds; refresh Home; retry Send—AWI reconnects WebSocket automatically.              |
| **Update needed** stuck                                 | Run update on runtime wake port from `wake-port.json`, not only default 47892.               |
| Dispatch works but wrong folder                         | Fix path in Mac app, not typed guess in Console.                                             |

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
