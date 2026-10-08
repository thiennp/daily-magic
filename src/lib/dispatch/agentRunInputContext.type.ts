/** Who is asking, for which project and task; shown in the input dialog. */
export interface AgentRunInputContext {
  readonly agentLabel: string;
  readonly computerName: string | null;
  readonly projectName: string | null;
  readonly taskTitle: string | null;
}
