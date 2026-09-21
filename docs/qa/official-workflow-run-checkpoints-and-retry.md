# How does an official workflow run pause, skip, and recover on AWC?

## Query aliases

- workflow run human checkpoint modal step of
- workflow step failed retry resume same step
- skip checkpoint workflow orchestration
- vibe coding app feature workflow steps
- workflow chạy tới đâu, dừng ở đâu, fail thì làm sao
- retry bước agent bị lỗi thay vì chạy lại từ đầu

## Short answer

A curated (official) workflow preset runs as a fixed graph of **human** and **agent** nodes stored as a snapshot on the run row. AWC dispatches one agent step at a time to your Mac; at a human node the run flips to `waiting_human` and the browser shows a checkpoint modal with `Step N of M`, the instructions, and the previous agent output. When an agent step fails, the run keeps its step index and AWC shows a failure modal with **Retry this step**, so earlier answers are not lost.

## Details

| Behavior               | Where it lives                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Graph snapshot         | `workflow_runs.definition_snapshot`, parsed by `parseOfficialWorkflowDefinitionSnapshot` (accepts any version >= 1)                                                       |
| Step advance           | `continueOfficialWorkflowRun` — one node per call, index on the run row                                                                                                   |
| Human pause            | `runOfficialWorkflowHumanStep` broadcasts `workflow.human_step.required`                                                                                                  |
| Checkpoint UI          | `WorkflowHumanStepModal` — `Step N of M`, prior agent output, optional Skip                                                                                               |
| Optional checkpoint    | human node `allowSkip` → Skip posts `skipped: true`, step stored as `skipped`                                                                                             |
| Conditional agent step | agent node `skipWhenPriorResponseMatches` → step recorded as `skipped` and the run continues                                                                              |
| Failure + retry        | `advanceOfficialWorkflowRunAfterAgentRun` keeps `current_step_index`, broadcasts `workflow.step.failed`; `POST /api/workflow-runs/retry-step` re-dispatches the same node |

Notes:

- A human answer is stored in `workflow_runs.step_outputs[nodeId].response`; agent output previews are stored as `step_outputs[nodeId].outputPreview` and drive the "what the agent just produced" panel.
- Retry only works while the run status is `failed`; it clears `error_message` and re-dispatches the node the run stopped on.
- `vibe-coding-app-feature` requires `appTarget` (a git repo folder on the Mac). Its first agent step fails fast when the folder is missing or not a git repo, instead of editing an unrelated folder.

## Related

- ADR 0005 (dispatch, presence, outbox), ADR 0007 (feature slices)
- `src/lib/workflowOrchestration/` (engine), `src/features/dispatch/` (modals)
- `src/lib/workflowOrchestration/definitions/vibeCodingAppFeature.definition.ts`

## Last reviewed

2026-09-21
