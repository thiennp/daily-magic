export interface PendingDispatchApproval {
  readonly runId: string;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly prompt: string;
  readonly groupId: string | null;
  readonly requestId?: string;
}

export class DispatchApprovalRegistry {
  private readonly pendingByRunId = new Map<string, PendingDispatchApproval>();

  register(pending: PendingDispatchApproval): void {
    this.pendingByRunId.set(pending.runId, pending);
  }

  get(runId: string): PendingDispatchApproval | undefined {
    return this.pendingByRunId.get(runId);
  }

  remove(runId: string): void {
    this.pendingByRunId.delete(runId);
  }
}

export const dispatchApprovalRegistry = new DispatchApprovalRegistry();
