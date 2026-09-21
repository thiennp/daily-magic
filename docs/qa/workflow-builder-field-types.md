# What field types can I add when creating a workflow?

## Query aliases

- create workflow answer length input type
- workflow questions one line multiple lines
- workflow_fields text textarea project
- thay vi phan answer length co the la input type
- tao workflow them question text paragraph number phone upload
- CreateWorkflowForm WorkflowBuilderFieldRow
- What should Agent ask?
- workflow form fields PDF image upload
- create agent vs create workflow steps diagram

## Short answer

Today each workflow question has a **type**, but the create UI labels it **Answer length** and only offers **One line** (`text`) and **Multiple lines** (`textarea`). A hidden `project` type exists for marketplace templates (folder binding), not the builder dropdown. User-created workflows do **not** run the official human↔agent graph; that graph is marketplace-only. A proposed richer form + step/graph plan lives in [workflow-builder-form-and-graph.md](../product/workflow-builder-form-and-graph.md).

## Details

### Builder (AWC Create workflow)

| Control                        | Stored as                                                   | Run widget                                      |
| ------------------------------ | ----------------------------------------------------------- | ----------------------------------------------- |
| Question label                 | `workflow_fields[].label` (key is slugified from the label) | Field caption                                   |
| Answer length → One line       | `type: "text"`                                              | Single-line text                                |
| Answer length → Multiple lines | `type: "textarea"`                                          | Paragraph                                       |
| Required to run                | `required`                                                  | `*` + empty-string error                        |
| (not in builder)               | `type: "project"`                                           | Hidden; filled from the selected project folder |

Values at run time are always strings (`Record<string, string>`). Validation is required/trim only — no phone, number, or file checks.

Create **agent** has **no** question list. Both surfaces can add harness items: rule, skill, command, instruction, **Specialist** (`agent` / subagent copy on the Mac), **Human step** (`operator` → `operator_steps`). Those items sit under **Extra rules for your Mac**, not a step diagram.

### Official vs user-created runs

| Kind                                       | Intake form       | Execution                                                   |
| ------------------------------------------ | ----------------- | ----------------------------------------------------------- |
| User-created workflow                      | `workflow_fields` | One Mac prompt; operator steps appended as text checkpoints |
| Official marketplace preset (`template-*`) | Same field model  | Server graph `human` / `agent` nodes in `workflow_runs`     |

`startOfficialWorkflowRun` returns _This workflow is not an official orchestrated preset_ for owner-created playbooks.

**Wave** in this product is a **runtime** marker (`[[WAVE_PLAN]]`) the writer may emit during an agent run. It is not a node you add in Create workflow.

### Upload

There is no workflow upload field. A browser file picker cannot supply a Mac POSIX path (see [awc-project-folder-path-picker.md](awc-project-folder-path-picker.md)).

## Related

- Product plan: [docs/product/workflow-builder-form-and-graph.md](../product/workflow-builder-form-and-graph.md)
- Concepts: [docs/product/concepts.md](../product/concepts.md)
- Official graphs: [docs/product/official-marketplace-workflow-best-practices.md](../product/official-marketplace-workflow-best-practices.md)
- Code: `src/lib/workflows/types/WorkflowFieldDefinition.type.ts`, `src/features/workflows/WorkflowBuilderFieldRow.tsx`, `src/features/workflows/WorkflowTaskFields.tsx`

## Last reviewed

2026-09-21
