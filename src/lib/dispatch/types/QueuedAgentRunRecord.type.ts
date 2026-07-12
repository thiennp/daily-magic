export default interface QueuedAgentRunRecord {
  readonly id: string;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly groupId: string | null;
  readonly capabilityId: string | null;
  readonly prompt: string;
  readonly createdAt: string;
}
