export default interface PromptSdlcRevisionRecord {
  readonly id: string;
  readonly cycleId: string;
  readonly roundNumber: number;
  readonly promptText: string;
  readonly createdAt: string;
}
