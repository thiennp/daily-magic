# Chapter 1 — Getting started

This chapter walks you from zero to **one completed Run** with live terminal output—the solo-maker success bar in [Chapter 0](00-philosophy-and-vocabulary.md). You will use plain product words: **Mac**, **Task**, **Run**, **Playbook** ([UX simplification](../../product/ux-simplification.md)).

That path is the **easy authoring** pillar in practice: open a project, give one prompt with **New task**, no workflow builder required. Team templates and structured **Workflows** come later when you need them ([Chapter 6](06-workflows-and-checkpoints.md)).

**Production URL:** [https://www.agentwitch.com](https://www.agentwitch.com) (AgentWitch Cloud). The git repo is named `daily-magic`; the product you use in the browser is **AgentWitch**, not CHECK24 `daily-magic.*` hosts unless your organization says otherwise ([repo name & hosting](../../product/repo-name-and-hosting.md)).

---

## What you need

| Requirement                             | Why                                                                                                                                                                                                                                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A modern browser (Chrome, Safari, Edge) | Daily work happens in the **Console** (signed-in web app).                                                                                                                                                                                                                                         |
| A computer that will run the agent      | A **Mac** is the usual host. An **x86_64 Linux** machine can install the same host and receive Tasks. A Linux or Windows **browser** can sign in and use the Console either way. Only macOS gets the “this computer” badge and the local Mac app ([Q&A](../../qa/linux-browser-vs-linux-host.md)). |
| Network access to `www.agentwitch.com`  | Auth, dispatch, and run history live in the cloud.                                                                                                                                                                                                                                                 |
| ~10–15 minutes                          | Install, pair, send one **Task**, watch one **Run**.                                                                                                                                                                                                                                               |

You do **not** need to understand harnesses, WebSockets, or deployable abbreviations (AWC/AWL/AWB/AWI) to finish this chapter—those are covered when you need them in [Chapter 4](04-mac-connect-and-bridge.md).

---

## Step 1 — Open AgentWitch and sign in

1. Go to [https://www.agentwitch.com](https://www.agentwitch.com).
2. Choose **Sign in** (or follow your org’s invite link).
3. Complete sign-in with **Google** or **email magic link**, depending on what your workspace enables.

**Honest UX:** If email login is configured, check spam; magic links expire. If Google is required and you use another provider, ask your admin—AgentWitch does not invent a second account system in the UI.

For local development only (engineers/QA), test accounts like `test-qa-1@agentwitch.com` work on `localhost` without sending email—see [development setup](../../development/setup.md#test-auth-no-google--magic-link). That path is **disabled on production** `www.agentwitch.com`.

More detail: [Chapter 2 — Accounts and sign-in](02-accounts-and-sign-in.md).

---

## Step 2 — Install the computer helper on your computer

On the **same computer** where you want agents to run:

1. Stay signed in to AgentWitch in the browser on that Mac.
2. From **Home**, follow **Connect your computer** / **Install the helper** (wording may say “this computer”).
3. Run the install command shown in the UI. Production install is typically:

   ```bash
   curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash
   ```

4. Allow the installer to place files under `~/.agent-witch` (or the dev path `~/.local-agent-witch` when pointed at localhost) and register **login autostart** so the helper stays running.

What you installed (user-facing names):

| You see                                           | It does                                                                                                                                                                                    |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Mac helper** / **AgentWitch on this computer** | Background runtime that keeps a secure link to the Console and runs writer CLIs in your projects.                                                                                          |
| **Mac app** (optional)                            | Menu bar app for Apple Silicon — get it from [/download](https://www.agentwitch.com/download). Opens the local UI at `http://127.0.0.1:43347` for folders, playbooks, and troubleshooting. |

Technical map: [AgentWitch deployables](../../product/agent-witch-deployables.md) · [Local bridge](../../agent-witch/local-bridge.md).

---

## Step 3 — Pair this browser with this computer

Pairing means: **your account** knows **this install**, and the browser on this computer can show **This computer** actions.

1. After install, return to AgentWitch **Home** (refresh if needed).
2. Complete any **Connect this computer** checklist step the UI shows.
3. Confirm **Mac status** moves toward **Online** (or **Seen recently** / **Reconnecting** briefly after deploys—see below).

**How pairing works (short):** The browser on macOS reads a **local identity** from the computer bridge and matches it to your claimed devices in the cloud—it does not guess your laptop from IP alone. Details: [How does the Console know which Mac is “this computer”?](../../qa/awc-how-browser-knows-this-computer.md).

**Honest UX:**

- **“This computer”** on the connect row means “the computer where you opened the browser,” not a magic server guess.
- If you open AgentWitch on an iPhone or a PC, you will **not** get a “This computer” badge; you can still dispatch to a **paired computer** you select in the task composer.
- Right after a **production deploy**, status may show **Reconnecting** for a few seconds even though the helper is running locally. Refresh Home, open your project, and retry **New task**—do not reinstall. [Reconnecting vs local live](../../qa/awc-mac-reconnecting-vs-local-live.md).

---

## Step 4 — Send your first Task

1. Open a **project**, then click **New task** on that project.
2. **Computer:** leave **your computer** selected (default when paired).
3. **Prompt:** describe a small, safe job—for example: “List files in my home directory and summarize in three bullets.”
4. Expand **More options** only if you need them (repository folder, **Playbook**, writer choice). For the first run, the default Mac + prompt is enough—that is intentional **progressive disclosure** so authoring stays approachable ([UX simplification](../../product/ux-simplification.md), [four pillars — easy authoring](00-philosophy-and-vocabulary.md#four-pillars)).
5. Click **Send**.

**If Send is disabled**, read the banner above the button—it is intentional, not a bug:

| Banner theme               | What to do                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| Mac offline / reconnecting | Wait or open Mac settings; see [send readiness](../../agent-witch/send-readiness-reason-codes.md). |
| Update needed              | Run **Update** from Mac settings / local helper.                                                   |
| Empty prompt               | Type what you want done.                                                                           |

The Console **blocks Send** with a clear reason rather than failing silently ([run UX honesty](../../qa/run-ux-honesty-strings.md)).

---

## Step 5 — Watch your first Run

1. After **Send**, open **Runs** (or follow the live panel from the composer).
2. Expect honest progress labels—not “Success” while still connecting:

   | Chip                            | Meaning                                                         |
   | ------------------------------- | --------------------------------------------------------------- |
   | **Connecting**                  | Log not attached yet.                                           |
   | **In progress**                 | Live output streaming.                                          |
   | **Waiting on you**              | The agent needs your answer (`[[AWAITING_INPUT]]` checkpoints). |
   | **Success** / **Failed** / etc. | Terminal outcome only after real completion.                    |

3. When the run finishes, you should see output in history and can use **Run again** later (Chapter 5)—the start of **learn from usage** and **efficient memory** when you save what worked as a **Playbook**.

**Success for this chapter:** one **Run** reached a terminal outcome (**Success**, **Completed with fallback**, or a clear **Failed** with a reason)—not merely clicking Send. A clear **Failed** with a reason is still a successful first lesson; fix and **Run again** rather than guessing.

---

## What to do next

| Goal                                     | Go to                                      |
| ---------------------------------------- | ------------------------------------------ |
| Teams, invites, account menu             | [Chapter 2](02-accounts-and-sign-in.md)    |
| Home layout and Mac status banner        | [Chapter 3](03-home-and-navigation.md)     |
| Updates, wake, Mac app on `:43347`       | [Chapter 4](04-mac-connect-and-bridge.md)  |
| Prompt optimizer on this computer        | [Chapter 4](04-mac-connect-and-bridge.md)  |
| Composer, folders, continue conversation | [Chapter 5](05-tasks-dispatch-and-runs.md) |
| Short targeted Q&A                       | [System Q&A index](../../qa/README.md)     |

---

## Common first-day mistakes

1. **Signed in on computer A, installed on computer B** — Select the correct Mac in the composer or install on the computer where the browser runs.
2. **Expecting folder pickers in the browser** — Real Mac paths are chosen on the computer ([folder picker Q&A](../../qa/awc-project-folder-path-picker.md)).
3. **Calling local helper “offline” when only Console says reconnecting** — Local bridge can be up while cloud dispatch waits for a live socket; refresh and retry ([Q&A](../../qa/awc-mac-reconnecting-vs-local-live.md)).
4. **Skipping install autostart** — If the helper is not running, Mac status stays **Offline** until you start it from Mac settings.
5. **Asking an AI to use AgentWitch without the homepage prompt** — Copy **For your AI** on the homepage. The prompt points at `/for-agents`, a static page with the steps and no site header or footer. Method `none` needs no email; Agent Mail needs the server key. A Task still needs a paired host ([Q&A](../../qa/ai-self-registration-webmcp.md)).
6. **Hearing “Linux cannot use AgentWitch”** — The Console works in a Linux browser. Desktop Linux Home offers the install command for this computer. An x86_64 Linux machine can host Tasks. The Mac app and “this computer” badge stay on macOS ([Q&A](../../qa/linux-browser-vs-linux-host.md)).

---

## Query aliases

- AgentWitch getting started, first run, onboarding
- how to install Mac helper, connect this computer, first task
- bat dau AgentWitch, cai dat Mac, ket noi may, gui task dau tien
- AgentWitch beginner guide chapter 1
- huong dan su dung AgentWitch tu dau, chay agent tren Mac lan dau
- de tao task dau tien, bon tru cot de tao workflow, bat dau don gian AgentWitch
- Linux cannot use AgentWitch, Linux browser console, Linux host
