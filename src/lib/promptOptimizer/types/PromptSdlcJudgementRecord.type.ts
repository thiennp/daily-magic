export default interface PromptSdlcJudgementRecord {
  readonly id: string;
  readonly cycleId: string;
  readonly revisionId: string;
  readonly judgeKind: "writer" | "ollama";
  readonly judgeModel: string;
  readonly score: number | null;
  readonly passed: boolean | null;
  readonly reasons: string | null;
  readonly rawReply: string;
  readonly createdAt: string;
}
