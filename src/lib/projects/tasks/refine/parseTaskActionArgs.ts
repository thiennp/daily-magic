import {
  BLOCKED_ON_VALUES,
  VERIFY_SIGNALS,
  type BlockedOn,
  type VerifySignal,
} from "@agent-witch/shared/taskRefinement";

import { oneOf, text, rec } from "@/lib/projects/tasks/refine/parseRefineArgs";

export const parseClaimArgs = (args: unknown) => {
  const r = rec(args);
  const projectId = text(r?.projectId, 80);
  const taskId = text(r?.taskId, 80);
  return projectId === null || taskId === null
    ? ({ ok: false, code: "invalid_arguments" } as const)
    : ({ ok: true, projectId, taskId } as const);
};

export type ReleaseOutcome = "done" | "failed" | "blocked" | "released";

export const parseReleaseArgs = (args: unknown) => {
  const r = rec(args);
  const projectId = text(r?.projectId, 80);
  const taskId = text(r?.taskId, 80);
  const outcome = oneOf<ReleaseOutcome>(r?.outcome, [
    "done",
    "failed",
    "blocked",
    "released",
  ]);
  const fence =
    typeof r?.fence === "number" && Number.isInteger(r.fence) ? r.fence : null;
  if (
    projectId === null ||
    taskId === null ||
    outcome === null ||
    fence === null
  ) {
    return { ok: false, code: "invalid_arguments" } as const;
  }
  const verifySignal: VerifySignal | null = oneOf(
    r?.verifySignal,
    VERIFY_SIGNALS,
  );
  const blockedOn: BlockedOn | null = oneOf(r?.blockedOn, BLOCKED_ON_VALUES);
  return {
    ok: true,
    projectId,
    taskId,
    outcome,
    fence,
    verifySignal,
    blockedOn,
    resultSummary: text(r?.resultSummary, 200),
    blockedReason: text(r?.blockedReason, 200),
  } as const;
};
