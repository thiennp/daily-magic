# Chapter 0 — Philosophy and vocabulary

This chapter is the **contract** for every other user-guide chapter. If UI copy or support docs disagree with this page, **fix the product or the chapter**—do not invent a second story.

---

## One job

Agent Witch exists so you can:

> **Run a trusted agent on a Mac you control (or a teammate’s), see what happened in the browser, and reuse what worked.**

That is the whole product. Everything else—workflows, marketplace, harness/playbooks, Cursor Cloud dispatch—is **how** that job gets done safely at scale, not a separate product.

Four **product pillars** describe how Agent Witch gets better over time without changing that job. Canonical detail: [product pillars](../../product/product-pillars.md). **Copy checklist (VI + EN):** [philosophy-and-copy-guideline.md](../../product/philosophy-and-copy-guideline.md).

---

## Four pillars

These promises stack on the same loop you already use: connect a **Mac**, send a **Task**, watch a **Run**, optionally save a **Playbook**.

| Pillar               | What we promise you                                                                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Easy authoring**   | Workflows and agents feel approachable—even if you are not an AI expert. Start with a plain **Task**; use forms and team **Workflows** when you need structure.        |
| **Learn from usage** | Rough **Runs** can become improvements—you stay in control. Agent Witch may surface feedback and suggestions; you accept before **Playbooks** or **Workflows** change. |
| **Efficient memory** | Each new **Task** can reuse useful context from past **Runs** so you do not repeat the same setup every time—solo or on a team.                                        |
| **Team learning**    | Teammates share **Runs**, **Playbooks**, and company templates so the org gets better together—not isolated one-off prompts.                                           |

Chapter map: authoring (1, 6) · learning from runs (5, 9) · memory and reuse (5, 7, 8) · team sharing (7, 8).

---

## North star vs today

Docs stay honest: some pillar ideas are stronger today than others. This is the user-facing summary (not a feature checklist).

| Pillar               | You can rely on today                                                                                                                                                                                              | Where we are headed                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Easy authoring**   | **New task** composer, workflow forms, official presets in **Marketplace**, human checkpoints in workflows                                                                                                         | Richer no-jargon builder, more presets, clearer “start simple” onboarding                             |
| **Learn from usage** | **Run again**, **Save as playbook**, honest run status, feedback on some surfaces                                                                                                                                  | Smoother loop: a failed or rough run → reviewed suggestion → updated playbook or workflow you approve |
| **Efficient memory** | Recent context on the **Mac**, saved **Playbooks**, search past **Runs** when offered; **Agent Witch on this Mac → Knowledge** shows saved snippets and how often they were reused (local hints, not auto-install) | Smarter reuse (what to carry forward, what to skip), linked tools, clearer team sharing rules         |
| **Team learning**    | Team **Runs**, **Library**, **Marketplace**, install playbooks to a teammate’s **Mac**                                                                                                                             | Stronger sharing defaults, audit-friendly reuse, org templates as the normal path                     |

If UI copy promises something this table does not list as “today,” treat the product as ahead of the guide and file a doc fix—or check [System Q&A](../../qa/README.md).

---

## What Agent Witch is not

| Misconception                                      | Reality                                                                                                                                                                                               |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| “Daily Magic” is a different app                   | **daily-magic** is the git repo name; **Agent Witch** is the product at **www.agentwitch.com**. Same codebase.                                                                                        |
| Production is `daily-magic.d.energie.check24.de`   | Agent Witch production is **www.agentwitch.com** unless your organization explicitly deploys elsewhere.                                                                                               |
| “Agent Witch” always means the Mac app             | Colloquially yes; in engineering we split **AWC** (browser console), **AWL** (Mac UI), **AWB** (bridge), **AWI** (install/runtime). Users usually see **Mac** and **Runs**.                           |
| Harness / library / marketplace are three runtimes | **One dispatch runtime.** Harness = rules on disk; library = saved playbooks; marketplace = published listings.                                                                                       |
| Cloud agents replace your Mac                      | **Mac runs local CLI/shell work** on your machine. **Cursor Cloud** is an optional dispatch target when you configure it—not a silent substitute for your laptop.                                     |
| “Linux cannot use Agent Witch”                     | The **Console** works in a Linux browser. An **x86_64 Linux** machine can also host the agent. The Mac app and “this computer” bridge stay Mac-only ([Q&A](../../qa/linux-browser-vs-linux-host.md)). |

---

## Two modes, one loop

|                            | **Solo maker**                                  | **Company user**                                         |
| -------------------------- | ----------------------------------------------- | -------------------------------------------------------- |
| **Success in ~10 minutes** | One completed **Run** with live terminal output | Same, plus visible in team **Runs**                      |
| **Extra value**            | Save as **Playbook**, run again                 | Shared playbooks, audit-friendly history, policy (later) |
| **Defer by default**       | Marketplace authoring, deep harness editing     | Admin screens on every visit                             |

Same core loop; company adds **visibility, templates, and guardrails**.

---

## Four user-facing ideas (use these words)

From [UX simplification](../../product/ux-simplification.md):

| User term    | Meaning                                             | Do not say in UI                                     |
| ------------ | --------------------------------------------------- | ---------------------------------------------------- |
| **Mac**      | Machine that runs agents (yours or a teammate’s)    | “Agent Witch client”, “wake server”, “presence tier” |
| **Task**     | What you want done (composer / home)                | “Dispatch payload”                                   |
| **Run**      | What happened—history + live output                 | `agent_run`, SSE vs WebSocket                        |
| **Playbook** | How agents should behave (rules, skills, templates) | harness, capability slug in nav                      |

**Repository / code folder** is a task attribute and settings concept—not a separate product area in the primary nav.

---

## Runtime story (one paragraph)

You sign in on **AWC**. You connect a **Mac** (install + pairing). You send a **Task**; Agent Witch **dispatches** it to your Mac (or to Cursor Cloud if configured). You watch a **Run** in the browser while the Mac executes in a real shell session. Output and status land in **Runs** / Reports. Optional **Playbooks** and **Workflows** shape input and add human checkpoints—they do not replace dispatch.

Technical detail: [System map](../../architecture/system-map.md), [deployables](../../product/agent-witch-deployables.md).

---

## Trust and honesty

Agent Witch shows **honest run UX**: if the Mac is reconnecting, updating, or offline, the composer blocks **Send** with a clear reason—not a silent failure. If output is waiting for you (`[[AWAITING_INPUT]]`), the UI asks; the Mac does not guess.

On a **git repository**, the Mac also records a short **git check** after a **Run** (dirty paths and tracked changes)—see [Chapter 5 — Git check on the Mac](05-tasks-dispatch-and-runs.md#git-check-on-the-mac-git-repos-only). That is separate from the Success chip in the browser.

See [run UX honesty](../../qa/run-ux-honesty-strings.md) for reason codes engineers use; users see plain language.

---

## Who this guide is for

- **Solo makers** — chapters 1–5 and 9 first.
- **Team leads / compliance** — add 7–8.
- **Support** — chapter 9 + [Q&A index](../../qa/README.md).

Engineers changing code should read the [developer guide](../developer-guide/README.md) in parallel—especially [mismatch traps](../developer-guide/00-philosophy-and-mismatch-traps.md).

---

## Query aliases

- Agent Witch philosophy, product vision, what is Agent Witch
- triet ly Agent Witch, daily-magic vs agentwitch
- Mac Task Run Playbook vocabulary
- solo vs company Agent Witch
- four pillars Agent Witch, product values, north star vs today
- bon tru cot Agent Witch, de tao workflow, hoc tu loi, tiet kiem ngữ cảnh, team chia se kinh nghiem
- huong dan bon tru cot, triet ly san pham Agent Witch
- Linux cannot use Agent Witch, console vs Linux host
