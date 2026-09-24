# Chapter 7 — Capabilities, library, and playbooks

This chapter explains how Agent Witch turns “something that worked once” into something you can **run again**, share with a team, or install on a **Mac**—without treating library, marketplace, and harness as three different products.

Vocabulary: [Chapter 0](00-philosophy-and-vocabulary.md). One runtime, many surfaces: [Product concepts](../../product/concepts.md).

**Library** and **Marketplace** are the home of **team learning**: shared **Playbooks**, org templates, and install-to-**Mac** flows. **Save as playbook** and library reruns are how **efficient memory** becomes something you can name and run again—not only ad hoc chat ([four pillars](00-philosophy-and-vocabulary.md#four-pillars)).

---

## One dispatch engine, four names you might hear

| User-facing idea | What it is                                                        | Where it lives                                                  |
| ---------------- | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| **Playbook**     | Saved behavior: prompts, rules, templates                         | **Library**, marketplace listings, harness files on the **Mac** |
| **Capability**   | A published **agent offering** (metadata, version, policy)        | Cloud (Agent Witch Console)                                     |
| **Workflow**     | A capability shape with a **form** (and sometimes a step graph)   | Cloud                                                           |
| **Harness**      | Rules/skills/commands **on disk** under `~/.agent-witch/harness/` | Your **Mac**                                                    |

**Library** = your saved playbooks. **Marketplace** = company-published listings others can browse and install. Neither replaces dispatch—they point at capabilities and **project composition** when you install (Mac pull applies files into the repo).

Engineering detail: [Mac harness, workflow, and agent dispatch](../../qa/mac-harness-workflow-agent-dispatch.md).

---

## Capabilities (what can run)

A **capability** answers: _which agent profile, which form fields, and which policies apply_ before Agent Witch creates a **Run**.

You encounter capabilities when you:

- Pick an offering in the task composer or workflow runner.
- Publish or edit a workflow (create/edit forms, optional outputs).
- Browse team directory or admin tooling (company setups).

Capabilities are **cloud** objects. They do not execute code on the Mac by themselves—they describe what the next **Task** or workflow step will send.

---

## Playbooks and the library

The **Library** (`/library`) is where **playbooks** you care about live after you save or fork them.

Typical solo loop:

1. Complete a good **Run** or finish a workflow you like.
2. **Save to library** (or fork from marketplace).
3. Open the playbook later, adjust if needed, and **run again** on your **Mac**.

You stay in control: saving or forking does not silently change team templates until publish/install flows say so (**learn from usage**). Library items reference capabilities/workflows you already use. Running from library still creates a normal **Run** (or workflow run)—same honesty rules for terminal and outcomes ([run UX honesty](../../qa/run-ux-honesty-strings.md)).

### Guest library (before sign-in)

You can open `/library` without an account and save **drafts in this browser only** (local storage). Starter templates come from public template APIs. After you sign in, drafts **sync** to your cloud library; **newer `updatedAt` wins**, with the cloud copy winning on a tie.

Details: [Guest library browser drafts](../../qa/guest-library-browser-drafts.md).

### Running from library

- **Guests** are redirected to sign in before send.
- **Signed-in users** need a **dispatch-ready Mac** or a configured **Cursor Cloud** API key before **Send** is enabled; otherwise the UI shows connect / API-key guidance.

---

## Installing workflows and agents (project-first)

Marketplace **Install** always asks for a **project** and a **Mac**. The listing is saved to your **library** and linked in cloud **project composition** (workflow/agent + playbook metadata)—not as a global dump into `~/.agent-witch/harness/`.

On the Mac, open the same **project** in Agent Witch Live and **pull playbook files into the repo** so rules land under the project’s `.cursor/` tree and `project.json` stays in sync.

Each marketplace card includes a **How to use** section (steps, prerequisites, supported writers: Anthropic, OpenAI, Cursor, Google).

Same-machine identity: [How AWC knows this computer](../../qa/awc-how-browser-knows-this-computer.md).

---

## Marketplace (team templates)

**Marketplace** listings are published harness/capability packages for others to borrow. For a company user, marketplace is how leads ship **standard playbooks** without every teammate rebuilding forms and rules—that is **team learning** as a default path, not a side quest.

Flow (simplified):

1. Browse listing → read **How to use** → **Install** (choose **Mac** and **project**).
2. Cloud records library + project bindings; Mac pulls files into the repo when you are ready.
3. Teammates run from library or marketplace entry → shared **Runs** history.

Marketplace is not a separate runtime—install + library + dispatch.

---

## Workflows as playbooks with forms

A **workflow** capability adds structured **questions** before dispatch: text, choices, file upload, etc. Official presets may add **checkpoints** (see [Chapter 6 — Workflows and checkpoints](06-workflows-and-checkpoints.md)).

When you save a workflow to library, you are saving a **playbook** you can rerun with the same form shape. Custom workflows without an official graph still dispatch as one agent **Run** with operator steps embedded in the prompt ([workflow builder](../../qa/workflow-builder-field-types.md)).

---

## Project folder and Mac-only pickers

The console cannot browse your Mac’s disk directly. Set **repository / project folder** via:

- **Agent Witch Live** on the Mac (`127.0.0.1:43347`), or
- Local **bridge** folder picker when the browser runs on that **Mac**.

See [AWC project folder picker](../../qa/awc-project-folder-path-picker.md) and [AWC vs AWL projects source of truth](../../qa/awc-awl-projects-source-of-truth.md).

Wrong folder → failed or misleading **Runs**; fix the path in settings or the workflow form before blaming the agent.

---

## Local hints vs cloud improvements (pillar 2 vs 3)

| Surface                                             | What it does                                                                                | You approve?                                                    |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Agent Witch on this Mac → Knowledge** suggestions | Counts how often snippets or errors repeat; may suggest a **Playbook** step or harness rule | Yes—nothing installs until you act on the Mac or in the Console |
| **Capabilities → improvements** (Console)           | Proposed new capability version from feedback                                               | Yes—accept or reject before publish                             |

Saving a **Playbook** from a **Run** is separate from both: you name what worked; the Mac does not silently rewrite harness files when a suggestion appears ([Chapter 4](04-mac-connect-and-bridge.md#local-knowledge-mac-app--efficient-memory), [Chapter 10 dev — memory loop](../developer-guide/10-learning-memory-and-improvements.md)).

---

## What to defer until you need it

| Defer                          | Reach for when                    |
| ------------------------------ | --------------------------------- |
| Authoring marketplace listings | You own team standards            |
| Deep harness file editing      | You outgrow UI install            |
| Cursor Cloud dispatch          | No Mac available (explicit setup) |

Solo makers: library + one installed playbook + [Chapter 5](05-tasks-dispatch-and-runs.md) covers most weeks.

---

## Related reading

- [System Q&A index](../../qa/README.md)
- [Developer guide — mismatch traps](../developer-guide/00-philosophy-and-mismatch-traps.md) (if UI says harness and docs say playbook, fix the product copy)
- Feature READMEs: `src/features/library/README.md`, `src/features/capabilities/README.md`

---

## Query aliases

- Agent Witch library playbooks capabilities marketplace
- save to library run again fork workflow
- install playbook on Mac harness
- guest library localStorage sign in sync
- capability vs workflow vs playbook user guide
- thu vien Agent Witch, playbook luu lai chay lai
- cai dat harness len Mac tu marketplace
- khach luu workflow tren trinh duyet chua dang nhap
- capability workflow khac nhau the nao
- team learning marketplace library share playbooks, team chia se playbook
- tiet kiem ngữ cảnh playbook thu vien, luu kinh nghiem chay lai
