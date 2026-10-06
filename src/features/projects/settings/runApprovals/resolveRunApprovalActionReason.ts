import { RUN_APPROVALS_COPY as C } from "@/features/projects/settings/runApprovals/runApprovalsCopy.constant";

/** Visible reason when Approve/Deny are off, or after a failed respond. */
export const resolveRunApprovalActionReason = (input: {
  readonly busyRunId: string | null;
  readonly actionError: string | null;
  readonly actionErrorRunId: string | null;
  readonly forRunId: string;
}): string | null => {
  if (input.busyRunId === input.forRunId) return C.working;
  if (input.actionErrorRunId !== input.forRunId) return null;
  if (input.actionError === "ended") return C.endedReason;
  if (input.actionError === "forbidden") return C.forbiddenReason;
  if (input.actionError === "error") return C.respondError;
  return null;
};
