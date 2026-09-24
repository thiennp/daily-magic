# Chapter 5 — Tasks, dispatch, and runs

A **Task** is what you ask for in the composer. A **Run** is what actually happened—live terminal output plus history. This chapter covers sending tasks, optional **Playbook** and folder settings, honest progress UI, and follow-ups like **Run again** and continue conversation.

Background: [Chapter 0 vocabulary](00-philosophy-and-vocabulary.md) · Dispatch mechanics (Q&A): [harness, workflow, agent runs to Mac](../../qa/mac-harness-workflow-agent-dispatch.md).

This chapter is where three pillars meet daily work: **easy authoring** (composer + **More options**), **learn from usage** (**Run again**, **Save as playbook**, honest outcomes), and **efficient memory** (continue conversation, search past **Runs**). See [four pillars](00-philosophy-and-vocabulary.md#four-pillars) and [north star vs today](00-philosophy-and-vocabulary.md#north-star-vs-today).

---

## Task composer — minimum viable send

1. Open **New task** from Home or nav.
2. Choose **Mac** — yours by default when **this Mac** is linked; teammates’ Macs appear when paired to your org.
3. Write the **prompt** — concrete scope beats vague “fix everything.”
4. Click **Send** when enabled.

If **Send** is disabled, fix what the **Send readiness** banner says first—empty prompt, Mac offline, update needed, reconnecting, etc. ([reason codes](../../agent-witch/send-readiness-reason-codes.md)). The product **blocks** bad sends instead of dropping tasks silently.

---

## More options (progressive disclosure)

Expand **More options** when you need more than Mac + prompt:

| Option                       | User meaning                                | Honest limits                                                                                                                                                                                               |
| ---------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Repository / code folder** | Where the writer CLI runs on the Mac        | Browser cannot pick a real POSIX path via native dialog—type a path you know, use defaults, or set folder in **Agent Witch on this Mac** ([folder picker Q&A](../../qa/awc-project-folder-path-picker.md)). |
| **Playbook**                 | Rules/skills/templates installed on the Mac | Files live under `~/.agent-witch/harness/`; installing from Marketplace is a separate flow ([dispatch Q&A](../../qa/mac-harness-workflow-agent-dispatch.md)).                                               |
| **Writer**                   | Which local CLI (Cursor, Claude Code, …)    | Must exist on the Mac; missing API keys may yield **Completed with fallback** honesty copy.                                                                                                                 |

Company-only hints (run on behalf, policy) appear when org rules exist—not on every solo Home.

---

## What happens when you Send (user-level)

1. Console creates an **agent run** record in the cloud.
2. It builds a **prompt payload** (plus optional folder, playbook/capability id, writer).
3. It delivers **`command.claude.run`** (name is historical) to your Mac over the Agent Witch WebSocket—or **queues** it in the outbox if the Mac is fresh but not live on this server ([ADR 0005](../../adr/0005-shared-mac-presence-and-dispatch-outbox.md)).
4. Your Mac runs the writer in a **real shell**; output streams to the browser.
5. Terminal outcome is stored for **Runs** / reports.

Workflows with multiple steps and human checkpoints reuse the same Mac path per agent step; checkpoints pause in the **browser**, not on the Mac ([official workflow checkpoints Q&A](../../qa/official-workflow-run-checkpoints-and-retry.md)).

Optional **Cursor Cloud** dispatch (when configured) targets cloud agents instead of your Mac— not a hidden substitute for local execution ([Chapter 0 — misconceptions](00-philosophy-and-vocabulary.md)).

---

## Queued vs failed (honest copy)

| Message theme                                                   | Meaning                                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Mac is reconnecting. Your task will send when it checks in.** | HTTP accepted; outbox will flush when hub socket is live—common right after Console deploy. |
| **Try again in a few seconds.**                                 | Interactive retry path—not the same as queued writer ack.                                   |
| Mac offline                                                     | No dispatch; fix connect chapter—not “wait silently forever.”                               |

Details: [Reconnecting vs local live](../../qa/awc-mac-reconnecting-vs-local-live.md).

---

## Watching a Run — progress honesty

Live UI uses **locked outcome chips**—do not show **Success** while still connecting ([run UX honesty](../../qa/run-ux-honesty-strings.md)):

| Chip                                     | When                                                                         |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| **Connecting**                           | Log not attached yet (`starting`).                                           |
| **In progress**                          | Streaming output (`streaming`).                                              |
| **Waiting on you**                       | Agent emitted `[[AWAITING_INPUT]]`—answer in UI; Mac waits.                  |
| **Success**                              | Finished cleanly.                                                            |
| **Completed with fallback**              | Finished with degraded path (e.g. CLI fallback when writer API key missing). |
| **Failed** / **Stopped** / **Timed out** | Terminal failure modes.                                                      |

One primary log surface per run—avoid duplicate “success” chrome elsewhere.

### Git check on the Mac (git repos only)

When your **code folder** is a git repository, the Mac records a short **git verdict** after the writer finishes—before/after dirty paths and a summary of tracked changes vs `HEAD`. It is stored in the Mac run report **details** (alongside the agent’s own summary), not as a separate Console screen.

| You might see in details               | Meaning                                                                               |
| -------------------------------------- | ------------------------------------------------------------------------------------- |
| `clean before run` / `clean after run` | Working tree had no uncommitted paths (porcelain empty).                              |
| `N dirty path(s)`                      | Uncommitted or untracked paths counted at snapshot time.                              |
| `diff vs HEAD: …`                      | Short `git diff --shortstat` after the run (may be empty if nothing tracked changed). |
| `Git: not a repository`                | Folder is not a git checkout—no worktree verdict beyond that line.                    |

This supports **learn from usage** (pillar 2): **Success** in the Console can still mean “CLI exited cleanly” while the verdict shows whether files actually changed. It does **not** block **Send** or replace **Runs** history in the cloud by itself.

---

## Runs list and actions

Open **Runs** to:

| Action                | Use                                                                                                                                                                               |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inspect output        | Audit what the agent did.                                                                                                                                                         |
| **Run again**         | Repeat task with edits—core **learn from usage** loop after a rough or good **Run**.                                                                                              |
| **Save as playbook**  | Reuse instructions you approve (Chapter 7)—nothing changes on the **Mac** until you accept install/save flows.                                                                    |
| Continue conversation | Follow-up messages while session is warm—or **Continue** from history with `sourceRunId` ([delegate local CLI context Q&A](../../qa/delegate-local-cli-conversation-context.md)). |

**Search past runs** (when offered) pulls useful context from earlier **Runs** (**efficient memory**)—UI avoids the word “Knowledge.” Not every prior run is replayed automatically; scope improves over time ([north star vs today](00-philosophy-and-vocabulary.md#north-star-vs-today)).

Team filters (who, which Mac, playbook, date) support audit—not required for solo makers.

---

## Continue conversation (follow-up Tasks)

Two paths users feel as “same chat”:

| Situation                                  | Behavior                                                                                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Second message while live panel still open | Hot **`--continue`** on supported writers when session is warm.                                                                                         |
| Continue from job detail / history         | Cold start may inject truncated prior transcript from Mac storage (`~/.agent-witch/writer-sessions/`) or built continuation prompt from a prior run id. |

Ending a writer session on the Mac clears hot continue until the next fresh dispatch. Details: [delegate local CLI Q&A](../../qa/delegate-local-cli-conversation-context.md).

---

## Mid-run input

When output shows **Waiting on you**, respond in the Console—the Mac stores pending checkpoints and resumes the shell when you answer. Do not expect the agent to guess passwords or ambiguous choices. Engineers: mid-run input protocol in `.cursor/rules/agent-run-input-protocol.mdc` and `src/features/agent-witch/`.

---

## Writer routing (advanced, still user-relevant)

If your org configures cascade routing, the Console may pick among writers by policy—that affects **which CLI** runs, not whether work stays on the Mac. See [writer dispatch cascade Q&A](../../qa/writer-dispatch-cascade-routing.md) when troubleshooting “wrong tool ran.”

---

## Practical task patterns

| Pattern            | Tip                                                                           |
| ------------------ | ----------------------------------------------------------------------------- |
| Repo work          | Set folder on Mac first; reference repo name in prompt.                       |
| Small verification | Short prompt + explicit “list only, do not delete.”                           |
| Long jobs          | Watch **In progress**; session limits may **time out** with honest stop chip. |
| Team visibility    | Same run appears in shared **Runs** once dispatched under team account.       |

Test dispatch without Home: developer `ws-test` UI ([local bridge](../../agent-witch/local-bridge.md)).

---

## Related docs

- [Chapter 3 — Home and navigation](03-home-and-navigation.md)
- [Chapter 4 — Mac connect and bridge](04-mac-connect-and-bridge.md)
- [Chapter 6 — Workflows and checkpoints](06-workflows-and-checkpoints.md)
- [System Q&A index](../../qa/README.md)

---

## Query aliases

- send task Agent Witch, dispatch run, composer Send blocked
- run again continue conversation, waiting on you AWAITING_INPUT
- gui task Agent Witch, xem run, terminal honesty Connecting In progress
- thuc thi task tren Mac, dispatch outbox reconnecting
- git verdict run report details Mac repository dirty paths
- project folder playbook writer more options New task
- learn from usage run again save playbook, efficient memory continue conversation
- hoc tu loi run lai, luu playbook, tiet kiem ngữ cảnh task truoc
