import type { WriterApiProvider } from "./writerApi/WriterApiProvider.constant";

export default interface WriterLlmUsage {
  readonly provider: WriterApiProvider | "unknown";
  readonly model: string;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly totalTokens: number;
  readonly estimatedCostUsd: number | null;
  readonly estimateIsApproximate: boolean;
}
