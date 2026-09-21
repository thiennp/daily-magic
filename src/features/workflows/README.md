# Workflow builder

Workflow capabilities with dynamic task fields.

## Registry

- **Slug:** `workflows`
- **Feature path:** `src/features/workflows`
- **Lib path:** `src/lib/workflows`
- **Migration:** migrated

## Product concepts

Workflow = capability with dynamic task fields: [docs/product/concepts.md](../../../docs/product/concepts.md).

Builder questions use **Input type** (text, paragraph, number, phone, email, link, date, yes/no, choice list): [docs/qa/workflow-builder-field-types.md](../../../docs/qa/workflow-builder-field-types.md).

Proposed input types + linear graph: [docs/product/workflow-builder-form-and-graph.md](../../../docs/product/workflow-builder-form-and-graph.md).

## Routes

_Create workflow trial run opens the home send-task modal with `workflowDraft=1` and a sessionStorage draft._

## APIs

_None._

## Dependencies

- `capabilities`

Query: `npm run feature-knowledge:query -- "..." --feature=workflows`
