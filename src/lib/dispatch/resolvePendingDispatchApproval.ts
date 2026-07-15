import { getPendingDispatchApprovalFromDb } from "@/lib/dispatch/getPendingDispatchApprovalFromDb";
import type { PendingDispatchApproval } from "@/lib/dispatch/dispatchApprovalRegistry";
import { dispatchApprovalRegistry } from "@/lib/dispatch/dispatchApprovalRegistry";

export async function resolvePendingDispatchApproval(
  runId: string,
  executorUserId: string,
): Promise<PendingDispatchApproval | null> {
  const cached = dispatchApprovalRegistry.get(runId);

  if (cached !== undefined && cached.executorUserId === executorUserId) {
    return cached;
  }

  return getPendingDispatchApprovalFromDb(runId, executorUserId);
}

export async function listPendingDispatchApprovalsForExecutor(
  executorUserId: string,
): Promise<readonly PendingDispatchApproval[]> {
  return dispatchApprovalRegistry.listForExecutor(executorUserId);
}
