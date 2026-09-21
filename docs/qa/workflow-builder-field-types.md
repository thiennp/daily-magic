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

Create workflow questions use **Input type**: text, paragraph, number, phone, email, link, date, yes/no, and choice list. A hidden `project` type still exists for marketplace folder binding. There is no file upload yet. Human step and specialist sit under **How this workflow runs**; extra Mac rules stay optional. User-created workflows still dispatch as one Mac prompt; the official human↔agent graph remains marketplace-only.

## Details

### Builder (AWC Create workflow)

| Control                  | Stored as                                                | Run widget                                      |
| ------------------------ | -------------------------------------------------------- | ----------------------------------------------- |
| Question                 | `workflow_fields[].label` (key slugified from the label) | Field caption                                   |
| Input type → Text        | `type: "text"`                                           | One-line text                                   |
| Input type → Paragraph   | `type: "textarea"`                                       | Multi-line text                                 |
| Input type → Number      | `type: "number"`                                         | Number input                                    |
| Input type → Phone       | `type: "phone"`                                          | Telephone input                                 |
| Input type → Email       | `type: "email"`                                          | Email input                                     |
| Input type → Link        | `type: "url"`                                            | URL input                                       |
| Input type → Date        | `type: "date"`                                           | Date input                                      |
| Input type → Yes / no    | `type: "boolean"`                                        | Yes / No radios (`yes` / `no`)                  |
| Input type → Choice list | `type: "select"` plus `options[]`                        | Dropdown                                        |
| Required to run          | `required`                                               | `*` plus validation message                     |
| (not in builder)         | `type: "project"`                                        | Hidden; filled from the selected project folder |

Values stay strings (`Record<string, string>`). Empty required fields fail; typed fields also check format.

Create **agent** still has no question list. Create **workflow** splits harness items: **How this workflow runs** (human step + specialist) vs **Extra rules for your Mac** (rule, skill, command, instruction).

### Official vs user-created runs

| Kind                                       | Intake form       | Execution                                                   |
| ------------------------------------------ | ----------------- | ----------------------------------------------------------- |
| User-created workflow                      | `workflow_fields` | One Mac prompt; operator steps appended as text checkpoints |
| Official marketplace preset (`template-*`) | Same field model  | Server graph `human` / `agent` nodes in `workflow_runs`     |

**Wave** is a runtime marker (`[[WAVE_PLAN]]`) during an agent run, not a Create workflow node.

### Upload

There is no workflow upload field. A browser file picker cannot supply a Mac POSIX path (see [awc-project-folder-path-picker.md](awc-project-folder-path-picker.md)).

## Related

- Product plan: [docs/product/workflow-builder-form-and-graph.md](../product/workflow-builder-form-and-graph.md)
- Concepts: [docs/product/concepts.md](../product/concepts.md)
- Official graphs: [docs/product/official-marketplace-workflow-best-practices.md](../product/official-marketplace-workflow-best-practices.md)
- Code: `src/lib/workflows/types/WorkflowFieldInputType.constant.ts`, `src/features/workflows/WorkflowBuilderFieldRow.tsx`, `src/features/workflows/WorkflowTaskFields.tsx`

## Last reviewed

2026-09-21
