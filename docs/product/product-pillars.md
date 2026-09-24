# Agent Witch — product pillars

Canonical **value pillars** for UX, guides, and agent rules. The **core job** is unchanged; pillars describe how the product improves over time.

**Core job (one sentence):**

> Run a trusted agent on a Mac you control (or a teammate’s), see what happened in the browser, and reuse what worked.

**User vocabulary:** Mac · Task · Run · Playbook — see [ux-simplification.md](ux-simplification.md).

---

## Four pillars

| #     | Pillar (intent)      | User-facing promise                                                                                                                                                     | Engineering focus                                                                                                        |
| ----- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **1** | **Easy authoring**   | Workflows and agents feel approachable—even if you are not an AI expert. Start with a plain **Task**; use forms and team **Workflows** when you need structure.         | Workflow builder, capability forms, official presets, progressive disclosure in composer                                 |
| **2** | **Learn from usage** | Mistakes and rough runs become improvements—you stay in control. Agent Witch surfaces feedback and suggestions; you accept before playbooks or workflows change.        | `feedback`, `improvements`, run history, capability improvements (human-in-the-loop)                                     |
| **3** | **Efficient memory** | Each new **Task** reuses useful context from past **Runs** so work stays focused—solo or on a team—without repeating the same setup. (Do not say “token” in user copy.) | Run memory injection, playbook scope, feature-knowledge for repo agents; team-shared library/harness where policy allows |
| **4** | **Team learning**    | Teammates share **Runs**, **Playbooks**, and company templates so the org gets better together—not isolated one-off prompts.                                            | Library, marketplace, harness publish/install, team Runs visibility, dispatch policy                                     |

Pillars **stack on the core loop** (connect Mac → Task → Run → Playbook), they do not replace it.

---

## North star vs today

Use this table in guides so docs stay honest.

| Pillar                 | Shipped today (examples)                                                                                                                          | North star (direction)                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **1 Easy authoring**   | New task composer, workflow forms, official workflow checkpoints, marketplace presets                                                             | Richer no-jargon builder; more presets; clearer “start simple” onboarding                        |
| **2 Learn from usage** | Run again, save as playbook, run UX honesty, feedback/improvements features (varies by surface)                                                   | Closed loop: failed run → reviewed suggestion → published playbook/workflow update               |
| **3 Efficient memory** | Mac run memory, project RAG chunks, AWL **Knowledge** (retrieval counts + local hints), playbooks; cloud `capability_improvements` (human review) | Selective memory (dedupe, linked tools, team-scoped policy); optional local router before writer |
| **4 Team learning**    | Team Runs, library, marketplace, harness install to Mac                                                                                           | Stronger sharing defaults, audit-friendly reuse, org templates as default path                   |

**Known gaps (developers):** run memory still recency-based; local suggestions do not auto-publish tools; Mac ↔ cloud promotion is explicit — see [project-composition.md](../architecture/project-composition.md) (memory section), [developer guide ch.10](../guides/developer-guide/10-learning-memory-and-improvements.md), and feature `KNOWN_ISSUES.md`.

---

## Pillar → documentation map

| Pillar | User guide  | Developer guide | Product / Q&A                                                                                                                                         |
| ------ | ----------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | ch. 1, 6    | ch. 6           | [workflow-builder-form-and-graph.md](workflow-builder-form-and-graph.md), [qa/workflow-builder-field-types.md](../qa/workflow-builder-field-types.md) |
| 2      | ch. 5, 9    | ch. 5, 9, 10    | [qa/run-ux-honesty-strings.md](../qa/run-ux-honesty-strings.md)                                                                                       |
| 3      | ch. 5, 7, 8 | ch. 10          | [concepts.md](concepts.md) (memory terms)                                                                                                             |
| 4      | ch. 7, 8    | ch. 7           | [catalog-and-sharing](../domains/catalog-and-sharing.md) domain                                                                                       |

---

## Query aliases

- Agent Witch product pillars, four pillars, product values
- triet ly Agent Witch, bon tru cot, de tao workflow, hoc tu loi, tiet kiem ngữ cảnh, team chia se kinh nghiem
- North star vs today Agent Witch memory improvements
