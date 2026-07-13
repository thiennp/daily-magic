export interface PendingAgentRunInput {
  readonly agentRunId: string;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly question: string;
  readonly partialOutput: string;
  readonly requestId?: string;
}

export class DispatchAgentRunInputRegistry {
  private readonly pendingByRunId = new Map<string, PendingAgentRunInput>();

  register(pending: PendingAgentRunInput): void {
    this.pendingByRunId.set(pending.agentRunId, pending);
  }

  get(agentRunId: string): PendingAgentRunInput | undefined {
    return this.pendingByRunId.get(agentRunId);
  }

  listForParticipant(userId: string): readonly PendingAgentRunInput[] {
    return [...this.pendingByRunId.values()].filter(
      (pending) =>
        pending.requesterUserId === userId || pending.executorUserId === userId,
    );
  }

  remove(agentRunId: string): void {
    this.pendingByRunId.delete(agentRunId);
  }
}

export const dispatchAgentRunInputRegistry =
  new DispatchAgentRunInputRegistry();
