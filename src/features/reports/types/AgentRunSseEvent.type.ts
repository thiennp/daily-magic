export default interface AgentRunSseEvent {
  readonly seq: number;
  readonly kind: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly createdAt: string;
}
