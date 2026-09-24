# Chapter 6 — Workflows and checkpoints

This chapter is for anyone who runs **official workflows** from the marketplace or library—not only one-shot **Tasks** from the composer. Workflows add structure: forms, steps, pauses for you, and recovery when an agent step fails.

If you have not finished [Chapter 5 — Tasks, dispatch, and runs](05-tasks-dispatch-and-runs.md), read that first. Vocabulary: [Chapter 0](00-philosophy-and-vocabulary.md) (**Mac**, **Task**, **Run**, **Playbook**).

**Workflows** are the structured side of the **easy authoring** pillar: forms and checkpoints instead of a blank prompt. You can still start every week with a plain **Task** and only open workflows when a process repeats ([four pillars](00-philosophy-and-vocabulary.md#four-pillars)).

---

## Workflows vs plain Tasks

|                   | **Task (composer / home)**                                   | **Workflow**                                                                   |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| **What you send** | One prompt (plus optional folder, capability)                | A **capability** with a form and often a **step graph**                        |
| **What you get**  | One **Run**                                                  | A **workflow run** that may spawn several agent **Runs**                       |
| **Human pauses**  | Mid-run `[[AWAITING_INPUT]]` in the terminal                 | Built-in **checkpoints** between agent steps                                   |
| **Best for**      | Ad hoc work, quick fixes (**easy authoring** — start simple) | Repeatable processes (e.g. “ship a feature in this repo”) when structure helps |

Workflows still **dispatch** agent work to your **Mac** (or Cursor Cloud when configured). The browser keeps the graph, your answers, and history; the Mac runs each agent step in a real shell when it is your turn.

Technical overview: [How harness, workflow, and agent runs reach the Mac](../../qa/mac-harness-workflow-agent-dispatch.md).

---

## Official workflows (curated presets)

**Official** workflows ship as fixed graphs: alternating **human** nodes (checkpoints) and **agent** nodes (Mac dispatches). When you start one, Agent Witch stores a **snapshot** of that graph on the workflow run so later edits to the template do not change an in-flight run.

Typical flow:

1. You fill the workflow form (text fields, choices, optional file upload—see below).
2. Agent Witch starts the workflow run and dispatches the first agent step to your **Mac**.
3. You watch the live **Run** terminal like any other task.
4. When the graph hits a **human** node, the run pauses and the browser shows a **checkpoint sheet**.

Deep dive: [Official workflow run — checkpoints and retry](../../qa/official-workflow-run-checkpoints-and-retry.md).

---

## Human checkpoints (what you see)

When a workflow needs you, status becomes something like **Waiting on you** (aligned with [run UX honesty](../../qa/run-ux-honesty-strings.md)). The checkpoint sheet includes:

- **Workflow name** and a **progress** indicator (where you are in the graph).
- **Workflow steps** — a checklist of every step in this run: finished steps, the one waiting on you (or running on your Mac), and what is still ahead. The same checklist appears on the failure sheet when a step needs **Try again**.
- **What to do** — plain instructions for this step.
- **From your assistant** — a short preview of what the last agent step produced (when available).
- **Continue** — submit your answer and advance the graph.

### Not now (snooze)

If you are not ready, choose **Not now**. The prompt closes; a **banner** at the top of the console reminds you to resume later. Your place in the workflow is saved—you do not lose earlier answers.

### Optional skip

Some human steps allow **Skip** when the designer marked the checkpoint as optional. Skipped steps are recorded so the run history stays honest.

### Conditional skip (agent steps)

Some agent steps are configured to **skip automatically** when your earlier answer matches a pattern (for example, you said “no change needed”). You may see **Skipped — …** in progress copy instead of a full agent **Run**.

---

## Agent step failures and retry

If an agent step **fails**, the workflow run stops on that step with a clear error. Earlier form answers and completed steps stay on the run row—you are not sent back to step one.

What to do:

1. Read the error (often folder-related: wrong path, not a git repo, etc.).
2. Fix the underlying issue on the **Mac** if needed (path, credentials, network).
3. Use **Try again** (or the workflow **retry** action) to re-dispatch **the same step** only.

That retry path is part of **learn from usage**: fix the cause, rerun the step, keep earlier answers—no need to retype the whole form. Automated “turn this failure into a new playbook” is still evolving ([north star vs today](00-philosophy-and-vocabulary.md#north-star-vs-today)).

Retry is available while the run is in a failed state; it clears the error and sends that node again. Details: [Official workflow run — checkpoints and retry](../../qa/official-workflow-run-checkpoints-and-retry.md).

**Example:** The **vibe coding app feature** preset expects an **app target** folder on the Mac that is a git repository. If the folder is missing, the first agent step fails fast instead of editing the wrong directory.

---

## File uploads and rich output

Workflows can ask for **File (PDF or image)** fields. You upload in the browser; Agent Witch extracts text server-side and passes a secure download link into the prompt for the **Mac** agent to fetch when needed.

Agents may also emit structured blocks such as `[[ARTIFACT]]…[[/ARTIFACT]]`. The live **Run** view can show a **Summary** tab in addition to the terminal. Published workflows may declare optional **output** fields for reporting.

See [Workflow file upload and semantic output](../../qa/workflow-file-upload-and-semantic-output.md) and [Workflow builder field types](../../qa/workflow-builder-field-types.md).

---

## Playbooks and harness inside a workflow

Installing a marketplace **Playbook** (rules under `~/.agent-witch/harness/`) is separate from each workflow agent step. A preset may install harness **specialist** files so the Mac CLI follows the right instructions; each step still runs as a normal dispatch (`command.claude.run`).

User-facing name: **Playbook**. Engineers may say harness or capability slug—same idea for “how agents should behave on disk.”

[Mac harness vs workflow dispatch](../../qa/mac-harness-workflow-agent-dispatch.md).

---

## Mac readiness during workflows

The same **Send** readiness rules apply before you start a workflow trial or step: **Mac** must be **online** and dispatch-ready on the console hub, unless you use Cursor Cloud for that workflow. If the composer shows **Reconnecting**, **Update needed**, or **Mac offline**, fix that first—see [Chapter 9 — Troubleshooting](09-troubleshooting.md).

Reason codes: [Send readiness contract](../../agent-witch/send-readiness-reason-codes.md).

---

## Solo vs team

|                   | **Solo**                                  | **Team**                                                       |
| ----------------- | ----------------------------------------- | -------------------------------------------------------------- |
| **Run workflows** | From library or marketplace after install | Same; runs appear in shared **Runs** / reports                 |
| **Templates**     | Save forks to **Library** as playbooks    | Share capabilities and published workflows (**team learning**) |
| **Checkpoints**   | Only you answer                           | Whoever owns the run answers (policy may tighten later)        |

---

## Related reading

- [System Q&A index](../../qa/README.md)
- [Product concepts — Workflow vs capability](../../product/concepts.md)
- [UX simplification](../../product/ux-simplification.md) — user words vs engineer terms

---

## Query aliases

- Agent Witch workflows, human checkpoints, workflow retry step
- official workflow pause continue not now skip
- workflow run vs task run Mac dispatch
- upload PDF workflow Agent Witch summary artifact
- quy trinh workflow Agent Witch, diem dung checkpoint
- thu lai buoc agent bi loi workflow
- workflow cho nguoi dung lam gi truoc khi agent chay tiep
- tai file PDF trong workflow Agent Witch
- de tao workflow, bon tru cot de tao workflow, form workflow de hieu
