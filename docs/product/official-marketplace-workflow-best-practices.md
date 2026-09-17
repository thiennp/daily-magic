# Official marketplace workflow best practices

Server-orchestrated marketplace workflows (`template-*` harness slugs) must **not** rely on the auto-generated graph from `buildOfficialWorkflowDefinitionFromTemplate` alone. Each preset needs a **curated definition** under `src/lib/workflowOrchestration/definitions/`.

## Graph shape

- Alternate **human** checkpoints (operator harness) with **agent** steps (bounded Mac dispatches).
- Human steps: short numbered instructions; no megaprompt.
- Agent steps: one phase per node; reference workflow form fields by key; **do not** use `[[AWAITING_INPUT]]` for workflow gates (platform pauses between nodes).
- End on a human **review / approve** step when the workflow ships user-visible output.

## Template content (same PR)

- **Listing**: `name`, `description`, `detail` — outcome-first, not “run this prompt”.
- **Fields**: required keys match what agent steps need; optional fields truly optional with agent fallback behavior in prompt text.
- **exampleRequest**: keep as operator-facing spec; `##` sections should align with agent node boundaries.
- **Harness operator steps**: titles must match human node titles; content matches human `instructions`.

## Files per preset

1. `src/lib/workflowOrchestration/definitions/<template-id>.definition.ts` — exports `OFFICIAL_WORKFLOW_DEFINITION`.
2. Register in `src/lib/workflowOrchestration/definitions/registry.ts` (import + map entry).
3. `src/lib/workflowOrchestration/definitions/<template-id>.definition.test.ts` — asserts graph quality and field references.
4. Co-located template/harness updates under `src/lib/capabilities/templates/` as needed.

## Reference implementations in-repo

| Template ID               | Definition module                    | Notes                                                                                                                                           |
| ------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `vibe-coding-app-feature` | `vibeCodingAppFeature.definition.ts` | Engineering: clarify → architecture → implement → review (four human, three agent).                                                             |
| `research-brief`          | `researchBrief.definition.ts`        | Research: confirm → clarify → synthesize → review (three human, two agent).                                                                     |
| `competitor-snapshot`     | `competitorSnapshot.definition.ts`   | Same graph shape as `slackThreadSummary.definition.ts` (confirm → parse/clarify → draft → approve). Harness: `workflowB1.competitorSnapshot.*`. |

When optimizing a preset, mirror the **file split**: `*.exampleRequest.ts`, `*.operatorSteps.ts`, harness preset module, `workflowCapabilityTemplates*.constant.ts`, co-located Vitest.

## Verification

```bash
npm test -- src/lib/workflowOrchestration/definitions/<template-id>.definition.test.ts
npm test -- src/lib/capabilities/templates/*<related>*
npm run harness:bootstrap -- --workflow=verify
```
