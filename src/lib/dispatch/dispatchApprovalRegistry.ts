export interface PendingDispatchApproval {
  readonly runId: string;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly prompt: string;
  readonly groupId: string | null;
  readonly writerAgent: string;
  readonly requestId?: string;
  readonly approvalExpiresAt?: string | null;
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

  listForExecutor(executorUserId: string): readonly PendingDispatchApproval[] {
    return [...this.pendingByRunId.values()].filter(
      (pending) => pending.executorUserId === executorUserId,
    );
  }

  listAll(): readonly PendingDispatchApproval[] {
    return [...this.pendingByRunId.values()];
  }
}

export const dispatchApprovalRegistry = new DispatchApprovalRegistry();
