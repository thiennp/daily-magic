/** Who is asking, for which project and task; shown in the input dialog. */
export interface AgentRunInputContext {
  readonly agentLabel: string;
  readonly projectName: string | null;
  readonly taskTitle: string | null;
}
